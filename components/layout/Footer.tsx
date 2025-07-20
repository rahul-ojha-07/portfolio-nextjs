import React from 'react';
import { PersonalData } from '@/types';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

interface FooterProps {
  data: PersonalData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            {data.contact.social.github && (
              <a
                href={data.contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={24} />
              </a>
            )}
            {data.contact.social.linkedin && (
              <a
                href={data.contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={24} />
              </a>
            )}
            {data.contact.social.twitter && (
              <a
                href={data.contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={24} />
              </a>
            )}
            <a
              href={`mailto:${data.contact.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
              aria-label="Email"
            >
              <FiMail size={24} />
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            © {currentYear} {data.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
