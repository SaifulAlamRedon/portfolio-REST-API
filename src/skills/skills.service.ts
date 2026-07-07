import { Injectable, NotFoundException } from '@nestjs/common';

interface SkillRecord {
  id: string;
  name: string;
  category: string;
  percentage: number;
  icon?: string;
  displayOrder: number;
}

@Injectable()
export class SkillsService {
  private readonly skills: SkillRecord[] = [
    { id: 'skill-1', name: 'NestJS', category: 'Backend', percentage: 90, icon: '⚙️', displayOrder: 1 },
    { id: 'skill-2', name: 'React', category: 'Frontend', percentage: 88, icon: '⚛️', displayOrder: 2 },
  ];

  findAll() {
    return { success: true, message: 'Skills fetched successfully', data: [...this.skills].sort((a, b) => a.displayOrder - b.displayOrder) };
  }

  create(dto: any) {
    const skill: SkillRecord = {
      id: `skill-${Date.now()}`,
      name: dto.name,
      category: dto.category ?? 'Tools',
      percentage: dto.percentage ?? 0,
      icon: dto.icon,
      displayOrder: dto.displayOrder ?? this.skills.length + 1,
    };
    this.skills.push(skill);
    return { success: true, message: 'Skill created successfully', data: skill };
  }

  update(id: string, dto: any) {
    const skill = this.skills.find((item) => item.id === id);
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    Object.assign(skill, dto);
    return { success: true, message: 'Skill updated successfully', data: skill };
  }

  remove(id: string) {
    const index = this.skills.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException('Skill not found');
    }
    this.skills.splice(index, 1);
    return { success: true, message: 'Skill deleted successfully' };
  }

  reorder(items: Array<{ id: string; displayOrder: number }>) {
    items.forEach(({ id, displayOrder }) => {
      const skill = this.skills.find((item) => item.id === id);
      if (skill) {
        skill.displayOrder = displayOrder;
      }
    });
    return { success: true, message: 'Skills reordered successfully', data: this.findAll().data };
  }
}
