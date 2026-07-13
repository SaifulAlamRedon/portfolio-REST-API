import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('uploads')
@Index(['resourceType', 'category', 'publicId'], { unique: true })
@Index(['category'])
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  resourceType!: 'image' | 'pdf' | 'video' | 'raw';

  @Column({ length: 100 })
  category!: 'avatar' | 'project' | 'certificate' | 'resume' | 'other';

  @Column({ length: 255 })
  publicId!: string;

  @Column({ length: 255, nullable: true })
  secureUrl?: string;

  @Column({ length: 255, nullable: true })
  originalName?: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
