import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationShareData } from './application.share.data';

export function setupSwagger(app: INestApplication) {
  if (!ApplicationShareData.isDevelopmentMode) return;

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API documentation')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    `${ApplicationShareData.ENV.API_URL_PREFIX}/docs`,
    app,
    document,
  );
}
