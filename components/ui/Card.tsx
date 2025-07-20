import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  variant = 'default'
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 shadow-lg',
    bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/20',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverEffects = hover 
    ? 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]' 
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverEffects} ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Specialized card components
export const ProjectCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <Card variant="elevated" className={`group cursor-pointer ${className}`}>
    {children}
  </Card>
);

export const SkillCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <Card 
    variant="bordered" 
    padding="sm" 
    className={`text-center hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 ${className}`}
  >
    {children}
  </Card>
);

export const TestimonialCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <Card 
    variant="glass" 
    className={`relative overflow-hidden ${className}`}
  >
    {children}
  </Card>
);

export const InfoCard: React.FC<{ 
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}> = ({ title, value, icon, className = '' }) => (
  <Card 
    variant="bordered" 
    padding="md" 
    className={`text-center group ${className}`}
  >
    {icon && (
      <div className="w-12 h-12 mx-auto mb-4 text-primary-500 group-hover:scale-110 transition-transform">
        {icon}
      </div>
    )}
    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      {value}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400">
      {title}
    </div>
  </Card>
);
