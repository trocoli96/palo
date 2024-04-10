import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TenantsModule } from '../tenants/tenants.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TenantsModule, UsersModule],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
