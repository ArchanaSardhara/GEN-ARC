import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MCPService } from '../mcp/mcp.service';
import { store } from '../db/store';
import { ConfigService } from '@nestjs/config';
import { PROMPT } from './consts';

@Injectable()
export class AgentService {
  private model;

  constructor(
    private mcp: MCPService,
    private config: ConfigService,
  ) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY') || 'NOT_FOUND';
    const apiModel =
      this.config.get<string>('GEMINI_API_MODEL') || 'gemini-2.5-flash';

    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: apiModel,
    });
  }

  async run(userId: string, input: string) {
    const userData = store.getUser(userId);
    const userPrompt: string = PROMPT.replace('{{ input }}', input).replace(
      '{{ user_data }}',
      JSON.stringify(userData),
    );

    const result = await this.model.generateContent(userPrompt);
    const text = result.response.text();

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
