import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { AgentService } from '@lib/agents/agent.service';
import { MCPService } from '@lib/mcp/mcp.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly agentService: AgentService,
    private readonly mcpService: MCPService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('agent')
  async runAgent(@Body() body: any) {
    const { userId, message } = body;

    // Run Gemini agent
    const response = await this.agentService.run(userId, message);

    return { response };
  }
}
