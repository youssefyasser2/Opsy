import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RemoteAgentStatus } from '../enums/remote-agent-status.enum';
import { RemoteAgentConnectionStatus } from '../enums/remote-agent-connection-status.enum';

@Entity('remote_agents')
@Index(['fingerprint'], { unique: true })
@Index(['status'])
@Index(['connectionStatus'])
export class RemoteAgent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255, unique: true })
  fingerprint!: string;

  @Column({ length: 80 })
  version!: string;

  @Column({
    type: 'enum',
    enum: RemoteAgentStatus,
    default: RemoteAgentStatus.PENDING,
  })
  status!: RemoteAgentStatus;

  @Column({
    type: 'enum',
    enum: RemoteAgentConnectionStatus,
    default: RemoteAgentConnectionStatus.UNKNOWN,
  })
  connectionStatus!: RemoteAgentConnectionStatus;

  @Column({ type: 'timestamptz', nullable: true })
  lastSeenAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  lastHeartbeatAt?: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
