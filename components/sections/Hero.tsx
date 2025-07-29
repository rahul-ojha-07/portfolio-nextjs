import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PersonalData } from '@/types';
import { Button } from '@/components/ui/Button';
import { FiDownload, FiMail } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import { Typewriter } from 'react-simple-typewriter';

interface HeroProps {
  data: PersonalData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <section
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 md:px-0"
      style={{ background: colors.background }}
    >
      {/* Soft, blurred accent shapes - background */}
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
          background: `radial-gradient(circle at 48% 50%, ${
            colors.secondary || colors.primary
          }AA 0%, transparent 90%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image: mobile order 1 (on top), desktop order 2 (right) */}
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
                  background: `linear-gradient(135deg, ${colors.primary}19 0%, ${colors.secondary || colors.primary}19 100%)`,
                }}
              />
            </div>
          </motion.div>

          {/* Text: mobile order 2, desktop order 1 (left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 space-y-8 max-w-xl mx-auto lg:mx-0"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
              >
                Hi, I&apos;m {data.name}
              </motion.h1>

              {/* Modern typing animation for titles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl sm:text-2xl font-mono text-primary-500 min-h-[2.5rem]"
              >
                <Typewriter
                  words={data.title}
                  loop={0} // infinite
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
              className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 max-w-lg"
              style={{ hyphens: 'auto' }}
            >
              {data.about}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="flex items-center gap-2"
                onClick={() => window.location.href = `mailto:${data.contact.email}`}
                aria-label="Send Email"
              >
                <FiMail />
                Get In Touch
              </Button>
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
            </motion.div>
          </motion.div>
        </div>
      
      </div>
    </section>
  );
};
