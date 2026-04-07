import { store } from '../db/store';

export const gymTool = {
  name: 'log_gym',

  async execute({ userId, minutes }) {
    store.saveUser(userId, { gym: minutes });
    return `Gym logged: ${minutes}`;
  },
};
