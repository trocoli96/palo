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
import { addYears } from 'date-fns';

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

  async getOne(id: string): Promise<NullableType<Tenant>> {
    return this.findOne({ id });
  }

  async update(
    id: string,
    tenantData: DeepPartial<UpdateTenantDto>,
  ): Promise<NullableType<Tenant>> {
    await this.findOne({ id }); // Check if the tenant exists
    await this.tenantRepository.update(id, tenantData);
    return this.findOne({ id });
  }

  async remove(id: string): Promise<void> {
    await this.findOne({ id }); // Check if the tenant exists
    await this.tenantRepository.delete(id);
  }

  async updateTenantSubscription({
    tenantId,
    subscriptionId,
    subscriptionType,
    stripeCustomerId,
  }: {
    tenantId: string;
    subscriptionId?: any;
    subscriptionType: 'stripe' | 'shopify';
    stripeCustomerId?: any;
  }) {
    const tenant = await this.findOne({
      id: tenantId,
    });

    if (!tenant) {
      throw new Error(`Tenant with id ${tenantId} not found`);
    }

    tenant.subscriptionActive = true;
    tenant.subscriptionEnd = addYears(new Date(), 1);
    tenant.subscriptionType = subscriptionType;
    if (subscriptionId) {
      tenant.stripeSubscriptionId =
        typeof subscriptionId === 'string'
          ? subscriptionId
          : subscriptionId?.id;
    }
    tenant.stripeCustomerId =
      typeof stripeCustomerId === 'string'
        ? stripeCustomerId
        : stripeCustomerId?.id;

    await this.update(tenantId, tenant);
  }
}
