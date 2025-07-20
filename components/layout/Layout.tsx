import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PersonalData } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  data: PersonalData;
}

export const Layout: React.FC<LayoutProps> = ({ children, data }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors">
      <Navigation name={data.name} sections={data.sections} />
      <main className="pt-16">
        {children}
      </main>
      <Footer data={data} />
    </div>
  );
};
