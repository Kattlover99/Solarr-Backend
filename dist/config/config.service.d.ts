import { ConfigService as ConfigurationService } from '@nestjs/config';
export declare class ConfigService {
    private configService;
    constructor(configService: ConfigurationService);
    get port(): string;
    get dbHost(): string;
    get dbPort(): number;
    get dbUser(): string;
    get dbPass(): string;
    get dbName(): string;
    get typeOrmEntities(): string[];
    get typeOrmSynchronize(): boolean;
    get typeOrmMigrations(): string[];
    get typeOrmConfig(): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        entities: string[];
        synchronize: boolean;
    };
    get jwtSecret(): string;
    get jwtExpiry(): number;
    get awsS3Bucket(): string;
    get awsS3AccessKey(): string;
    get awsS3KeySecret(): string;
    get sendgridKey(): string;
}
