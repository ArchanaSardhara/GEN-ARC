import { store } from '../db/store';

interface UserToolArgs {
  userId?: string;
  name?: string;
}

export const userTool = {
  name: 'save_user',

  execute({ userId, name }: UserToolArgs) {
    if (!userId) {
      store.addUser({ name });
    } else {
      store.updateUser(userId, { name });
    }
    return `User saved: ${name}`;
  },
};
