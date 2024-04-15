import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceSeedService } from './data-source-seed.service';
import { DataSource } from '../../../data-source/entities/data-source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  providers: [DataSourceSeedService],
  exports: [DataSourceSeedService],
})
export class DataSourceSeedModule {}
