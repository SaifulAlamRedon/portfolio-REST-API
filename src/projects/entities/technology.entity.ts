import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from '../../experiences/entities/experience.entity';
import { Project } from './project.entity';

@Entity('technologies')
@Index(['name'], { unique: true })
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @ManyToMany(() => Project, (project) => project.technologies)
  projects!: Project[];

  @ManyToMany(() => Experience, (experience) => experience.technologies)
  experiences!: Experience[];
}
