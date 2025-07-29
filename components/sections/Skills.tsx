import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiTrendingUp, FiStar, FiCode, FiDatabase, FiServer, FiTool, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import { PersonalData } from '@/types';
import type { ColorScheme } from '@/types'

interface SkillsProps {
  skillData: PersonalData['skillCategories'];
  additionalSkills: string[];
}

const iconMap = {
  FiServer,
  FiCode,
  FiDatabase,
  FiTool,
};

const getSkillStyling = (level: number, colors: ColorScheme) => {
  if (level >= 90) return {
    badge: 'Expert', badgeBg: colors.skillBadgeExpert, badgeText: colors.skillBadgeText
  };
  if (level >= 80) return {
    badge: 'Advanced', badgeBg: colors.skillBadgeAdvanced, badgeText: colors.skillBadgeText
  };
  if (level >= 70) return {
    badge: 'Intermediate', badgeBg: colors.skillBadgeIntermediate, badgeText: colors.skillBadgeText
  };
  return { badge: 'Beginner', badgeBg: colors.skillBadgeBeginner, badgeText: colors.skillBadgeText };
};

const AnimatedCounter: React.FC<{ target: number; trigger: boolean; color: string }> = ({ target, trigger, color }) => {
  const [count, setCount] = useState(0);
  React.useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target; clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, trigger]);
  return <motion.span className="text-lg font-bold" style={{ color }} animate={trigger ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.3, delay: 0.5 }}>{count}%</motion.span>;
};
interface SkillBarProps {
  skill: { name: string; level: number; years: string };
  index: number;
  isVisible: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  colors: ColorScheme;  // Use the actual ColorScheme type here
}
const SkillBar: React.FC<SkillBarProps> = ({ skill, index, isVisible, isCollapsed, onToggleCollapse, colors }) => {
  const [isHovered, setIsHovered] = useState(false);
  const styling = getSkillStyling(skill.level, colors);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative group">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleCollapse}
            className="flex items-center space-x-2 text-left"
            style={{ color: colors.foreground }}
            aria-label={`Toggle ${skill.name} details`}
          >
            {isCollapsed ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
            <span className="text-base font-semibold">{skill.name}</span>
          </button>
          <span
            className="px-2 py-1 text-xs font-medium rounded-full"
            style={{ backgroundColor: styling.badgeBg, color: styling.badgeText }}
          >{styling.badge}</span>
        </div>
        <div className="flex items-center space-x-2" style={{ color: colors.foreground }}>
          <AnimatedCounter target={skill.level} trigger={isVisible && !isCollapsed} color={colors.foreground} />
          <FiTrendingUp className="text-gray-400 group-hover:text-primary-500 transition-colors" />
        </div>
      </div>
      {/* Progress bar */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden" onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
            <div className="relative mb-6">
              <div className="w-full rounded-full h-4 overflow-hidden" style={{ backgroundColor: colors.skillBarBg }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`
                  }}
                />
              </div>
              {/* Glow */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className="absolute inset-0 rounded-full blur-sm" style={{ background: `linear-gradient(to right, transparent, ${colors.skillGlow}90, transparent)`, width: `${skill.level}%` }} />
            </div>
            {/* Tooltip */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }} className="absolute top-full left-0 mt-2 px-3 py-2" style={{ backgroundColor: colors.card, color: colors.foreground, border: `1px solid ${colors.cardBorder}`, borderRadius: 8, pointerEvents: 'none', zIndex: 10 }}>
              <div className="flex items-center space-x-2">
                <FiStar className="text-yellow-400" />
                <span>Experience: {skill.years}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ skillData, additionalSkills }) => {
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>(Object.keys(skillData));
  const [collapsedSkills, setCollapsedSkills] = useState<{ [key: string]: string[] }>({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { colors } = useTheme();

  const toggleCategory = (category: string) => setCollapsedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);
  const toggleSkill = (category: string, skillName: string) => setCollapsedSkills((prev) => ({
    ...prev,
    [category]: prev[category]?.includes(skillName)
      ? prev[category].filter((s) => s !== skillName)
      : [...(prev[category] || []), skillName],
  }));
  const isCategoryCollapsed = (category: string) => collapsedCategories.includes(category);
  const isSkillCollapsed = (category: string, skillName: string) =>
    collapsedSkills[category]?.includes(skillName) || false;

  return (
    <section
      className="py-20"
      style={{ backgroundColor: colors.background, color: colors.foreground }}
      ref={ref}
      aria-label="Technical expertise skills section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="inline-block mb-4" style={{ color: colors.primary }}>
            <FiCode className="text-4xl" />
          </motion.div>
          <h2 style={{ color: colors.foreground }} className="text-4xl md:text-5xl font-bold mb-4">
            Technical Expertise
          </h2>
          <p style={{ color: colors.foreground, opacity: 0.75 }} className="text-xl max-w-3xl mx-auto">
            Proficiency levels in core technologies and frameworks I use to build exceptional software solutions
          </p>
        </motion.div>
        {/* Skills Categories */}
        <div className="space-y-12">
          {Object.entries(skillData).map(([category, data], categoryIndex) => {
            const IconComponent = iconMap[data.icon as keyof typeof iconMap] || FiCode;
            const isCatCollapsed = isCategoryCollapsed(category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="rounded-2xl shadow-xl transition-shadow duration-500"
                style={{ backgroundColor: colors.card, boxShadow: `0 8px 20px ${colors.cardShadow}` }}
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-8 rounded-t-2xl transition-colors focus:outline-none"
                  style={{ color: colors.foreground }}
                  aria-expanded={!isCatCollapsed}
                  aria-controls={`${category}-skills-list`}
                  type="button"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: colors.badgeBackground, color: colors.badgeText }}>
                      <IconComponent aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{category}</h3>
                      <p style={{ color: colors.foreground, opacity: 0.75 }}>
                        {data.skills.length} core technologies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2" style={{ color: colors.foreground }}>
                    <span className="text-sm">{isCatCollapsed ? 'Show' : 'Hide'}</span>
                    {isCatCollapsed ? <FiChevronDown size={20} aria-hidden="true" /> : <FiChevronUp size={20} aria-hidden="true" />}
                  </div>
                </button>
                {/* Collapsible Category Content */}
                <AnimatePresence initial={false}>
                  {!isCatCollapsed && (
                    <motion.div
                      key="content"
                      id={`${category}-skills-list`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pt-8 pb-8">
                        {/* Skills Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                          {data.skills.map((skill, skillIndex) => (
                            <SkillBar
                              key={skill.name}
                              skill={skill}
                              index={skillIndex}
                              isVisible={isInView}
                              isCollapsed={isSkillCollapsed(category, skill.name)}
                              onToggleCollapse={() => toggleSkill(category, skill.name)}
                              colors={colors}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 rounded-2xl shadow-xl p-8"
          style={{ backgroundColor: colors.card, boxShadow: `0 8px 20px ${colors.cardShadow}` }}
        >
          <h3 style={{ color: colors.foreground }} className="text-2xl font-bold mb-8 text-center">
            Additional Technologies &amp; Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 border shadow"
                style={{
                  backgroundColor: `${colors.primary}22`,
                  color: colors.primary,
                  borderColor: colors.primary,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div
            className="text-center p-6 rounded-xl text-white"
            style={{
              background: `linear-gradient(135deg, ${colors.statCardGradient1}, ${colors.statCardGradient2})`,
              boxShadow: `0 0 10px ${colors.cardShadow}`,
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: colors.skillBadgeText }}>
              {Object.values(skillData).reduce((acc, cat) => acc + cat.skills.length, 0)}+
            </div>
            <div>Core Technologies</div>
          </div>
          <div
            className="text-center p-6 rounded-xl text-white"
            style={{
              background: `linear-gradient(135deg, ${colors.statCardGradient3}, ${colors.statCardGradient4})`,
              boxShadow: `0 0 10px ${colors.cardShadow}`,
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: colors.skillBadgeText }}>
              5+
            </div>
            <div>Years Experience</div>
          </div>
          <div
            className="text-center p-6 rounded-xl text-white"
            style={{
              background: `linear-gradient(135deg, ${colors.statCardGradient5}, ${colors.statCardGradient6})`,
              boxShadow: `0 0 10px ${colors.cardShadow}`,
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: colors.skillBadgeText }}>
              {Math.round(Object.values(skillData).reduce(
                (acc, cat) => acc + cat.skills.reduce((sum, skill) => sum + skill.level, 0) / cat.skills.length, 0
              ) / Object.keys(skillData).length)}%
            </div>
            <div>Average Proficiency</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
