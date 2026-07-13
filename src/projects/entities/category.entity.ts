import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Project } from './project.entity';
@Entity('categories')
@Index(['name'], { unique: true })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @OneToMany(() => Project, (project) => project.category)
  projects!: Project[];
}
