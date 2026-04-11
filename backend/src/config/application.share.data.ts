import { ConfigService } from '@nestjs/config';
import { appModeObj } from 'src/common/static/app.mode.obj';
import { IENV } from 'src/common/types/IENV';
import { normalizeString } from 'src/utils/normalize.string';

export class ApplicationShareData {
  private static env: IENV;

  //Initialize directly from ConfigService
  static initFromConfig(configService: ConfigService<IENV>) {
    this.env = {
      NODE_ENV: normalizeString(
        configService.getOrThrow('NODE_ENV'),
        appModeObj.PRODUCTION,
      ),
      PORT: Number(configService.getOrThrow('PORT')),
      API_URL_PREFIX: configService.getOrThrow('API_URL_PREFIX'),
      API_BASE_UR: configService.getOrThrow('API_BASE_UR'),
      UI_BASE_URL: configService.getOrThrow('UI_BASE_URL'),
      DATABASE_URL: configService.getOrThrow('DATABASE_URL'),
    };
  }

  static get ENV() {
    return this.env;
  }

  static get isDevelopmentMode() {
    return this.env.NODE_ENV === appModeObj.DEVELOPMENT;
  }

  static get isProductionMode() {
    return this.env.NODE_ENV === appModeObj.PRODUCTION;
  }

  static get isTestMode() {
    return this.env.NODE_ENV === appModeObj.TEST;
  }
}
