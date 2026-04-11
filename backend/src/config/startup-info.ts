import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationShareData } from './application.share.data';

export async function logStartupInfo(app: NestExpressApplication) {
  const env = ApplicationShareData.ENV;

  const url = await app.getUrl();
  const prefix = env.API_URL_PREFIX;

  console.log(`⏱ Started at : ${new Date().toISOString()}`);
  console.log(`🧠 PID        : ${process.pid}`);

  console.log('\n🚀 ================================');
  console.log(`🚀 Server started successfully`);
  console.log('----------------------------------');

  console.log(`🌐 URL        : ${url}/${prefix}`);
  console.log(`📦 ENV        : ${env.NODE_ENV}`);
  console.log(`🔌 PORT       : ${env.PORT}`);

  console.log(`🧭 API Prefix : /${prefix}`);
  console.log(`🌍 CORS UI    : ${env.UI_BASE_URL}`);

  if (ApplicationShareData.isDevelopmentMode) {
    console.log(`📚 Swagger    : ${url}/${prefix}/docs`);
  }

  console.log('================================\n');
}
