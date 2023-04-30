import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigurationService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: ConfigurationService) {}

  get port(): string {
    return this.configService.get<string>('config.port');
  }

  get dbHost(): string {
    return this.configService.get<string>('config.dbHost');
  }

  get dbPort(): number {
    return Number(this.configService.get<number>('config.dbPort'));
  }

  get dbUser(): string {
    return this.configService.get<string>('config.dbUser');
  }

  get dbPass(): string {
    return this.configService.get<string>('config.dbPass');
  }

  get dbName(): string {
    return this.configService.get<string>('config.dbName');
  }

  // TypeORM
  get typeOrmEntities(): string[] {
    return this.configService.get<string[]>('config.entities');
  }

  get typeOrmSynchronize(): boolean {
    // return this.configService.get<string>('config.env') === 'dev' ? true : false;
    return false;
  }

  get typeOrmMigrations(): string[] {
    return this.configService.get<string[]>('config.migrations');
  }

  get typeOrmConfig() {
    return {
      type: 'mysql',
      host: this.dbHost,
      port: this.dbPort,
      username: this.dbUser,
      password: this.dbPass,
      database: this.dbName,
      entities: this.typeOrmEntities,
      synchronize: this.typeOrmSynchronize
      // migrations: this.typeOrmMigrations,
      // cli: {
      //   migrationsDir: `${__dirname}/../migrations`
      // }
    };
  }

  // JWT
  get jwtSecret(): string {
    return this.configService.get<string>('config.jwtSecret');
  }

  get jwtExpiry(): number {
    return Number(this.configService.get<number>('config.jwtExpiry'));
  }

  // AWS
  get awsS3Bucket(): string {
    return this.configService.get<string>('config.awsS3Bucket');
  }

  get awsS3AccessKey(): string {
    return this.configService.get<string>('config.awsS3AccessKey');
  }

  get awsS3KeySecret(): string {
    return this.configService.get<string>('config.awsS3KeySecret');
  }

  // Sendgrid
  get sendgridKey(): string {
    return this.configService.get<string>('config.sendgridKey');
  }
}
