import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Tenant } from './entities/tenant.entity';
import { NullableType } from '../utils/types/nullable.type';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { plainToClass } from 'class-transformer';
import { Status } from '../statuses/entities/status.entity';
import { StatusEnum } from '../statuses/statuses.enum';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(tenantData: DeepPartial<CreateTenantDto>): Promise<Tenant> {
    const tenantToCreate: DeepPartial<CreateTenantDto> = {
      ...tenantData,
      status: tenantData?.status
        ? tenantData?.status
        : plainToClass(Status, {
            id: StatusEnum.active,
          }),
    };
    const tenant = this.tenantRepository.create(tenantToCreate);
    return this.tenantRepository.save(tenant);
  }

  async findAll(paginationOptions: IPaginationOptions): Promise<Tenant[]> {
    return this.tenantRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findOne(
    fields: EntityCondition<Tenant>,
  ): Promise<NullableType<Tenant>> {
    return this.tenantRepository.findOne({
      where: fields,
    });
  }

  async getOne(id: number): Promise<NullableType<Tenant>> {
    return this.findOne({ id });
  }

  async update(
    id: number,
    tenantData: DeepPartial<UpdateTenantDto>,
  ): Promise<NullableType<Tenant>> {
    await this.findOne({ id }); // Check if the tenant exists
    await this.tenantRepository.update(id, tenantData);
    return this.findOne({ id });
  }

  async remove(id: number): Promise<void> {
    await this.findOne({ id }); // Check if the tenant exists
    await this.tenantRepository.delete(id);
  }
}
