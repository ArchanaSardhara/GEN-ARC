import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import express from 'express';
import { join } from 'path';

import { AppService } from './app.service';
import { AgentService } from '@lib/agents/agent.service';
import { MCPService } from '@lib/mcp/mcp.service';
import { DriftService } from '@lib/agents/drift.service';

@Controller()
export class AppController {
  constructor(
    private readonly _appService: AppService,
    private readonly agentService: AgentService,
    private readonly _mcpService: MCPService,
    private readonly _draftService: DriftService,
  ) {}

  @Get('/')
  serveHtml(@Res() res: express.Response) {
    const filePath = join(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath);
  }

  @Post('agent')
  async runAgentPost(
    @Body()
    body: {
      userId: string;
      message: string;
      args: Record<string, any>;
    },
  ) {
    const { userId, message, args } = body;

    // Run Gemini agent
    const res = await this.agentService.run(userId, message, args);

    return { response: res?.message, userId: res?.userId, args: res?.args };
  }
}
