import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { Repository } from 'typeorm';
import { Tenant } from '../../../tenants/entities/tenant.entity';

@Injectable()
export class TenantSeedService {
  constructor(
    @InjectRepository(Tenant)
    private repository: Repository<Tenant>,
  ) {}

  async run() {
    const countTenants = await this.repository.count();

    if (!countTenants) {
      await this.repository.save(
        this.repository.create({
          name: 'Root',
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }
  }
}
