import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../statuses/entities/status.entity';
import { Local } from '../../locales/entities/locales.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: String, unique: true, nullable: true })
  name: string | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @ManyToOne(() => Local, {
    eager: true,
  })
  local?: Local;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
