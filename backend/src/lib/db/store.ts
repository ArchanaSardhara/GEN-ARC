interface UserData {
    name?: string;
    sleep?: number;
    gym?: number;
  }
  
  const users: Record<string, UserData> = {};
  
  export const store = {
    saveUser: (id: string, data: Partial<UserData>) => {
      users[id] = { ...(users[id] || {}), ...data };
    },
  
    getUser: (id: string): UserData => {
      return users[id] || {};
    }
  };