import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserHelperDto {
  @IsString()
  @IsNotEmpty()
  key: string;
}
