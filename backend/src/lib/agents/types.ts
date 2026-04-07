import { LogItem } from '../db/types';

export interface AgentModelResponse {
  tool: string;
  args: LogItem & { message?: string; question?: string };
  label?: string;
  message?: string;
}
