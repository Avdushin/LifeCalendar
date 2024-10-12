import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@/theme/theme';

const ThemeContext = createContext({
  toggleTheme: () => {},
  themeMode: 'light',
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  // Инициализируем состояние темы из localStorage или используем 'light' по умолчанию
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    () => localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );

  // Функция для переключения темы и сохранения в localStorage
  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
