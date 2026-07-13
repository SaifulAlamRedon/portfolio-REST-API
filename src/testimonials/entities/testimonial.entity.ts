import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('testimonials')
@Index(['approved', 'createdAt'])
@Index(['rating'])
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 150, nullable: true })
  company?: string;

  @Column({ length: 150, nullable: true })
  designation?: string;

  @Column({ length: 255, nullable: true })
  photo?: string;

  @Column({ type: 'int', default: 5 })
  rating!: number;

  @Column({ type: 'text' })
  message!: string;

  @Column({ default: false })
  approved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
