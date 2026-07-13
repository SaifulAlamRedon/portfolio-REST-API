import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('email_logs')
export class EmailLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  type!: string;

  @Column('text')
  payload!: string;

  @Column({ nullable: true })
  recipient?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
