import { Injectable, Logger } from '@nestjs/common';
import cron from 'node-cron';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor() {
    // Find deliveries to create orders. Every day at midnight
    cron.schedule('0 0 * * *', () => {
      this.logger.debug('Going to execute this cron everyday at midnight');
      // await this.whateverFunctionName();
    });
  }

  doSomething() {
    this.logger.debug('Doing something');
  }

  async executeInitialProcesses() {
    // await this.findCampaignOrderDeliveries();
  }
}
