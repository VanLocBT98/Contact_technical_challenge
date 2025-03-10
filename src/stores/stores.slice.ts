import { StoreApi, create } from 'zustand';

import { AuthState, createAuthStore } from './auth.slice';
import { ThemeState, createThemeStore } from './theme.slice';

export type AppStore = {
  auth: AuthState;
  theme: ThemeState;
};

export const createAppStore = (): StoreApi<AppStore> =>
  create<AppStore>()((set) => ({
    auth: createAuthStore(set),
    theme: createThemeStore(set)
  }));
