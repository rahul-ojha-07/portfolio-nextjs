import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalData } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  FiDownload,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import { Typewriter } from 'react-simple-typewriter';

interface HeroProps {
  data: PersonalData;
}

// Map icon name strings from data.json to icon components
const iconMap: Record<string, React.ElementType> = {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  // add other icons here if needed
};

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { colors } = useTheme();

  // Dropdown open state
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs to button & menu for outside click detection & positioning
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // State to track dropdown position mode: 'bottom' or 'top'
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  // Close dropdown when click or touch happens outside dropdown or button
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  // Update dropdown positioning before showing, checking available space below button
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const dropdownHeightEstimate = 260; // approx height with 4-5 items, adjust as needed

      // If not enough space below, position dropdown above button
      if (spaceBelow < dropdownHeightEstimate) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  };

  // Whenever menuOpen changes to true, calculate dropdown position
  useEffect(() => {
    if (menuOpen) {
      updateDropdownPosition();
      window.addEventListener('resize', updateDropdownPosition);
    } else {
      window.removeEventListener('resize', updateDropdownPosition);
    }

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [menuOpen]);

  // Dropdown animation variants (same for both positions)
  const dropdownVariants = {
    hidden: { opacity: 0, y: dropdownPosition === 'bottom' ? -10 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: dropdownPosition === 'bottom' ? -10 : 10,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center relative overflow-visible px-4 md:px-0"
      style={{ background: colors.background }}
    >
      {/* Soft accent blurred shapes */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2, type: 'spring' }}
        className="pointer-events-none absolute -top-32 -left-32 w-[440px] h-[440px] rounded-full z-0 blur-3xl"
        style={{
          background: `radial-gradient(circle at 55% 60%, ${colors.primary}BB 0%, transparent 83%)`,
        }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1.07 }}
        transition={{ duration: 1.2, delay: 0.2, type: 'spring' }}
        className="pointer-events-none absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full z-0 blur-3xl"
        style={{
          background: `radial-gradient(circle at 48% 50%, ${colors.secondary || colors.primary
            }AA 0%, transparent 90%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center md:justify-end -mt-12 sm:-mt-16 md:-mt-0"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              <Image
                src={data.photo}
                alt={data.name}
                fill
                className="rounded-full object-cover shadow-2xl"
                priority
              />
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}19 0%, ${colors.secondary || colors.primary
                    }19 100%)`,
                }}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 space-y-8 max-w-xl mx-auto lg:mx-0 relative"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
                style={{ color: colors.foreground }}
              >
                Hi, I&apos;m {data.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl sm:text-2xl font-mono min-h-[2.5rem]"
                style={{ color: colors.primary }}
              >
                <Typewriter
                  words={data.title}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={90}
                  deleteSpeed={50}
                  delaySpeed={1500}
                  cursorColor={colors.primary}
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg sm:text-xl max-w-lg"
              style={{ hyphens: 'auto', color: colors.foreground }}
            >
              {data.about}
            </motion.p>

            {/* Buttons & Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 relative"
            >
              {/* Get In Touch Button */}
              <Button
                size="lg"
                className="flex items-center gap-2 relative"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-controls="contact-menu"
                ref={buttonRef}
              >
                <FiMail />
                Get In Touch
              </Button>

              {/* Download CV Button */}
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
                onClick={() => window.open('/resume.pdf', '_blank')}
                aria-label="Download CV"
              >
                <FiDownload />
                Download CV
              </Button>

              {/* Dropdown with animation and dynamic positioning */}
              <AnimatePresence>
                {menuOpen && data.socialLinks && (
                  <motion.div
                    id="contact-menu"
                    ref={menuRef}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className={`absolute left-0 ${dropdownPosition === 'bottom' ? 'top-full mt-3' : 'bottom-full mb-3'
                      } w-64 rounded-lg bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black ring-opacity-5 z-50`}
                    style={{
                      boxShadow: `0 10px 15px -3px ${colors.cardShadow}, 0 4px 6px -4px ${colors.cardShadow}`,
                      borderColor: colors.cardBorder,
                      color: colors.foreground,
                    }}
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    {/* Arrow removed; menu is clean for both directions */}

                    <div className="py-2 relative z-10">
                      {data.socialLinks.map(({ label, icon, url }) => {
                        const IconComponent = iconMap[icon] || FiMail;
                        return (
                          <a
                            key={label}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-5 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 focus:outline-none transition-colors"
                            style={{ color: colors.foreground }}
                            role="menuitem"
                            onClick={() => setMenuOpen(false)}
                          >
                            <IconComponent className="text-lg" />
                            {label}
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
