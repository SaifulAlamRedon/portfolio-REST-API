import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Index } from 'typeorm';
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
}
