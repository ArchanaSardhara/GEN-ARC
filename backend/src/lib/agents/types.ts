import { Intent } from 'src/types/intent';

export interface AgentModelResponse {
  tool: string;
  args: Intent & { message?: string; question?: string };
  label?: string;
  message?: string;
  date: string;
}

export interface AgentResponse {
  userId?: string;
  message: string;
  args: Partial<Intent>;
}
