import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { MCPService } from '../mcp/mcp.service';
import { store } from '../db/store';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AgentService {
  private model;

  constructor(
    private mcp: MCPService,
    private config: ConfigService,
  ) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY') || 'NOT_FOUND';

    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });
  }

  async run(userId: string, input: string) {
    const userData = store.getUser(userId);

    const prompt = `
You are a drift calcuation assistant.

User Data:
${JSON.stringify(userData)}

User Input:
${input}

Rules:
- If name → save_user
- If sleep → log_sleep
- If gym → log_gym
- If sleep < 7 → warn user

Return JSON:
{
  "tool": "...",
  "args": {}
}

Otherwise normal text.
`;

    const result = await this.model.generateContent(prompt);
    const text = result.response.text();
    console.log('text :::', text);

    try {
      const parsed = JSON.parse(text);

      if (parsed.tool) {
        const toolResult = await this.mcp.execute(parsed.tool, {
          userId,
          ...parsed.args,
        });

        return `✅ ${toolResult}`;
      }
    } catch {}

    return text;
  }
}
