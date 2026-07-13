import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from '../projects/entities/technology.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async findAll() {
    const experiences = await this.experienceRepository.find({
      withDeleted: false,
      order: { startDate: 'DESC' },
      relations: { technologies: true },
    });

    return { success: true, message: 'Experiences fetched successfully', data: experiences };
  }

  async create(dto: CreateExperienceDto) {
    const technologies = dto.technologies?.length
      ? await this.findOrCreateTechnologies(dto.technologies)
      : [];

    const experience = this.experienceRepository.create({
      company: dto.company,
      position: dto.position,
      employmentType: dto.employmentType ?? 'Full-time',
      startDate: dto.startDate,
      endDate: dto.endDate,
      currentlyWorking: dto.currentlyWorking ?? false,
      description: dto.description ?? '',
      technologies,
    });

    const saved = await this.experienceRepository.save(experience);
    return { success: true, message: 'Experience created successfully', data: saved };
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const experience = await this.experienceRepository.findOne({
      where: { id },
      withDeleted: false,
      relations: { technologies: true },
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    if (dto.technologies !== undefined) {
      experience.technologies = dto.technologies.length
        ? await this.findOrCreateTechnologies(dto.technologies)
        : [];
    }

    Object.assign(experience, {
      ...dto,
      technologies: experience.technologies,
    });
    const saved = await this.experienceRepository.save(experience);

    return { success: true, message: 'Experience updated successfully', data: saved };
  }

  async remove(id: string) {
    const experience = await this.experienceRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    await this.experienceRepository.softDelete(experience.id);
    return { success: true, message: 'Experience deleted successfully' };
  }

  private async findOrCreateTechnologies(names: string[]) {
    const uniqueNames = [...new Set(names.map((name) => name.trim()).filter(Boolean))];
    const existing = await this.technologyRepository.find({
      where: uniqueNames.map((name) => ({ name })),
    });

    const existingNames = new Set(existing.map((technology) => technology.name.toLowerCase()));
    const toCreate = uniqueNames.filter((name) => !existingNames.has(name.toLowerCase()));

    if (toCreate.length) {
      const created = this.technologyRepository.create(toCreate.map((name) => ({ name })));
      await this.technologyRepository.save(created);
      existing.push(...created);
    }

    return existing.filter((technology) => uniqueNames.some((name) => name.toLowerCase() === technology.name.toLowerCase()));
  }
}
