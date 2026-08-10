import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppTheme } from './AppTheme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  currentTheme: typeof AppTheme.lightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isSystemDark, setIsSystemDark] = useState<boolean>(false);

  useEffect(() => {
    // Load persisted theme
    const savedTheme = localStorage.getItem('THEME_MODE') as ThemeMode;
    if (savedTheme) {
      setThemeModeState(savedTheme);
    }

    // System theme listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(mediaQuery.matches);

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('THEME_MODE', mode);
  };

  const isDark = themeMode === 'dark' || (themeMode === 'system' && isSystemDark);
  const currentTheme = isDark ? AppTheme.darkTheme : AppTheme.lightTheme;

  // Apply Tailwind dark mode class to HTML root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
