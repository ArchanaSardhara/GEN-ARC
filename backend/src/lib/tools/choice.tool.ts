import { ToolArgs } from './types';

export const offerChoiceTool = {
  name: 'offer_choice',

  execute({ message, args }: ToolArgs) {
    if (message)
      return {
        userId: args.userId,
        message: message,
        args: args,
      };

    return {
      userId: args.userId,
      message: `What would you like to track today? Sleep, Gym, or Exercise?`,
      args: args,
    };
  },
};
