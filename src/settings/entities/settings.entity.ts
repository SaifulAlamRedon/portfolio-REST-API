import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150, default: 'Portfolio' })
  siteName!: string;

  @Column({ length: 255, nullable: true })
  logo?: string;

  @Column({ length: 255, nullable: true })
  favicon?: string;

  @Column({ length: 255, nullable: true })
  resumeUrl?: string;

  @Column({ type: 'text', nullable: true })
  aboutMe?: string;

  @Column({ length: 255, nullable: true })
  contactEmail?: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 255, nullable: true })
  github?: string;

  @Column({ length: 255, nullable: true })
  linkedIn?: string;

  @Column({ length: 255, nullable: true })
  facebook?: string;

  @Column({ length: 255, nullable: true })
  twitter?: string;

  @Column({ length: 50, nullable: true })
  themeColor?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
