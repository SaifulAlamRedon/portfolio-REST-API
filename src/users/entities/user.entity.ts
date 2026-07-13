import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  fullName!: string;

  @Column({ length: 255, nullable: true })
  refreshToken?: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ length: 255, nullable: true })
  github?: string;

  @Column({ length: 255, nullable: true })
  linkedin?: string;

  @Column({ length: 255, nullable: true })
  portfolio?: string;

  @Column({ length: 150, nullable: true })
  location?: string;

  @Column({ length: 50, default: 'admin' })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
