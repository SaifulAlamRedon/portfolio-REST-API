import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Category } from './entities/category.entity';
import { Technology } from './entities/technology.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async findAll(query: Record<string, any>) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const search = query.search?.trim() ?? undefined;
    const category = query.category?.trim();
    const technology = query.technology?.trim();
    const featured = query.featured === 'true' ? true : query.featured === 'false' ? false : undefined;
    const status = query.status?.trim();
    const sortBy = query.sortBy === 'updatedAt' ? 'project.updatedAt' : 'project.createdAt';
    const sortOrder = query.sortOrder === 'desc' ? 'DESC' : 'ASC';

    const qb = this.projectRepository.createQueryBuilder('project');
    qb.leftJoinAndSelect('project.category', 'category');
    qb.leftJoinAndSelect('project.technologies', 'technology');
    qb.where('project.deletedAt IS NULL');
    qb.andWhere('project.archived = false');

    if (search) {
      qb.andWhere(
        '(LOWER(project.title) LIKE LOWER(:search) OR LOWER(project.description) LIKE LOWER(:search) OR LOWER(project.shortDescription) LIKE LOWER(:search) OR LOWER(category.name) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (category) {
      qb.andWhere('category.name = :category', { category });
    }

    if (technology) {
      qb.andWhere('technology.name = :technology', { technology });
    }

    if (featured !== undefined) {
      qb.andWhere('project.featured = :featured', { featured });
    }

    if (status) {
      qb.andWhere('project.status = :status', { status });
    }

    qb.orderBy(sortBy, sortOrder);
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      success: true,
      message: 'Projects fetched successfully',
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      relations: {
        category: true,
        technologies: true,
      },
      withDeleted: false,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return { success: true, message: 'Project fetched successfully', data: project };
  }

  async create(dto: CreateProjectDto) {
    const slug = dto.slug?.trim() || this.generateSlug(dto.title);
    const category = dto.category ? await this.findOrCreateCategory(dto.category) : undefined;
    const technologies = dto.technologies ? await this.findOrCreateTechnologies(dto.technologies) : [];

    const project = this.projectRepository.create({
      title: dto.title,
      slug,
      shortDescription: dto.shortDescription,
      description: dto.description,
      coverImage: dto.coverImage,
      images: dto.images,
      technologies,
      category,
      githubUrl: dto.githubUrl,
      liveUrl: dto.liveUrl,
      featured: dto.featured ?? false,
      status: dto.status ?? 'draft',
    });

    await this.projectRepository.save(project);

    return { success: true, message: 'Project created successfully', data: project };
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      relations: {
        category: true,
        technologies: true,
      },
      withDeleted: false,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (dto.title && !dto.slug) {
      dto.slug = this.generateSlug(dto.title);
    }

    if (dto.category !== undefined) {
      project.category = dto.category ? await this.findOrCreateCategory(dto.category) : undefined;
    }

    if (dto.technologies !== undefined) {
      project.technologies = dto.technologies ? await this.findOrCreateTechnologies(dto.technologies) : [];
    }

    Object.assign(project, {
      ...dto,
      updatedAt: new Date(),
    });

    await this.projectRepository.save(project);

    return { success: true, message: 'Project updated successfully', data: project };
  }

  async remove(id: string) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      withDeleted: false,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectRepository.softDelete(project.id);
    return { success: true, message: 'Project soft deleted successfully' };
  }

  async restore(id: string) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      withDeleted: true,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectRepository.restore(project.id);
    const restored = await this.projectRepository.findOne({
      where: { id: project.id },
      relations: {
        category: true,
        technologies: true,
      },
    });

    return {
      success: true,
      message: 'Project restored successfully',
      data: restored,
    };
  }

  async publish(id: string) {
    return this.updateStatus(id, 'published', 'Project published successfully');
  }

  async unpublish(id: string) {
    return this.updateStatus(id, 'draft', 'Project unpublished successfully');
  }

  async archive(id: string) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      withDeleted: false,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.archived = true;
    await this.projectRepository.save(project);

    return { success: true, message: 'Project archived successfully', data: project };
  }

  async duplicate(id: string) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      relations: {
        category: true,
        technologies: true,
      },
      withDeleted: false,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const copy = this.projectRepository.create({
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy-${Date.now()}`,
      shortDescription: project.shortDescription,
      description: project.description,
      coverImage: project.coverImage,
      images: project.images,
      technologies: project.technologies,
      category: project.category,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
      status: project.status,
      archived: false,
      viewCount: 0,
    });

    await this.projectRepository.save(copy);

    return { success: true, message: 'Project duplicated successfully', data: copy };
  }

  async toggleFeatured(id: string) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      withDeleted: false,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.featured = !project.featured;
    await this.projectRepository.save(project);
    return { success: true, message: 'Project featured status updated', data: project };
  }

  async uploadImages(id: string, files: any[]) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      withDeleted: false,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.images = [
      ...(project.images ?? []),
      ...(files?.map((file) => file.path || file.originalname) ?? []),
    ];

    await this.projectRepository.save(project);

    return { success: true, message: 'Project images uploaded successfully', data: project };
  }

  async updateTechnologies(id: string, technologies: string[]) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      relations: {
        technologies: true,
      },
      withDeleted: false,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.technologies = await this.findOrCreateTechnologies(technologies ?? []);
    await this.projectRepository.save(project);

    return { success: true, message: 'Project technologies updated successfully', data: project };
  }

  async featured() {
    const projects = await this.projectRepository.find({
      where: { featured: true, archived: false },
      relations: {
        category: true,
        technologies: true,
      },
      withDeleted: false,
    });

    return {
      success: true,
      message: 'Featured projects fetched successfully',
      data: projects,
    };
  }

  private async updateStatus(id: string, status: string, message: string) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      withDeleted: false,
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.status = status;
    await this.projectRepository.save(project);

    return { success: true, message, data: project };
  }

  private async findOrCreateCategory(name: string) {
    const trimmed = name.trim();
    let category = await this.categoryRepository.findOne({ where: { name: trimmed } });
    if (!category) {
      category = this.categoryRepository.create({ name: trimmed });
      await this.categoryRepository.save(category);
    }
    return category;
  }

  private async findOrCreateTechnologies(names: string[]) {
    const trimmedNames = names.map((name) => name.trim()).filter(Boolean);
    if (trimmedNames.length === 0) {
      return [];
    }

    const existingTechnologies = await this.technologyRepository.find({
      where: trimmedNames.map((name) => ({ name })),
    });

    const existingNames = existingTechnologies.map((tech) => tech.name);
    const newNames = trimmedNames.filter((name) => !existingNames.includes(name));

    const newTechnologies = newNames.map((name) => this.technologyRepository.create({ name }));
    await this.technologyRepository.save(newTechnologies);

    return [...existingTechnologies, ...newTechnologies];
  }

  private generateSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]+/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async incrementView(id: string) {
    const project = await this.projectRepository.findOne({
      where: [{ id }, { slug: id }],
      withDeleted: false,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.viewCount += 1;
    await this.projectRepository.save(project);

    return { success: true, message: 'View count updated', data: project };
  }
}
