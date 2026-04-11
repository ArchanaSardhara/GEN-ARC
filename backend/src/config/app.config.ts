import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationShareData } from './application.share.data';

export function setupAppConfig(app: NestExpressApplication) {
  //  Trust proxy (important for rate limit, IP, etc.)
  app.set('trust proxy', 1);

  //  Disable x-powered-by (security)
  app.disable('x-powered-by');

  // CORS
  app.enableCors({
    origin: ApplicationShareData.ENV.UI_BASE_URL,
    credentials: true,
  });

  //Global prefix
  app.setGlobalPrefix(ApplicationShareData.ENV.API_URL_PREFIX);
}
