import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RemoteAgent } from '../../remote-agent/entities/remote-agent.entity';

@Entity('project_snapshots')
@Index(['agentId'], { unique: true })
export class ProjectSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  agentId!: string;

  @OneToOne(() => RemoteAgent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'agentId' })
  agent!: RemoteAgent;

  @Column({ type: 'int', default: 1 })
  version!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  projectName?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  language?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  framework?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  frameworkVersion?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  runtime?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  runtimeVersion?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  packageManager?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  database?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  orm?: string | null;

  @Column({ type: 'boolean', nullable: true })
  docker?: boolean | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  operatingSystem?: string | null;

  @Column({ type: 'jsonb', default: {} })
  evidence!: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
