import { create } from 'zustand';

import { IUser } from '~/shares/services/auth/types';

interface IUserInterface {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useUserState = create<IUserInterface>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}));
