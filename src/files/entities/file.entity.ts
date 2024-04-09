import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import appConfig from '../../config/app.config';
import { AppConfig } from 'src/config/config.type';
import { BaseNotNullableUserTenantEntity } from '../../utils/base-not-nullable-user-tenant-entity';

@Entity({ name: 'file' })
export class FileEntity extends BaseNotNullableUserTenantEntity {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  path: string;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column({
    nullable: true,
  })
  type: string;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.path.indexOf('/') === 0) {
      this.path = (appConfig() as AppConfig).backendDomain + this.path;
    }
  }
}
