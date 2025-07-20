import { useContext } from 'react';
import { ThemeContext } from '../components/providers/ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Additional theme-related hooks for advanced usage
export const useThemeColors = () => {
  const { colors } = useTheme();
  return colors;
};

export const useIsDarkMode = () => {
  const { theme } = useTheme();
  return theme === 'dark';
};

export const useThemeTransition = () => {
  const { theme, toggleTheme } = useTheme();
  
  const switchToLight = () => {
    if (theme === 'dark') toggleTheme();
  };
  
  const switchToDark = () => {
    if (theme === 'light') toggleTheme();
  };
  
  return {
    switchToLight,
    switchToDark,
    toggle: toggleTheme,
    current: theme,
  };
};
