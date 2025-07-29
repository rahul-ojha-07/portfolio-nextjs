import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PersonalData } from '@/types';
import { useTheme } from '@/hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
  data: PersonalData;
}

export const Layout: React.FC<LayoutProps> = ({ children, data }) => {
  const { colors } = useTheme();

  return (
    <div
      className="min-h-screen transition-colors"
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
      }}
    >
      <Navigation name={data.name} sections={data.sections} />
      <main className="pt-16">{children}</main>
      <Footer data={data} />
    </div>
  );
};
