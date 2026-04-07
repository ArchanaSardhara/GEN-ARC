import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentService } from '@lib/agents/agent.service';
import { MCPService } from '@lib/mcp/mcp.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes process.env available everywhere
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AgentService, MCPService],
})
export class AppModule {}
