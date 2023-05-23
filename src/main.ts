import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shares/helpers/swagger.helper';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shares/filters/http-exception.filter';
import {
  APP_VERSION,
  PORT,
  SERVER_URL,
} from './shares/constants/environment.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = `api/${APP_VERSION}`;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(globalPrefix);

  setupSwagger(app, SERVER_URL);

  await app.listen(PORT);
}

bootstrap();
