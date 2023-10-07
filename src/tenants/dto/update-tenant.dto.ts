import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { Status } from '../../statuses/entities/status.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class UpdateTenantDto {
  @ApiProperty({ example: 'MyUpdatedTenant' })
  @IsOptional()
  name?: string | null;

  @ApiProperty({ type: () => Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  @IsOptional()
  status?: Status;
}
