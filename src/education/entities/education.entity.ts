import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('education')
@Index(['institution', 'degree', 'fieldOfStudy', 'startYear'], { unique: true })
@Index(['startYear'])
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  institution!: string;

  @Column({ length: 100 })
  degree!: string;

  @Column({ length: 150 })
  fieldOfStudy!: string;

  @Column({ type: 'int' })
  startYear!: number;

  @Column({ type: 'int', nullable: true })
  endYear?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
