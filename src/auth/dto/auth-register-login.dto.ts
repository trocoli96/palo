import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Tenant } from '../../tenants/entities/tenant.entity';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'f5821670-fe6c-4e55-982c-dfa5e16a4ba5' })
  @Validate(IsExist, ['Tenant', 'id'], {
    message: 'tenantNotExists',
  })
  @IsOptional()
  tenant: Tenant | null;

  @ApiProperty({ example: 'Acme' })
  @IsOptional()
  tenantName: string | null;
}
