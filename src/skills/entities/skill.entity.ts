import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools'] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

@Entity('skills')
@Index(['name', 'category'], { unique: true })
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 50 })
  category!: string;

  @Column({ type: 'int', default: 0 })
  percentage!: number;

  @Column({ length: 255, nullable: true })
  icon?: string;

  @Column({ type: 'int', default: 0 })
  displayOrder!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
