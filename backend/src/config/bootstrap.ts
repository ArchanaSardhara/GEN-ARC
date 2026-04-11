import { NestExpressApplication } from "@nestjs/platform-express";
import { setupSecurity } from "./security";
import { setupSwagger } from "./swagger";
import { setupAppConfig } from "./app.config";

export function setupApplication(app: NestExpressApplication) {

  //Security (helmet, rate limit, cookies, body parser)
  setupSecurity(app);


  //Swagger (works only for dev mode)
  setupSwagger(app);

  // app-level config
  setupAppConfig(app);

  
}