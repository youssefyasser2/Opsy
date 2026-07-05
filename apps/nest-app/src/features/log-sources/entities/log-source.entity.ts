import { Column } from 'typeorm/browser/decorator/columns/Column.js';
import { CreateDateColumn } from 'typeorm/browser/decorator/columns/CreateDateColumn.js';
import { PrimaryGeneratedColumn } from 'typeorm/browser/decorator/columns/PrimaryGeneratedColumn.js';
import { UpdateDateColumn } from 'typeorm/browser/decorator/columns/UpdateDateColumn.js';
import { LogSourcesStatus } from '../enums/log-sources-status.enum';
import { LogSourcesType } from '../enums/log-sources-type.enum';
import { Entity } from 'typeorm';

@Entity()
export class LogSource {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ownerId!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  type!: LogSourcesType;

  @Column()
  status!: LogSourcesStatus;

  @Column({ type: 'simple-json' })
  config!: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
