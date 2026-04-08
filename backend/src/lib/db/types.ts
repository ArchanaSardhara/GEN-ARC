import { Intent } from 'src/types/intent';

export interface UserData {
  id: string;
  name?: string;
  logs: Array<Intent>; // generic log entries
}

export type MetricType = 'sleep' | 'gym' | 'exercise';
