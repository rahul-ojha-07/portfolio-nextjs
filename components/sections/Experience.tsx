import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiCode,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import type { WorkExperience, Company } from "@/types";

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
  highlights?: { metric: string; value: string; description: string }[];
}

export const Experience: React.FC<ExperienceProps> = ({ work, companies }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getCompanyLogo = (companyName: string) => companies.find(c => c.name === companyName)?.logo || null;

  const totalYears = work.reduce((total, job) => {
    const [start, end] = job.period.split("–");
    const startYear = parseInt(start);
    const endYear = end === "Present" ? new Date().getFullYear() : parseInt(end);
    return total + (endYear - startYear);
  }, 0);

  return (
    <section
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-x-hidden"
      aria-label="Professional experience timeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            <FiBriefcase className="text-4xl text-primary-500" aria-hidden="true" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {totalYears}+ years of experience building exceptional software solutions and leading teams
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <StatCard label="Years Experience" value={`${totalYears}+`} />
          <StatCard label="Companies" value={companies.length.toString()} />
          <StatCard label="Positions" value={work.length.toString()} />
          <StatCard label="Projects Delivered" value="50+" />
        </motion.div>

        {/* Timeline for desktop */}
        <div className="relative hidden md:block" aria-label="Experience timeline for desktop">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600 opacity-80 -translate-x-1/2"></div>
          <div className="space-y-24">
            {work.map((job, idx) => {
              const logo = getCompanyLogo(job.company);
              const isLeft = idx % 2 === 0;
              const expanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="relative flex justify-between items-stretch w-full min-h-[160px]"
                >
                  {isLeft ? (
                    <>
                      <div className="w-5/12 flex justify-end">
                        <ExperienceCard
                          job={job as EnhancedWorkExperience}
                          index={idx}
                          isVisible={isInView}
                          logo={logo}
                          expanded={expanded}
                          onExpand={() => setExpandedIndex(idx)}
                          onCollapse={() => setExpandedIndex(null)}
                        />
                      </div>
                      {/* Pin */}
                      <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20">
                        <Pin />
                      </div>
                      <div className="w-5/12"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-5/12"></div>
                      {/* Pin */}
                      <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20">
                        <Pin />
                      </div>
                      <div className="w-5/12 flex justify-start">
                        <ExperienceCard
                          job={job as EnhancedWorkExperience}
                          index={idx}
                          isVisible={isInView}
                          logo={logo}
                          expanded={expanded}
                          onExpand={() => setExpandedIndex(idx)}
                          onCollapse={() => setExpandedIndex(null)}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline for mobile */}
        <div className="relative md:hidden" aria-label="Experience timeline for mobile">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600 opacity-80 -translate-x-1/2"></div>
          <div className="space-y-16">
            {work.map((job, idx) => {
              const logo = getCompanyLogo(job.company);
              const expanded = expandedIndex === idx;
              return (
                <div key={idx} className="relative flex">
                  {/* Pin */}
                  <div className="absolute left-1/2 top-7 -translate-x-1/2 z-20">
                    <Pin />
                  </div>
                  <div className="w-full flex flex-col">
                    <ExperienceCard
                      job={job as EnhancedWorkExperience}
                      index={idx}
                      isVisible={isInView}
                      logo={logo}
                      expanded={expanded}
                      onExpand={() => setExpandedIndex(idx)}
                      onCollapse={() => setExpandedIndex(null)}
                      mobile
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Companies Showcase */}
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
              {companies.map((company, idx) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
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

// Pin/dot component used in timeline
const Pin: React.FC = () => (
  <div className="w-5 h-5 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" aria-hidden="true" />
);

interface ExperienceCardProps {
  job: EnhancedWorkExperience;
  index: number;
  isVisible: boolean;
  logo?: string | null;
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  mobile?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  job,
  index,
  isVisible,
  logo,
  expanded,
  onExpand,
  onCollapse,
  mobile,
}) => {
  const [imageError, setImageError] = useState(false);

  const duration = (() => {
    const [start, end] = job.period.split("–");
    const startYear = parseInt(start);
    const endYear = end === "Present" ? new Date().getFullYear() : parseInt(end);
    return endYear - startYear;
  })();

  const handleCardClick = (e: React.MouseEvent) => {
    if (!expanded) onExpand();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group max-w-xl min-w-[230px] relative cursor-pointer
        ${expanded ? "ring-2 ring-primary-500" : ""}
        z-30 md:z-auto
      `}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      {expanded && (
        <button
          className="absolute right-3 top-3 z-30 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 text-gray-800 dark:text-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onCollapse();
          }}
          aria-label="Close details"
        >
          <FiX />
        </button>
      )}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 pointer-events-none">
        <div className="flex items-start gap-4">
          {logo && (
            <div className="relative w-14 h-14 flex-shrink-0 pointer-events-none">
              {!imageError ? (
                <Image
                  src={logo}
                  alt={job.company}
                  fill
                  className="rounded-xl object-contain bg-white p-2 shadow-sm"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {job.company.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            </div>
          )}
          <div className="flex-grow min-w-0">
            <div className="flex items-center space-x-2 mb-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                {job.position}
              </h3>
              {job.companyWebsite && (
                <a
                  href={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 transition-colors pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-base sm:text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2 truncate">
              {job.company}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {/* Period info (always visible) */}
              <div className="flex items-center space-x-1 min-w-0">
                <FiCalendar className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="truncate">{job.period}</span>
                <span className="ml-1 text-primary-500 font-medium">
                  ({duration} {duration > 1 ? "yrs" : "yr"})
                </span>
              </div>

              {/* Location: hide on mobile */}
              {job.location && (
                <div className="hidden sm:flex items-center space-x-1 min-w-0">
                  <FiMapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
              )}

              {/* Team size info */}
              {job.teamSize && (
                <div className="flex items-center space-x-1 min-w-0">
                  <FiUsers className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span>Team {job.teamSize}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pointer-events-none">
        <p className={`transition-all duration-400 ${expanded ? "" : "line-clamp-2"}`}>
          {job.description}
        </p>
        {expanded && (
          <>
            {/* Highlights */}
            {job.highlights && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                {job.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + idx * 0.06 }}
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

            {/* Technologies used */}
            {job.technologies && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FiCode className="w-4 h-4 mr-2 text-primary-500" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2 pointer-events-auto">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {job.achievements && (
              <div className="my-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FiAward className="w-4 h-4 mr-2 text-primary-500" />
                  Key Achievements
                </h4>
                <ul className="space-y-2 text-sm">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="block w-2 h-2 mt-2 bg-primary-500 rounded-full" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notable Projects */}
            {job.keyProjects && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-2 text-primary-500" />
                  Notable Projects
                </h4>
                <ul className="space-y-2 text-sm">
                  {job.keyProjects.map((project, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="block w-2 h-2 mt-2 bg-secondary-500 rounded-full" />
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {/* Overlay clickable button only when collapsed */}
      {!expanded && (
        <button
          tabIndex={-1}
          aria-label={`Read full details for position ${job.position} at ${job.company}`}
          className="absolute inset-0 z-10 block bg-transparent cursor-pointer"
          onClick={onExpand}
          type="button"
        />
      )}
    </motion.div>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{value}</div>
    <div className="text-gray-600 dark:text-gray-400 text-sm">{label}</div>
  </div>
);
