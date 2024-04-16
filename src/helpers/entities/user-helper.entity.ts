import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseNotNullableUserTenantEntity } from '../../utils/base-not-nullable-user-tenant-entity';

@Entity()
export class UserHelper extends BaseNotNullableUserTenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  key: string;
}
