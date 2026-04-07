import { store } from '../db/store';

interface GymToolArgs {
  userId: string;
  minutes: number;
  date?: string;
}

export const gymTool = {
  name: 'log_gym',

  execute({ userId, minutes, date }: GymToolArgs) {
    store.addUserLog(userId, {
      gym: { minutes },
      date: date ?? new Date().toISOString().split('T')[0],
    });
    return `Gym logged: ${minutes}`;
  },
};
