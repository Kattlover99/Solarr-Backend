"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ConfigService = class ConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get port() {
        return this.configService.get('config.port');
    }
    get dbHost() {
        return this.configService.get('config.dbHost');
    }
    get dbPort() {
        return Number(this.configService.get('config.dbPort'));
    }
    get dbUser() {
        return this.configService.get('config.dbUser');
    }
    get dbPass() {
        return this.configService.get('config.dbPass');
    }
    get dbName() {
        return this.configService.get('config.dbName');
    }
    get typeOrmEntities() {
        return this.configService.get('config.entities');
    }
    get typeOrmSynchronize() {
        return false;
    }
    get typeOrmMigrations() {
        return this.configService.get('config.migrations');
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
        };
    }
    get jwtSecret() {
        return this.configService.get('config.jwtSecret');
    }
    get jwtExpiry() {
        return Number(this.configService.get('config.jwtExpiry'));
    }
    get awsS3Bucket() {
        return this.configService.get('config.awsS3Bucket');
    }
    get awsS3AccessKey() {
        return this.configService.get('config.awsS3AccessKey');
    }
    get awsS3KeySecret() {
        return this.configService.get('config.awsS3KeySecret');
    }
    get sendgridKey() {
        return this.configService.get('config.sendgridKey');
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map