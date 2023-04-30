import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);

  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));
  app.enableCors();

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Solarr API Documentation')
        .setDescription('Solarr API Documentation')
        .setVersion('1.0')
        .addTag('API')
        .addBearerAuth()
        .build()
    )
  );

  await app.listen(config.port);
  console.log(`Server is now listening on port ${config.port}`);
}
bootstrap();
