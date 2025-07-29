import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/components/providers/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  // Determine next theme label for accessibility
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  // Background color for the button, choosing an appropriate surface based on theme
  // You can add 'toggleBg' colors in your color scheme as well for more customization
  const bgColor = theme === 'light' ? colors.card || '#f3f4f6' : colors.card || '#1f2937';

  // Icon color for visible contrast
  const iconColor = theme === 'light' ? colors.primary : colors.accent || colors.primary;

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      className="p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: bgColor,
        color: iconColor,
        boxShadow: `0 0 4px ${iconColor}88`, // subtle glow around icon
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'light' ? (
        <FiMoon size={20} aria-hidden="true" />
      ) : (
        <FiSun size={20} aria-hidden="true" />
      )}
    </motion.button>
  );
};
