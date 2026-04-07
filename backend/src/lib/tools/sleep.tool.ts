import { store } from '../db/store';

interface SleepToolArgs {
  userId: string;
  hours: number;
  date?: string;
}

export const sleepTool = {
  name: 'log_sleep',

  execute({ userId, hours, date }: SleepToolArgs) {
    store.addUserLog(userId, {
      sleep: { hours },
      date: date ?? new Date().toISOString().split('T')[0],
    });
    return `Sleep logged: ${hours}`;
  },
};
