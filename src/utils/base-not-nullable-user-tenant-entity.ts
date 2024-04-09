import { Entity, Index, ManyToOne } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { DataSource } from '../data-source/entities/data-source.entity';

@Entity()
export class BaseNotNullableUserTenantEntity extends EntityHelper {
  @Index()
  @ManyToOne(() => User, {
    eager: false,
    onDelete: 'SET NULL',
  })
  user: User;

  @Index()
  @ManyToOne(() => Tenant, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  tenant: Tenant | null;

  @ManyToOne(() => DataSource, {
    eager: true,
    nullable: true,
  })
  dataSource?: DataSource | null;
}
