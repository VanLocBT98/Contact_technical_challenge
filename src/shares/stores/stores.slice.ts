import { StoreApi, create } from 'zustand';

import { AuthState, createAuthStore } from './auth.slice';

export type AppStore = {
  auth: AuthState;
};

export const createAppStore = (): StoreApi<AppStore> =>
  create<AppStore>()((set) => ({
    auth: createAuthStore(set)
  }));
