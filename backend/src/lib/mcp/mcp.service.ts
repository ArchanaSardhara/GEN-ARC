import { Injectable } from '@nestjs/common';
import { sleepTool } from '../tools/sleep.tool';
import { gymTool } from '../tools/gym.tool';
import { userTool } from '../tools/user.tool';

@Injectable()
export class MCPService {
  private tools = [sleepTool, gymTool, userTool];

  async execute(toolName: string, args: any) {
    const tool = this.tools.find((t) => t.name === toolName);

    if (!tool) {
      throw new Error('Tool not found');
    }

    return tool.execute(args);
  }
}
