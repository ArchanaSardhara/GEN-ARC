import { Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

import { store } from '../db/store';
import { MCPService } from '../mcp/mcp.service';
import { DriftService } from './drift.service';
import { Metrics, PROMPT } from './consts';
import { AgentModelResponse } from './types';

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

  async run(userId: string, input: string, args: Record<string, any>) {
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
        return { userId: userData.id, message: `Failed! Please try again` };
      }

      if (parsed.tool) {
        store.addUserLog(userId, {
          ...parsed.args,
          date: new Date().toISOString().split('T')[0],
        });
        if (parsed.message) {
          return {
            userId: userData.id,
            message: parsed.message,
            args: parsed.args,
          };
        }
        if (parsed.args.message) {
          return {
            userId: userData.id,
            message: parsed.args.message,
            args: parsed.args,
          };
        }
        if (parsed.args.question) {
          return {
            userId: userData.id,
            message: parsed.args.question,
            args: parsed.args,
          };
        }

        if (parsed.label) {
          return {
            userId: userData.id,
            message: parsed.label,
            args: parsed.args,
          };
        }
        // Calculate drift generically
        parsed.args = this.driftService.calculateDrift(
          userData.logs,
          parsed.args,
          Metrics,
        );

        // const toolResult = this.mcp.execute(parsed.tool, {
        //   userId,
        //   ...parsed.args,
        // });

        return {
          userId: userData.id,
          message: `✅ ${parsed.args.message || parsed.args.question || parsed.label}`,
          args: parsed.args,
        };
      }
    } catch (err) {
      console.error('Error parsing model output:', err);
    }
  }
}
