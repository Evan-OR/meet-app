import { getUserDataFromStorage } from '@/lib/storage';
import { User } from '@/types';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserFromLocalStore = async () => {
    const userDataAsString = await getUserDataFromStorage();

    if (userDataAsString) {
      const userData = JSON.parse(userDataAsString) as User;
      setUser(userData);
    }
  };

  useEffect(() => {
    setUserFromLocalStore();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
