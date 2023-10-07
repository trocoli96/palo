import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalSeedService } from './local-seed.service';
import { Local } from '../../../locales/entities/locales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Local])],
  providers: [LocalSeedService],
  exports: [LocalSeedService],
})
export class LocalSeedModule {}
