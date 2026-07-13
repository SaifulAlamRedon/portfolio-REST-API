import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('certificates')
@Index(['title', 'issuer', 'issueDate'], { unique: true })
@Index(['issueDate'])
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  title!: string;

  @Column({ length: 150 })
  issuer!: string;

  @Column({ type: 'date' })
  issueDate!: string;

  @Column({ length: 255, nullable: true })
  credentialUrl?: string;

  @Column({ length: 255, nullable: true })
  image?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
