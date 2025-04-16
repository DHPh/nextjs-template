import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "vi-vn",
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
      storage: typeof window !== 'undefined' ? 
        {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            return str ? JSON.parse(str) : null;
          },
          setItem: (name, value) => {
            localStorage.setItem('language', value.state.language);
            localStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => {
            localStorage.removeItem(name);
            localStorage.removeItem('language');
          },
        }
        : undefined,
    }
  )
);