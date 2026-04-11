import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/main/app.module';
import { IENV } from './common/types/IENV';
import { ApplicationShareData } from './config/application.share.data';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupApplication } from './config/bootstrap';
import { logStartupInfo } from './config/startup-info';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<IENV>);
  ApplicationShareData.initFromConfig(configService);

  setupApplication(app);

  await app.listen(ApplicationShareData.ENV.PORT);

  // clean startup log
  await logStartupInfo(app);
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
