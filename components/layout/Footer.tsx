import React from 'react';
import { PersonalData } from '@/types';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

interface FooterProps {
  data: PersonalData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const currentYear = new Date().getFullYear();
  const { colors } = useTheme();

  return (
    <footer
      className="py-12"
      style={{ backgroundColor: colors.background }}
      aria-label="Footer section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            {data.contact.social.github && (
              <a
                href={data.contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                aria-label="GitHub"
                style={{ color: colors.foreground }}
                onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={e => (e.currentTarget.style.color = colors.foreground)}
              >
                <FiGithub size={24} aria-hidden="true" />
              </a>
            )}
            {data.contact.social.linkedin && (
              <a
                href={data.contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                aria-label="LinkedIn"
                style={{ color: colors.foreground }}
                onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={e => (e.currentTarget.style.color = colors.foreground)}
              >
                <FiLinkedin size={24} aria-hidden="true" />
              </a>
            )}
            {data.contact.social.twitter && (
              <a
                href={data.contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                aria-label="Twitter"
                style={{ color: colors.foreground }}
                onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={e => (e.currentTarget.style.color = colors.foreground)}
              >
                <FiTwitter size={24} aria-hidden="true" />
              </a>
            )}
            <a
              href={`mailto:${data.contact.email}`}
              aria-label="Email"
              className="transition-colors"
              style={{ color: colors.foreground }}
              onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={e => (e.currentTarget.style.color = colors.foreground)}
            >
              <FiMail size={24} aria-hidden="true" />
            </a>
          </div>
          <p
            className="text-center"
            style={{ color: colors.foreground, opacity: 0.7 }}
          >
            © {currentYear} {data.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
