import { Injectable } from '@nestjs/common';
import { sleepTool } from '../tools/sleep.tool';
import { gymTool } from '../tools/gym.tool';
import { userTool } from '../tools/user.tool';
import { grettingTool } from '../tools/greet.tool';
import { offerChoiceTool } from '../tools/choice.tool';
import { activityTool } from '../tools/activity.tool';

@Injectable()
export class MCPService {
  private tools = [
    sleepTool,
    gymTool,
    userTool,
    grettingTool,
    offerChoiceTool,
    activityTool,
  ];

  execute(toolName: string, args: any) {
    const tool = this.tools.find((t) => t.name === toolName);

    if (!tool && toolName.includes('log')) {
      activityTool.execute(args);
    }

    if (!tool) {
      return { ...args };
    }

    return tool.execute(args);
  }
}
