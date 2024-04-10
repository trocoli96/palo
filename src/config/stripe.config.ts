import { registerAs } from '@nestjs/config';
import { StripeConfig } from './config.type';
import { IsString } from 'class-validator';
import validateConfig from '../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  STRIPE_API_KEY: string;
}

export default registerAs<StripeConfig>('stripe', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    apiKey: process.env.STRIPE_API_KEY,
  };
});
