import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth } from '@dataui/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserHelper } from './entities/user-helper.entity';
import { UserHelperService } from './user-helpers.service';
import { CreateUserHelperDto } from './dto/create-helper.dto';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';

@Crud({
  model: {
    type: UserHelper,
  },
  dto: {
    create: CreateUserHelperDto,
  },
  routes: {
    only: ['createOneBase', 'deleteOneBase', 'getManyBase'],
  },
  query: {
    join: {
      tenant: {
        eager: true,
      },
      user: {
        eager: true,
      },
    },
  },
})
@CrudAuth({
  persist: (req: JwtPayloadType) => {
    if (req) {
      return {
        user: req?.id,
        tenant: req?.tenantId,
        dataSource: req?.dataSource,
      };
    } else {
      return {};
    }
  },
  filter: (req: JwtPayloadType) => {
    // That's really shitty for now, but adding the enum is failing as it is not defined
    if (req.role?.name !== 'SuperAdmin') {
      return {
        $and: [
          { 'tenant.id': { $eq: req.tenantId }, 'user.id': { $eq: req.id } },
        ],
      };
    } else {
      return {};
    }
  },
})
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('UserHelpers')
@Controller({
  path: 'user-helpers',
  version: '1',
})
export class UserHelperController {
  constructor(public service: UserHelperService) {}
}
