import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Technology } from './technology.entity';

@Entity('projects')
@Index(['slug'], { unique: true })
@Index(['status'])
@Index(['featured'])
@Index(['archived'])
@Index(['createdAt'])
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  title!: string;

  @Column({ length: 150 })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  shortDescription?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  coverImage?: string;

  @Column('text', { array: true, nullable: true })
  images?: string[];

  @ManyToMany(() => Technology, (technology) => technology.projects, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable({ name: 'project_technologies' })
  technologies?: Technology[];

  @ManyToOne(() => Category, (category) => category.projects, {
    cascade: ['insert', 'update'],
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  @Column({ nullable: true })
  githubUrl?: string;

  @Column({ nullable: true })
  liveUrl?: string;

  @Column({ default: false })
  featured!: boolean;

  @Column({ default: 'draft' })
  status!: string;

  @Column({ default: 0 })
  viewCount!: number;

  @Column({ default: false })
  archived!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
