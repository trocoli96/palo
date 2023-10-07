import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Status } from 'src/statuses/entities/status.entity';
import { Local } from '../../locales/entities/locales.entity';

export class CreateTenantDto {
  @ApiProperty({ example: 'MyTenant' })
  @IsOptional()
  name: string | null;

  @ApiProperty({ type: () => Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  @IsOptional()
  status?: Status;

  @ApiProperty({ type: () => Local })
  @Validate(IsExist, ['Local', 'id'], {
    message: 'localNotExists',
  })
  @IsOptional()
  local?: Local;
}
