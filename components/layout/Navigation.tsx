import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { PersonalData } from '@/types';

interface NavigationProps {
  name: string;
  sections: PersonalData['sections'];
}

export const Navigation: React.FC<NavigationProps> = ({ name, sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Create navigation items based on enabled sections
  const allNavItems = [
    { id: 'home', label: 'Home', enabled: sections.hero },
    { id: 'about', label: 'About', enabled: sections.about },
    { id: 'skills', label: 'Skills', enabled: sections.skills },
    { id: 'experience', label: 'Experience', enabled: sections.experience },
    { id: 'education', label: 'Education', enabled: true }, // Always show education
    { id: 'projects', label: 'Projects', enabled: sections.projects },
    { id: 'testimonials', label: 'Testimonials', enabled: sections.testimonials },
    { id: 'contact', label: 'Contact', enabled: sections.contact },
  ];

  // Filter only enabled sections
  const navItems = allNavItems.filter(item => item.enabled);
  const sectionIds = navItems.map(item => item.id);
  const activeSection = useScrollSpy(sectionIds);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => scrollToSection('home')}
            className="font-bold text-xl text-gray-900 dark:text-white"
          >
            {name}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 relative ${
                  activeSection === item.id
                    ? 'text-primary-500 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-500'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                  />
                )}
              </button>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-2 transition-colors ${
                      activeSection === item.id
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
