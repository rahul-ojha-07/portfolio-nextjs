import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar } from 'react-icons/fi';
import type { Education } from '@/types'; // Use type-only import
import { useTheme } from '@/hooks/useTheme';

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const { colors } = useTheme();

  return (
    <section
      className="py-20"
      style={{ backgroundColor: colors.card ?? colors.background }} // dynamic bg color from theme
      aria-label="Education section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.foreground }}
            >
              Education
            </h2>
            <p
              className="text-lg"
              style={{ color: colors.foreground, opacity: 0.75 }}
            >
              My academic background and qualifications
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: `0 4px 8px 0 ${colors.cardShadow || 'rgba(0,0,0,0.1)'}`
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: colors.badgeBackground,
                    }}
                  >
                    <FiBookOpen
                      className="text-xl"
                      style={{ color: colors.badgeText }}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: colors.foreground }}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      className="text-lg font-medium"
                      style={{ color: colors.foreground, opacity: 0.85 }}
                    >
                      {edu.institute}
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-2"
                  style={{ color: colors.foreground, opacity: 0.7 }}
                >
                  <FiCalendar
                    className="text-primary-500"
                    style={{ color: colors.primary }}
                    aria-hidden="true"
                  />
                  <span className="font-medium">{edu.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
