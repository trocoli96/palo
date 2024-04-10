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
  id: string;

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

  @Column({ type: 'boolean', nullable: true })
  subscriptionActive: boolean;

  @Column({ nullable: true })
  subscriptionEnd: Date;

  @Column({ nullable: true })
  subscriptionType: string;

  @Column({ nullable: true })
  stripeCustomerId: string;

  @Column({ nullable: true })
  stripeSubscriptionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
