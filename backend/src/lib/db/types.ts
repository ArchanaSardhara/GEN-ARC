export interface UserData {
  id: string;
  name?: string;
  logs: Array<LogItem>; // generic log entries
}

export type MetricType = 'sleep' | 'gym' | 'exercise';
export type LogRecordType = Record<string, number>;
export type LogItem = Partial<Record<`${MetricType}_drift`, number>> &
  Partial<Record<MetricType, LogRecordType>> & {
    date: string; // mandatory date of this log entry
    warning?: string; // optional warning message
    message?: string; // message for greeting user
  };
