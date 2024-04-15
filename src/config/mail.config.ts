import { registerAs } from '@nestjs/config';
import { MailConfig } from './config.type';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsEmail()
  MAIL_DEFAULT_EMAIL: string;

  @IsString()
  MAIL_DEFAULT_NAME: string;

  @IsString()
  @IsOptional()
  RESEND_KEY: string;
}

export default registerAs<MailConfig>('mail', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    defaultEmail: process.env.MAIL_DEFAULT_EMAIL,
    defaultName: process.env.MAIL_DEFAULT_NAME,
    resendKey: process.env.RESEND_KEY,
  };
});
