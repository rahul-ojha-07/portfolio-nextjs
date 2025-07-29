import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PersonalData } from '@/types';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

interface AboutProps {
  data: PersonalData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <section
      className="py-20"
      style={{ backgroundColor: colors.background }} // Use background from theme
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold"
                style={{ color: colors.foreground }} // Text color from theme
              >
                About Me
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <p
                  style={{
                    color: colors.foreground,
                    // fallback for subtle text color in light/dark
                    opacity: 0.7,
                  }}
                  className="text-lg leading-relaxed"
                >
                  {data.about}
                </p>

                <p
                  style={{
                    color: colors.foreground,
                    opacity: 0.7,
                  }}
                  className="text-lg leading-relaxed"
                >
                  I specialize in{' '}
                  <span
                    className="font-semibold"
                    style={{ color: colors.primary }}
                  >
                    {data.title.join(', ')}
                  </span>{' '}
                  and am passionate about creating robust, scalable solutions
                  that make a real impact.
                </p>
              </motion.div>
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: colors.foreground }}
              >
                Get In Touch
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiMail
                    style={{ color: colors.primary }}
                    className="text-lg"
                  />
                  <a
                    href={`mailto:${data.contact.email}`}
                    style={{ color: colors.foreground }}
                    className="hover:text-opacity-80 transition-colors"
                  >
                    {data.contact.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FiMapPin
                    style={{ color: colors.primary }}
                    className="text-lg"
                  />
                  <span style={{ color: colors.foreground }}>
                    {data.contact.location}
                  </span>
                </div>

                {data.contact.phone && (
                  <div className="flex items-center space-x-3">
                    <FiPhone
                      style={{ color: colors.primary }}
                      className="text-lg"
                    />
                    <a
                      href={`tel:${data.contact.phone}`}
                      style={{ color: colors.foreground }}
                      className="hover:text-opacity-80 transition-colors"
                    >
                      {data.contact.phone}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div className="relative mx-auto lg:mx-0">
              <div className="w-80 h-80 relative mx-auto">
                <Image
                  src={data.photo}
                  alt={data.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Use a transparent gradient overlay matching theme's primary and secondary */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background:
                      `linear-gradient(135deg, ${colors.primary}33 0%, ${colors.secondary}33 100%)`,
                  }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div
              className="grid grid-cols-2 gap-6"
              style={{
                color: colors.foreground,
              }}
            >
              {/* Helper function omitted - inline style used here */}
              {[{
                value: `${data.projects.length}+`,
                label: 'Projects Completed',
              }, {
                value: `${data.work.length}+`,
                label: 'Years Experience',
              }, {
                value: `${data.skills.length}+`,
                label: 'Technologies',
              }, {
                value: `${data.companies.length}+`,
                label: 'Companies Worked',
              }].map(({ value, label }, index) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center rounded-xl px-6 py-8"
                  style={{
                    backgroundColor: colors.card ?? (colors.background === '#000000' ? '#111827' : '#F9FAFB'),
                    boxShadow:
                      colors.cardShadow ??
                      '0 4px 6px rgba(0,0,0,0.1)',
                    border:
                      `1px solid ${colors.border ?? colors.primary}50`
                  }}
                >
                  <div
                    style={{ color: colors.primary }}
                    className="text-3xl font-bold mb-2"
                  >
                    {value}
                  </div>
                  <div
                    style={{ color: colors.foreground, opacity: 0.7 }}
                    className="text-sm"
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
