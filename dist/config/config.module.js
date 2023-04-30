"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const config_service_1 = require("./config.service");
const config_2 = require("./config");
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [config_2.default],
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
        providers: [config_1.ConfigService, config_service_1.ConfigService],
        exports: [config_1.ConfigService, config_service_1.ConfigService]
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map