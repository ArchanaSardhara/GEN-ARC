import { store } from '../db/store';

export const sleepTool = {
  name: 'log_sleep',

  async execute({ userId, hours }) {
    store.saveUser(userId, { sleep: hours });
    return `Sleep logged: ${hours}`;
  },
};
