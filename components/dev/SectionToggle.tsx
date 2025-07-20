import React from 'react';
import { PersonalData } from '@/types';

interface SectionToggleProps {
  sections: PersonalData['sections'];
  onToggle: (section: keyof PersonalData['sections']) => void;
}

export const SectionToggle: React.FC<SectionToggleProps> = ({ sections, onToggle }) => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border z-50">
      <h3 className="text-sm font-semibold mb-2">Toggle Sections</h3>
      {Object.entries(sections).map(([key, enabled]) => (
        <label key={key} className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => onToggle(key as keyof PersonalData['sections'])}
            className="rounded"
          />
          <span className="capitalize">{key}</span>
        </label>
      ))}
    </div>
  );
};
