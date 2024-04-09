import { Entity, Index, ManyToOne } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Tenant } from '../tenants/entities/tenant.entity';
import { DataSource } from '../data-source/entities/data-source.entity';

@Entity()
export class BaseNotNullableTenantEntity extends EntityHelper {
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
