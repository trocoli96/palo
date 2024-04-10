import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CampaignDeliveriesModule } from '../campaign-deliveries/campaign-deliveries.module';
import { CronController } from './cron.controller';
import { ProductsModule } from '../products/modules/products.module';

@Module({
  imports: [CampaignDeliveriesModule, ProductsModule],
  controllers: [CronController],
  providers: [CronService],
})
export class CronModule {}
