interface UserData {
  name?: string;
  sleep?: Record<string, number>;
  gym?: Record<string, number>;
}

const users: Record<string, UserData> = {};

export const store = {
  saveUser: (id: string, data: Partial<UserData>) => {
    if (data.sleep) {
      users[id] = {
        ...(users[id] || {}),
        sleep: { ...(users[id].sleep || {}), ...data.sleep },
      };
    } else if (data.gym) {
      users[id] = {
        ...(users[id] || {}),
        gym: { ...(users[id].gym || {}), ...data.gym },
      };
    } else {
      users[id] = { ...(users[id] || {}), ...data };
    }
  },

  getUser: (id: string): UserData => {
    return users[id] || {};
  },
};
