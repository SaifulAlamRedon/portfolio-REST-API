import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Technology } from '../../projects/entities/technology.entity';

@Entity('experiences')
@Index(['company', 'position', 'startDate'], { unique: true })
@Index(['startDate'])
@Index(['currentlyWorking'])
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  company!: string;

  @Column({ length: 150 })
  position!: string;

  @Column({ length: 50, default: 'Full-time' })
  employmentType!: string;

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'date', nullable: true })
  endDate?: string;

  @Column({ default: false })
  currentlyWorking!: boolean;

  @ManyToMany(() => Technology, (technology) => technology.experiences, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable({ name: 'experience_technologies' })
  technologies!: Technology[];

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
