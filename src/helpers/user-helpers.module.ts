import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHelper } from './entities/user-helper.entity';
import { UserHelperController } from './user-helpers.controller';
import { UserHelperService } from './user-helpers.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserHelper])],
  controllers: [UserHelperController],
  providers: [UserHelperService],
})
export class UserHelperModule {}
