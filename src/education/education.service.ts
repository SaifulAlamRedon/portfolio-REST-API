import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async findAll() {
    const education = await this.educationRepository.find({
      withDeleted: false,
      order: { startYear: 'DESC' },
    });

    return { success: true, message: 'Education fetched successfully', data: education };
  }

  async create(dto: CreateEducationDto) {
    const education = this.educationRepository.create({
      institution: dto.institution,
      degree: dto.degree,
      fieldOfStudy: dto.fieldOfStudy,
      startYear: dto.startYear,
      endYear: dto.endYear,
      description: dto.description,
    });

    const saved = await this.educationRepository.save(education);
    return { success: true, message: 'Education created successfully', data: saved };
  }

  async update(id: string, dto: UpdateEducationDto) {
    const education = await this.educationRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!education) {
      throw new NotFoundException('Education entry not found');
    }

    Object.assign(education, dto);
    const saved = await this.educationRepository.save(education);

    return { success: true, message: 'Education updated successfully', data: saved };
  }

  async remove(id: string) {
    const education = await this.educationRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!education) {
      throw new NotFoundException('Education entry not found');
    }

    await this.educationRepository.softDelete(education.id);
    return { success: true, message: 'Education deleted successfully' };
  }
}
