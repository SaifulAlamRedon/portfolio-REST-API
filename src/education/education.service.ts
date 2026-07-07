import { Injectable, NotFoundException } from '@nestjs/common';

interface EducationRecord {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
  description?: string;
}

@Injectable()
export class EducationService {
  private readonly education: EducationRecord[] = [
    {
      id: 'edu-1',
      institution: 'AIUB',
      degree: 'B.Sc.',
      fieldOfStudy: 'Computer Science',
      startYear: 2020,
      endYear: 2024,
      description: 'Focused on software engineering and web technologies.',
    },
  ];

  findAll() {
    return { success: true, message: 'Education fetched successfully', data: this.education };
  }

  create(dto: any) {
    const item: EducationRecord = {
      id: `edu-${Date.now()}`,
      institution: dto.institution,
      degree: dto.degree,
      fieldOfStudy: dto.fieldOfStudy,
      startYear: dto.startYear,
      endYear: dto.endYear,
      description: dto.description,
    };
    this.education.unshift(item);
    return { success: true, message: 'Education created successfully', data: item };
  }

  update(id: string, dto: any) {
    const item = this.education.find((entry) => entry.id === id);
    if (!item) {
      throw new NotFoundException('Education entry not found');
    }
    Object.assign(item, dto);
    return { success: true, message: 'Education updated successfully', data: item };
  }

  remove(id: string) {
    const index = this.education.findIndex((entry) => entry.id === id);
    if (index === -1) {
      throw new NotFoundException('Education entry not found');
    }
    this.education.splice(index, 1);
    return { success: true, message: 'Education deleted successfully' };
  }
}
