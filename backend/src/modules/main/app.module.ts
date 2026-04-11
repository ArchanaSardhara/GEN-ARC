import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AgentService } from '@lib/agents/agent.service';
import { DriftService } from '@lib/agents/drift.service';
import { MCPService } from '@lib/mcp/mcp.service';
import { ApplicationShareData } from 'src/config/application.share.data';
import { validateEnv } from 'src/config/env.validation';
import { HealthModule } from '../helper/health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes process.env available everywhere
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv, // HERE
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_SHARE_INIT',
      useFactory: (configService: ConfigService) => {
        ApplicationShareData.initFromConfig(configService);
      },
      inject: [ConfigService],
    },

    AppService,
    AgentService,
    MCPService,
    DriftService,
  ],
})
export class AppModule {}
