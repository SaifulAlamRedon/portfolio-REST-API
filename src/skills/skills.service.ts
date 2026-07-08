import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async findAll() {
    const skills = await this.skillRepository.find({
      where: { deletedAt: null },
      order: { displayOrder: 'ASC' },
    });

    return { success: true, message: 'Skills fetched successfully', data: skills };
  }

  async create(dto: CreateSkillDto) {
    const skill = this.skillRepository.create({
      name: dto.name,
      category: dto.category ?? 'Tools',
      percentage: dto.percentage ?? 0,
      icon: dto.icon,
      displayOrder: dto.displayOrder ?? (await this.skillRepository.count()) + 1,
    });

    await this.skillRepository.save(skill);

    return { success: true, message: 'Skill created successfully', data: skill };
  }

  async update(id: string, dto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({ where: { id, deletedAt: null } });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    Object.assign(skill, dto);
    await this.skillRepository.save(skill);

    return { success: true, message: 'Skill updated successfully', data: skill };
  }

  async remove(id: string) {
    const skill = await this.skillRepository.findOne({ where: { id, deletedAt: null } });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    await this.skillRepository.softDelete(id);
    return { success: true, message: 'Skill deleted successfully' };
  }

  async reorder(items: Array<{ id: string; displayOrder: number }>) {
    const skills = await this.skillRepository.findBy({ id: items.map((item) => item.id) });
    const skillMap = new Map(skills.map((skill) => [skill.id, skill]));

    for (const item of items) {
      const skill = skillMap.get(item.id);
      if (skill) {
        skill.displayOrder = item.displayOrder;
      }
    }

    await this.skillRepository.save(Array.from(skillMap.values()));

    return {
      success: true,
      message: 'Skills reordered successfully',
      data: await this.findAll(),
    };
  }
}
