import type { UserData, LogItem } from './types';

const users: Record<string, UserData> = {};

export const store = {
  addUser: (data: Partial<UserData>) => {
    const newUserId = Date.now().toString();
    users[newUserId] = { id: newUserId, logs: [] };

    // Merge other fields like name
    if (data.name) {
      users[newUserId].name = data.name;
    }
    return users[newUserId];
  },
  updateUser: (userId: string, data: Partial<UserData>) => {
    if (data.name) {
      users[userId].name = data.name;
    }
    return users[userId];
  },

  getUser: (userId: string): UserData => {
    if (!users[userId]) {
      // create new user and return
      users[userId] = { id: Date.now().toString(), logs: [] };
    }
    return users[userId];
  },

  addUserLog: (userId: string, log: LogItem) => {
    const user = store.getUser(userId);
    user.logs.push(log);
  },
};
