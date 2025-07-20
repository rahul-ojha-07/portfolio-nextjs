import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiBriefcase, FiCalendar, FiMapPin, FiTrendingUp, FiAward, FiUsers, FiCode, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';
import { WorkExperience, Company } from '@/types';

interface ExperienceProps {
  work: WorkExperience[];
  companies: Company[];
}

interface EnhancedWorkExperience extends WorkExperience {
  achievements?: string[];
  keyProjects?: string[];
  technologies?: string[];
  teamSize?: number;
  location?: string;
  companyWebsite?: string;
  highlights?: {
    metric: string;
    value: string;
    description: string;
  }[];
}

// Improved timeline connector component
const TimelineConnector: React.FC<{ isLast: boolean }> = ({ isLast }) => (
  <div 
    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-16 w-0.5 bg-gray-300 dark:bg-gray-600" 
    style={{ height: isLast ? '0px' : '100px' }} 
  />
);

// Experience card component
const ExperienceCard: React.FC<{ 
  job: EnhancedWorkExperience; 
  index: number; 
  isVisible: boolean;
  logo?: string;
}> = ({ job, index, isVisible, logo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isEven = index % 2 === 0;

  const calculateDuration = (period: string) => {
    const [start, end] = period.split('–');
    const startYear = parseInt(start);
    const endYear = end === 'Present' ? new Date().getFullYear() : parseInt(end);
    return endYear - startYear;
  };

  const duration = calculateDuration(job.period);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Improved timeline dot */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="relative">
          <div className="w-5 h-5 bg-primary-500 rounded-full border-3 border-white dark:border-gray-800 shadow-lg" />
          {/* Remove pulsing animation for cleaner look */}
        </div>
      </motion.div>

      {/* Content */}
      <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group"
        >
          {/* Card Header - Simplified without gradient */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                {logo && (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    {!imageError ? (
                      <Image
                        src={logo}
                        alt={job.company}
                        fill
                        className="rounded-xl object-contain bg-white p-2 shadow-sm"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {job.company.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                  </div>
                )}
                
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {job.position}
                    </h3>
                    {job.companyWebsite && (
                      <a 
                        href={job.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                    {job.company}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <FiCalendar className="w-4 h-4 text-primary-500" />
                      <span>{job.period}</span>
                      <span className="text-primary-500 font-medium">({duration}+ year{duration > 1 ? 's' : ''})</span>
                    </div>
                    
                    {job.location && (
                      <div className="flex items-center space-x-1">
                        <FiMapPin className="w-4 h-4 text-primary-500" />
                        <span>{job.location}</span>
                      </div>
                    )}
                    
                    {job.teamSize && (
                      <div className="flex items-center space-x-1">
                        <FiUsers className="w-4 h-4 text-primary-500" />
                        <span>Team of {job.teamSize}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <span>{isExpanded ? 'Less' : 'More'}</span>
                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {/* Description */}
            {job.description && (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {job.description}
              </p>
            )}

            {/* Key Highlights - Simplified */}
            {job.highlights && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {job.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                    className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600"
                  >
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                      {highlight.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {highlight.metric}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {highlight.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Technologies Used */}
            {job.technologies && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FiCode className="w-4 h-4 mr-2 text-primary-500" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.slice(0, isExpanded ? job.technologies.length : 5).map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + techIndex * 0.05 }}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-xs rounded-full font-medium hover:scale-105 transition-transform"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {!isExpanded && job.technologies.length > 5 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{job.technologies.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Expandable Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  {/* Achievements */}
                  {job.achievements && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <FiAward className="w-4 h-4 mr-2 text-primary-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: achIndex * 0.1 }}
                            className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Projects */}
                  {job.keyProjects && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <FiTrendingUp className="w-4 h-4 mr-2 text-primary-500" />
                        Notable Projects
                      </h4>
                      <ul className="space-y-2">
                        {job.keyProjects.map((project, projIndex) => (
                          <motion.li
                            key={projIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: projIndex * 0.1 }}
                            className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{project}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-2/12" />
    </motion.div>
  );
};

export const Experience: React.FC<ExperienceProps> = ({ work, companies }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getCompanyLogo = (companyName: string) => {
    const company = companies.find(c => c.name === companyName);
    return company?.logo || null;
  };

  const totalYears = work.reduce((total, job) => {
    const [start, end] = job.period.split('–');
    const startYear = parseInt(start);
    const endYear = end === 'Present' ? new Date().getFullYear() : parseInt(end);
    return total + (endYear - startYear);
  }, 0);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <FiBriefcase className="text-4xl text-primary-500" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {totalYears}+ years of experience building exceptional software solutions and leading development teams
          </p>
        </motion.div>

        {/* Experience Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {totalYears}+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Years Experience</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {companies.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Companies</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {work.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Positions</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              50+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Projects Delivered</div>
          </div>
        </motion.div>

        {/* Timeline - Simplified */}
        <div className="relative">
          {/* Improved center timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600 opacity-80"></div>

          <div className="space-y-16">
            {work.map((job, index) => {
              const logo = getCompanyLogo(job.company);
              return (
                <div key={index} className="relative">
                  <ExperienceCard 
                    job={job as EnhancedWorkExperience}
                    index={index}
                    isVisible={isInView}
                    logo={logo || undefined}
                  />
                  <TimelineConnector isLast={index === work.length - 1} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Company Showcase - Simplified */}
        {companies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Industry Leaders
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Proud to have worked with these amazing organizations
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {companies.map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative w-24 h-24 md:w-32 md:h-32 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
