import React, { createContext, useContext, useEffect, useState } from 'react';
import { PersonalData } from '@/types';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: PersonalData['colorSchemes']['light'];
}

// Export the context so the hook can access it
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  colorSchemes: PersonalData['colorSchemes'];
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  colorSchemes 
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    
    // Apply CSS custom properties for dynamic colors
    const colors = colorSchemes[theme];
    const root = document.documentElement;
    
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-foreground', colors.foreground);
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
  }, [theme, colorSchemes]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        colors: colorSchemes[theme] 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Keep the existing useTheme hook here for backward compatibility
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
