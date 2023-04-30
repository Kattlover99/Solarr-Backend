"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
const response_interceptor_1 = require("./interceptors/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_service_1.ConfigService);
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor(new core_1.Reflector()));
    app.enableCors();
    swagger_1.SwaggerModule.setup('api', app, swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
        .setTitle('Solarr API Documentation')
        .setDescription('Solarr API Documentation')
        .setVersion('1.0')
        .addTag('API')
        .addBearerAuth()
        .build()));
    await app.listen(config.port);
    console.log(`Server is now listening on port ${config.port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map