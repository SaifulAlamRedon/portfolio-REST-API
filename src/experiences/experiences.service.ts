import { Injectable, NotFoundException } from '@nestjs/common';

interface ExperienceRecord {
  id: string;
  company: string;
  position: string;
  employmentType: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  technologies?: string[];
  description: string;
}

@Injectable()
export class ExperiencesService {
  private readonly experiences: ExperienceRecord[] = [
    {
      id: 'exp-1',
      company: 'Tech Studio',
      position: 'Full Stack Developer',
      employmentType: 'Full-time',
      startDate: '2023-01-01',
      endDate: '2024-01-01',
      currentlyWorking: false,
      technologies: ['NestJS', 'React'],
      description: 'Built portfolio and internal dashboard tools.',
    },
  ];

  findAll() {
    return { success: true, message: 'Experiences fetched successfully', data: [...this.experiences].sort((a, b) => b.startDate.localeCompare(a.startDate)) };
  }

  create(dto: any) {
    const experience: ExperienceRecord = {
      id: `exp-${Date.now()}`,
      company: dto.company,
      position: dto.position,
      employmentType: dto.employmentType ?? 'Full-time',
      startDate: dto.startDate,
      endDate: dto.endDate,
      currentlyWorking: dto.currentlyWorking ?? false,
      technologies: dto.technologies ?? [],
      description: dto.description ?? '',
    };
    this.experiences.unshift(experience);
    return { success: true, message: 'Experience created successfully', data: experience };
  }

  update(id: string, dto: any) {
    const experience = this.experiences.find((item) => item.id === id);
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }
    Object.assign(experience, dto);
    return { success: true, message: 'Experience updated successfully', data: experience };
  }

  remove(id: string) {
    const index = this.experiences.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException('Experience not found');
    }
    this.experiences.splice(index, 1);
    return { success: true, message: 'Experience deleted successfully' };
  }
}
