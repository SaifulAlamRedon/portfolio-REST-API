import { Injectable, NotFoundException } from '@nestjs/common';

interface ProjectRecord {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage?: string;
  images?: string[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status: string;
  category?: string;
  viewCount: number;
  archived?: boolean;
  deleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProjectsService {
  private readonly projects: ProjectRecord[] = [
    {
      id: 'project-1',
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      shortDescription: 'Modern personal portfolio site',
      description: 'A polished portfolio website built with Next.js and NestJS.',
      coverImage: 'https://example.com/cover.jpg',
      images: ['https://example.com/1.jpg'],
      technologies: ['NestJS', 'Next.js', 'TypeScript'],
      githubUrl: 'https://github.com/example/portfolio',
      liveUrl: 'https://example.com',
      featured: true,
      status: 'published',
      category: 'web',
      viewCount: 12,
      archived: false,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(query: any) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const search = String(query.search ?? '').toLowerCase();
    const category = query.category;
    const technology = query.technology;
    const featured = query.featured;
    const status = query.status;
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';

    let filtered = this.projects.filter((item) => {
      if (item.deleted || item.archived) {
        return false;
      }
      const matchesSearch = !search || [item.title, item.description, item.category, item.status].join(' ').toLowerCase().includes(search);
      const matchesCategory = !category || item.category === category;
      const matchesTechnology = !technology || item.technologies?.includes(technology);
      const matchesFeatured = featured === undefined || item.featured === (featured === 'true');
      const matchesStatus = !status || item.status === status;
      return matchesSearch && matchesCategory && matchesTechnology && matchesFeatured && matchesStatus;
    });

    if (sortBy) {
      filtered = filtered.sort((a, b) => {
        const aValue = (a as any)[sortBy];
        const bValue = (b as any)[sortBy];
        if (aValue === bValue) return 0;
        if (sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
      });
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      success: true,
      message: 'Projects fetched successfully',
      data,
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
      },
    };
  }

  findOne(id: string) {
    const project = this.projects.find((item) => (item.id === id || item.slug === id) && !item.deleted);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return { success: true, message: 'Project fetched successfully', data: project };
  }

  create(dto: any) {
    const project: ProjectRecord = {
      id: `project-${Date.now()}`,
      title: dto.title,
      slug: dto.slug ?? dto.title.toLowerCase().replace(/\s+/g, '-'),
      shortDescription: dto.shortDescription ?? '',
      description: dto.description ?? '',
      coverImage: dto.coverImage,
      images: dto.images ?? [],
      technologies: dto.technologies ?? [],
      githubUrl: dto.githubUrl,
      liveUrl: dto.liveUrl,
      featured: dto.featured ?? false,
      status: dto.status ?? 'draft',
      category: dto.category,
      viewCount: 0,
      archived: false,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.projects.unshift(project);
    return { success: true, message: 'Project created successfully', data: project };
  }

  update(id: string, dto: any) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project || project.deleted) {
      throw new NotFoundException('Project not found');
    }

    Object.assign(project, {
      ...dto,
      updatedAt: new Date(),
    });

    return { success: true, message: 'Project updated successfully', data: project };
  }

  remove(id: string) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project || project.deleted) {
      throw new NotFoundException('Project not found');
    }

    project.deleted = true;
    project.updatedAt = new Date();
    return { success: true, message: 'Project soft deleted successfully' };
  }

  restore(id: string) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.deleted = false;
    project.updatedAt = new Date();
    return { success: true, message: 'Project restored successfully', data: project };
  }

  publish(id: string) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.status = 'published';
    project.updatedAt = new Date();
    return { success: true, message: 'Project published successfully', data: project };
  }

  unpublish(id: string) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.status = 'draft';
    project.updatedAt = new Date();
    return { success: true, message: 'Project unpublished successfully', data: project };
  }

  archive(id: string) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.archived = true;
    project.updatedAt = new Date();
    return { success: true, message: 'Project archived successfully', data: project };
  }

  duplicate(id: string) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const copy: ProjectRecord = {
      ...project,
      id: `project-${Date.now()}`,
      slug: `${project.slug}-copy-${Date.now()}`,
      title: `${project.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
      archived: false,
    };
    this.projects.unshift(copy);
    return { success: true, message: 'Project duplicated successfully', data: copy };
  }

  toggleFeatured(id: string) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    project.featured = !project.featured;
    project.updatedAt = new Date();
    return { success: true, message: 'Project featured status updated', data: project };
  }

  uploadImages(id: string, files: any[]) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    project.images = [...(project.images ?? []), ...(files?.map((file) => file.path || file.originalname) ?? [])];
    project.updatedAt = new Date();
    return { success: true, message: 'Project images uploaded successfully', data: project };
  }

  updateTechnologies(id: string, technologies: string[]) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    project.technologies = technologies;
    project.updatedAt = new Date();
    return { success: true, message: 'Project technologies updated successfully', data: project };
  }

  featured() {
    return {
      success: true,
      message: 'Featured projects fetched successfully',
      data: this.projects.filter((item) => item.featured && !item.deleted && !item.archived),
    };
  }

  incrementView(id: string) {
    const project = this.projects.find((item) => item.id === id || item.slug === id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.viewCount += 1;
    project.updatedAt = new Date();
    return { success: true, message: 'View count updated', data: project };
  }
}
