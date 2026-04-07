import { LogItem } from '../db/types';

export interface AgentModelResponse {
  tool: string;
  args: LogItem;
  label?: string;
}
