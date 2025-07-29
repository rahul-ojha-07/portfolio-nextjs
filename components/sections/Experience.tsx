import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
import { useTheme } from "@/hooks/useTheme";
import type { WorkExperience, Company, ColorScheme } from "@/types";

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
  const { colors } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getCompanyLogo = (name: string) =>
    companies.find((c) => c.name === name)?.logo || null;

  const totalYears = work.reduce((acc, curr) => {
    const [start, end] = curr.period.split("–");
    const startYear = parseInt(start);
    const endYear = end === "Present" ? new Date().getFullYear() : parseInt(end);
    return acc + (endYear - startYear);
  }, 0);

  return (
    <section
      ref={ref}
      className="py-20"
      style={{ backgroundColor: colors.background }}
      aria-label="Professional Experience Timeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section and Stat Cards */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FiBriefcase
              className="text-5xl"
              style={{ color: colors.primary }}
              aria-hidden="true"
            />
          </motion.div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: colors.foreground }}
          >
            Professional Journey
          </h2>
          <p
            className="mx-auto max-w-3xl text-xl"
            style={{ color: colors.foreground, opacity: 0.75 }}
          >
            {totalYears}+ years of experience building exceptional software
            solutions and leading teams
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { label: "Years Experience", value: `${totalYears}+` },
            { label: "Companies", value: `${companies.length}` },
            { label: "Positions", value: `${work.length}` },
            { label: "Projects Delivered", value: "50+" },
          ].map(({ label, value }) => (
            <StatCard key={label} label={label} value={value} colors={colors} />
          ))}
        </motion.div>

        {/* Desktop Timeline */}
        <div className="relative hidden md:block" aria-label="Experience Timeline Desktop">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px"
            style={{ backgroundColor: colors.border, opacity: 0.8, transform: "translateX(-50%)" }}
          />
          <div className="space-y-24">
            {work.map((job, idx) => {
              const logo = getCompanyLogo(job.company);
              const isLeft = idx % 2 === 0;
              const expanded = expandedIndex === idx;
              return (
                <div key={job.position + idx} className="relative flex w-full min-h-[160px]">
                  <div className="w-1/2 flex justify-end pr-7">
                    {isLeft && (
                      <ExperienceCard
                        job={job as EnhancedWorkExperience}
                        index={idx}
                        isVisible={isInView}
                        logo={logo}
                        expanded={expanded}
                        onExpand={() => setExpandedIndex(idx)}
                        onCollapse={() => setExpandedIndex(null)}
                      />
                    )}
                  </div>
                  <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20">
                    <Pin color={colors.primary} />
                  </div>
                  <div className="w-1/2 flex justify-start pl-7">
                    {!isLeft && (
                      <ExperienceCard
                        job={job as EnhancedWorkExperience}
                        index={idx}
                        isVisible={isInView}
                        logo={logo}
                        expanded={expanded}
                        onExpand={() => setExpandedIndex(idx)}
                        onCollapse={() => setExpandedIndex(null)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="relative md:hidden" aria-label="Experience Timeline Mobile">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px"
            style={{ backgroundColor: colors.border, opacity: 0.8, transform: "translateX(-50%)" }}
          />
          <div className="space-y-16">
            {work.map((job, idx) => {
              const logo = getCompanyLogo(job.company);
              const expanded = expandedIndex === idx;
              return (
                <div key={job.position + idx} className="relative w-full">
                  <div className="hidden sm:block absolute left-1/2 top-7 -translate-x-1/2 z-20">
                    <Pin color={colors.primary} />
                  </div>
                  <div style={{ zIndex: expanded ? 30 : "auto" }}>
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
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4" style={{ color: colors.foreground }}>
                Trusted by Industry Leaders
              </h3>
              <p className="mx-auto max-w-3xl" style={{ color: colors.foreground, opacity: 0.7 }}>
                Proud to have worked with these amazing organizations
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {companies.map((company, idx) => (
                <motion.div
                  key={company.name}
                  className="relative w-24 h-24 md:w-32 md:h-32 grayscale hover:grayscale-0 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1 }}
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

// Pin component
const Pin: React.FC<{ color: string }> = ({ color }) => (
  <div
    className="rounded-full border-4 border-white shadow-md"
    style={{
      backgroundColor: color,
      width: 20,
      height: 20,
      boxShadow: "0 0 6px rgba(0,0,0,0.2)",
    }}
    aria-hidden="true"
  />
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
  mobile = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const { colors } = useTheme();

  const duration = (() => {
    const [start, end] = job.period.split("–");
    const startYear = parseInt(start);
    const endYear = end === "Present" ? new Date().getFullYear() : parseInt(end);
    return endYear - startYear;
  })();

  // Toggle expand/collapse on card click
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (expanded) {
      onCollapse();
    } else {
      onExpand();
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={`Experience at ${job.company} - ${job.position}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (expanded) {
            onCollapse();
          } else {
            onExpand();
          }
        }
      }}
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.15 * index }}
      className={`relative cursor-pointer rounded-2xl shadow-lg transition-shadow duration-500 flex flex-col border ${expanded ? "ring-2 ring-offset-2 ring-primary" : ""
        } ${mobile ? "w-full" : "max-w-xl"} ${expanded ? "z-30" : "z-10"}`}
      style={{
        backgroundColor: expanded ? colors.card : colors.background,
        borderColor: colors.border,
        boxShadow: expanded
          ? `0 0 12px 3px ${colors.cardShadow}`
          : "0 0 5px rgba(0,0,0,0.05)",
      }}
    >
      {expanded && (
        <button
          aria-label="Close expanded details"
          onClick={(e) => {
            e.stopPropagation();
            onCollapse();
          }}
          className="absolute top-3 right-3 z-40 rounded-full p-1 bg-gray-200 dark:bg-gray-700 hover:bg-red-600 hover:text-white transition-colors"
        >
          <FiX />
        </button>
      )}

      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: colors.border }}>
        <div className="flex items-start gap-4">
          {logo && (
            <div className="relative w-14 h-14 flex-shrink-0">
              {!imageError ? (
                <Image
                  src={logo}
                  alt={`${job.company} logo`}
                  fill
                  className="object-contain rounded-lg p-2 bg-white shadow-sm"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex items-center justify-center rounded-lg text-white font-semibold text-lg w-full h-full"
                  style={{ backgroundColor: colors.primary }}
                >
                  {job.company.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"
                aria-hidden="true"
              />
            </div>
          )}
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold" style={{ color: colors.foreground, fontSize: 16 }}>
                {job.position}
              </h3>
              {job.companyWebsite && (
                <a
                  href={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={-1}
                  aria-label={`${job.company} website`}
                  style={{ color: colors.primary }}
                >
                  <FiExternalLink />
                </a>
              )}
            </div>
            <p className="mb-2" style={{ color: colors.primary, fontWeight: 600 }}>
              {job.company}
            </p>
            <div className="flex flex-wrap gap-3" style={{ color: colors.foreground, opacity: 0.7 }}>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <FiCalendar style={{ color: colors.primary }} />
                <span>{job.period}</span>
                <span className="font-semibold ml-1">
                  {duration} yr{duration > 1 ? "s" : ""}
                </span>
              </div>
              {job.location && (
                <div className="hidden sm:flex items-center gap-1 whitespace-nowrap">
                  <FiMapPin style={{ color: colors.primary }} />
                  <span>{job.location}</span>
                </div>
              )}
              {job.teamSize && (
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <FiUsers style={{ color: colors.primary }} />
                  <span>Team {job.teamSize}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6" style={{ color: colors.foreground }}>
        {expanded && (
          <>
            <p>{job.description}</p>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 mt-4"
              >
                {job.highlights && <HighlightSection highlights={job.highlights} />}
                {job.technologies && <TechnologiesSection technologies={job.technologies} />}
                {job.achievements && <AchievementSection achievements={job.achievements} />}
                {job.keyProjects && <ProjectsSection projects={job.keyProjects} />}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  colors: ColorScheme;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, colors }) => (
  <div
    className="rounded-xl px-6 py-8"
    style={{
      backgroundColor: colors.card,
      border: `1px solid ${colors.border}`,
      boxShadow: `0 0 10px ${colors.cardShadow}`,
      color: colors.foreground,
    }}
  >
    <div style={{ color: colors.primary }} className="text-3xl font-bold mb-2">
      {value}
    </div>
    <div style={{ color: colors.foreground, opacity: 0.75 }}>{label}</div>
  </div>
);

const HighlightSection: React.FC<{
  highlights: { metric: string; value: string; description: string }[];
}> = ({ highlights }) => {
  const { colors } = useTheme();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {highlights.map((h, idx) => (
        <div
          key={idx}
          className="rounded-lg p-4"
          style={{
            backgroundColor: colors.highlight,
            border: `1px solid ${colors.border}`,
            color: colors.primary,
          }}
        >
          <div className="text-2xl font-bold">{h.value}</div>
          <div className="text-sm font-medium">{h.metric}</div>
          <div className="text-xs mt-1">{h.description}</div>
        </div>
      ))}
    </div>
  );
};

const TechnologiesSection: React.FC<{ technologies: string[] }> = ({ technologies }) => {
  const { colors } = useTheme();
  return (
    <div>
      <h4 className="flex items-center gap-2" style={{ color: colors.primary }}>
        <FiCode />
        Technologies Used
      </h4>
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies.map((tech, idx) => (
          <span
            key={idx}
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: colors.badgeBackground,
              color: colors.badgeText,
              borderColor: colors.border,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const AchievementSection: React.FC<{ achievements: string[] }> = ({ achievements }) => {
  const { colors } = useTheme();
  return (
    <div>
      <h4 className="flex items-center gap-2 mt-6" style={{ color: colors.primary }}>
        <FiAward />
        Key Achievements
      </h4>
      <ul className="list-disc list-inside mt-2" style={{ color: colors.foreground }}>
        {achievements.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
};

const ProjectsSection: React.FC<{ projects: string[] }> = ({ projects }) => {
  const { colors } = useTheme();
  return (
    <div>
      <h4 className="flex items-center gap-2 mt-6" style={{ color: colors.primary }}>
        <FiTrendingUp />
        Notable Projects
      </h4>
      <ul className="list-disc list-inside mt-2" style={{ color: colors.foreground }}>
        {projects.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};
