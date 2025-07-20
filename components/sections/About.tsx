import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PersonalData } from '@/types';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

interface AboutProps {
  data: PersonalData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
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
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
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
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.about}
                </p>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  I specialize in <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {data.title.join(', ')}
                  </span> and am passionate about creating robust, scalable solutions 
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiMail className="text-primary-500 text-lg" />
                  <a 
                    href={`mailto:${data.contact.email}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                  >
                    {data.contact.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FiMapPin className="text-primary-500 text-lg" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {data.contact.location}
                  </span>
                </div>
                
                {data.contact.phone && (
                  <div className="flex items-center space-x-3">
                    <FiPhone className="text-primary-500 text-lg" />
                    <a 
                      href={`tel:${data.contact.phone}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
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
                  className="rounded-2xl object-cover shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-500/20 to-secondary-500/20"></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {data.projects.length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Projects Completed
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {data.work.length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {data.skills.length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Technologies
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {data.companies.length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Companies Worked
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
