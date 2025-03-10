import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeState = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' })
    }),
    {
      name: 'theme-storage'
    }
  )
);
