import { store } from '../db/store';

export const userTool = {
  name: 'save_user',

  async execute({ userId, name }) {
    store.saveUser(userId, { name });
    return `User saved: ${name}`;
  },
};
