import { store } from '../db/store';
import { offerChoiceTool } from './choice.tool';
import { ToolArgs } from './types';

export const activityTool = {
  name: 'log_activity',

  execute({ userId, args, message }: ToolArgs) {
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
