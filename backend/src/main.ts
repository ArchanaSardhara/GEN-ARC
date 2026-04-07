import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // Get ConfigService from the app context
  const appUrl = configService.get<string>('APP_URL') || '*';
  const port = configService.get<number>('PORT') || 5000;

  app.enableCors({
    origin: appUrl, // frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
