import { store } from '../db/store';

export const sleepTool = {
  name: 'log_sleep',

  async execute({ userId, hours, date }) {
    store.saveUser(userId, { sleep: { hours, date } });
    return `Sleep logged: ${hours}`;
  },
};
