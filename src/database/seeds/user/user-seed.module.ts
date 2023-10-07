import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserSeedService } from './user-seed.service';
import { TenantsModule } from '../../../tenants/tenants.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TenantsModule],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
