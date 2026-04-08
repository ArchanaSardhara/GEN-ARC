import { store } from '../db/store';
import { offerChoiceTool } from './choice.tool';
import { ToolArgs } from './types';

interface GymToolArgs {
  userId: string;
  minutes: number;
  date?: string;
}

export const gymTool = {
  name: 'log_gym',

  execute({ userId, message, args }: ToolArgs) {
    store.addUserLog(userId, {
      ...args,
      date: args.date ?? new Date().toISOString().split('T')[0],
    });
    if (message) {
      return { userId, args, message };
    } else {
      offerChoiceTool.execute({ userId, message: '', args });
    }
  },
};
