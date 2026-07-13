import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('analytics_events')
@Index(['eventType', 'createdAt'])
@Index(['country'])
@Index(['device'])
@Index(['browser'])
export class AnalyticsEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  eventType!: 'visitor' | 'page-view' | 'project-view';

  @Column({ length: 255, nullable: true })
  page?: string;

  @Column({ length: 255, nullable: true })
  referrer?: string;

  @Column({ length: 100, nullable: true })
  browser?: string;

  @Column({ length: 100, nullable: true })
  device?: string;

  @Column({ length: 100, nullable: true })
  country?: string;

  @Column({ length: 100, nullable: true })
  ipAddress?: string;

  @Column({ length: 255, nullable: true })
  userAgent?: string;

  @Column({ length: 100, nullable: true })
  projectId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
