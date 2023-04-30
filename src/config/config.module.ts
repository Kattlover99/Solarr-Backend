import { Module } from '@nestjs/common';
import {
  ConfigModule as ConfigurationModule,
  ConfigService as ConfigurationService
} from '@nestjs/config';
import * as Joi from 'joi';

import { ConfigService } from './config.service';
import config from './config';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().port(),
        ENV: Joi.string().valid('dev', 'prod'),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number().port(),
        DB_USER: Joi.string(),
        DB_PASS: Joi.string(),
        DB_NAME: Joi.string(),
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES_IN: Joi.number()
      })
    })
  ],
  providers: [ConfigurationService, ConfigService],
  exports: [ConfigurationService, ConfigService]
})
export class ConfigModule {}
