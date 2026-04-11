import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ApplicationShareData } from 'src/config/application.share.data';
import { normalizeUrl } from 'src/utils/url';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  async healthCheck(): Promise<HealthCheckResult> {
    const res = await this.health.check([this.checkDocs.bind(this)]);

    return res;
  }

  //  isolate + type properly
  private async checkDocs(): Promise<HealthIndicatorResult> {
    const url = normalizeUrl(
      ApplicationShareData.ENV.API_BASE_UR,
      ApplicationShareData.ENV.API_URL_PREFIX,
    );

    const res = (await this.http.pingCheck(
      'api',
      url,
    )) as HealthIndicatorResult;

    return {
      ...res,
      api: {
        ...res.api,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
