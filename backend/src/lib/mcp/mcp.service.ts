import { Injectable } from '@nestjs/common';
import { sleepTool } from '../tools/sleep.tool';
import { gymTool } from '../tools/gym.tool';
import { userTool } from '../tools/user.tool';
import { grettingTool } from '../tools/greet.tool';
import { offerChoiceTool } from '../tools/choice.tool';

@Injectable()
export class MCPService {
  private tools = [sleepTool, gymTool, userTool, grettingTool, offerChoiceTool];

  execute(toolName: string, args: any) {
    console.log('toolName', toolName, args);
    const tool = this.tools.find((t) => t.name === toolName);

    if (!tool) {
      if (args.message || args.question) {
        return args.message || args.question;
      } else {
        throw new Error('Tool not found');
      }
    }

    return tool.execute(args);
  }
}
