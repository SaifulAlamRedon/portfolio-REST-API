import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('cloudinary_assets')
export class CloudinaryAsset {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  publicId!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  format?: string;

  @Column({ nullable: true })
  resourceType?: string;

  @Column({ nullable: true })
  secureUrl?: string;

  @Column({ nullable: true })
  type?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
