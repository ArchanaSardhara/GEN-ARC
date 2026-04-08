import { Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

import { store } from '../db/store';
import { MCPService } from '../mcp/mcp.service';
import { DriftService } from './drift.service';
import { Metrics, PROMPT } from './consts';
import { AgentModelResponse, AgentResponse } from './types';

@Injectable()
export class AgentService {
  private model: GenerativeModel;

  constructor(
    private mcp: MCPService,
    private config: ConfigService,
    private driftService: DriftService,
  ) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY') || 'NOT_FOUND';
    const apiModel =
      this.config.get<string>('GEMINI_API_MODEL') || 'gemini-2.5-flash';

    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: apiModel,
    });
  }

  async run(
    userId: string,
    input: string,
    args: Record<string, any>,
  ): Promise<AgentResponse> {
    try {
      var userData = userId ? store.getUser(userId) : store.addUser({});
      if (args) {
        userData = { ...userData, ...args };
      }
      const userPrompt: string = PROMPT.replace('{{ input }}', input).replace(
        '{{ user_data }}',
        JSON.stringify(userData),
      );

      const result = await this.model.generateContent(userPrompt);

      const regex = /```json\s*([\s\S]*?)```/m;
      const text: string = result.response.text();
      const match = text.match(regex);
      let parsed: AgentModelResponse | null = null;
      if (match) {
        const jsonString = match[1].trim();
        // You can now safely parse it:
        parsed = JSON.parse(jsonString) as unknown as AgentModelResponse;
      } else {
        parsed = JSON.parse(text) as unknown as AgentModelResponse;
      }

      if (!parsed) {
        return {
          userId: userData?.id ?? null,
          message: `Failed! Please try again`,
          args: args,
        };
      }

      if (parsed.tool) {
        if (Metrics.some((m) => parsed.tool.includes(m))) {
          // Calculate drift generically
          parsed.args = this.driftService.calculateDrift(
            userData.logs,
            parsed.args,
          );
        }
        const toolResult = this.mcp.execute(parsed.tool, {
          userId: userData.id,
          message: parsed.message,
          args: parsed.args,
        });

        store.addUserLog(userData.id, {
          ...parsed.args,
          tool: parsed.tool,
          date: new Date().toISOString().split('T')[0],
        });

        return {
          userId: userData.id,
          message: toolResult?.message ?? parsed.message,
          args: toolResult?.args,
        };
      }
    } catch (err) {
      console.error('Error parsing model output:', err);
    }

    return {
      userId: userId ?? null,
      message: 'Something went wrong. Please try again.',
      args,
    };
  }
}
