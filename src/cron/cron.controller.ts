import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CronService } from './cron.service';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';

@ApiBearerAuth()
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Cron')
@Controller({
  path: 'cron',
  version: '1',
})
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post('example')
  getExample() {
    return this.cronService.doSomething();
  }
}
