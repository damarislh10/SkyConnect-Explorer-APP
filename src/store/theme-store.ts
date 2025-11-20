/**
 * Store de Zustand para gestionar el tema (Dark Mode)
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          return { theme: newTheme };
        });
      },
      
      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

