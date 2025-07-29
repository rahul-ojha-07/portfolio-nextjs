import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiStar, FiCode, FiDatabase, FiServer, FiTool, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { PersonalData } from '@/types';
import { useTheme } from "@/hooks/useTheme"


import data from "@/data/data.json"

interface SkillsProps {
  skillData: PersonalData['skillCategories'];
  additionalSkills: string[];
}

// Icon mapping for JSON string references
const iconMap = {
  'FiServer': FiServer,
  'FiCode': FiCode,
  'FiDatabase': FiDatabase,
  'FiTool': FiTool,
};

// Get skill styling based on level
const getSkillStyling = (level: number) => {
  if (level >= 90) return {
    gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
    glow: 'shadow-emerald-500/25',
    badge: 'Expert'
  };
  if (level >= 80) return {
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    glow: 'shadow-blue-500/25',
    badge: 'Advanced'
  };
  if (level >= 70) return {
    gradient: 'from-amber-400 via-amber-500 to-amber-600',
    glow: 'shadow-amber-500/25',
    badge: 'Intermediate'
  };
  return {
    gradient: 'from-red-400 via-red-500 to-red-600',
    glow: 'shadow-red-500/25',
    badge: 'Beginner'
  };
};

// Animated counter component
const AnimatedCounter: React.FC<{ target: number; trigger: boolean }> = ({ target, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [target, trigger]);

  return (
    <motion.span
      className="text-lg font-bold text-gray-900 dark:text-white"
      animate={trigger ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      {count}%
    </motion.span>
  );
};

// Individual skill bar component with collapse
const SkillBar: React.FC<{
  skill: { name: string; level: number; years: string };
  index: number;
  isVisible: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}> = ({ skill, index, isVisible, isCollapsed, onToggleCollapse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const styling = getSkillStyling(skill.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Skill Header - Always visible */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleCollapse}
            className="flex items-center space-x-2 text-left hover:text-primary-500 transition-colors"
          >
            {isCollapsed ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {skill.name}
            </span>
          </button>
          <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 ${skill.level >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
              skill.level >= 80 ? 'text-blue-600 dark:text-blue-400' :
                skill.level >= 70 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
            }`}>
            {styling.badge}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <AnimatedCounter target={skill.level} trigger={isVisible && !isCollapsed} />
          <FiTrendingUp className="text-gray-400 group-hover:text-primary-500 transition-colors" />
        </div>
      </div>

      {/* Collapsible Progress Bar */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Progress Bar Container */}
            <div className="relative mb-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${styling.gradient} rounded-full relative overflow-hidden`}
                >
                  {/* Animated shimmer effect */}
                  <motion.div
                    animate={{ x: [-100, 300] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 h-full w-20 bg-white/30 skew-x-12"
                  />
                </motion.div>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className={`absolute inset-0 rounded-full blur-sm ${styling.glow}`}
                style={{
                  background: `linear-gradient(to right, transparent, rgba(99, 102, 241, 0.3), transparent)`,
                  width: `${skill.level}%`
                }}
              />
            </div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="absolute top-full left-0 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg z-10"
              style={{ pointerEvents: 'none' }}
            >
              <div className="flex items-center space-x-2">
                <FiStar className="text-yellow-400" />
                <span>Experience: {skill.years}</span>
              </div>
              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ skillData, additionalSkills }) => {
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [collapsedSkills, setCollapsedSkills] = useState<{ [key: string]: string[] }>({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });[1][2]
  const { theme, colors } = useTheme();

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSkill = (category: string, skillName: string) => {
    setCollapsedSkills(prev => ({
      ...prev,
      [category]: prev[category]?.includes(skillName)
        ? prev[category].filter(s => s !== skillName)
        : [...(prev[category] || []), skillName]
    }));
  };

  const isCategoryCollapsed = (category: string) => collapsedCategories.includes(category);
  const isSkillCollapsed = (category: string, skillName: string) =>
    collapsedSkills[category]?.includes(skillName) || false;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <FiCode className="text-4xl text-primary-500" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Category Header - Clickable to collapse */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-t-2xl transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl ${data.color}`}>
                      <IconComponent />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {data.skills.length} core technologies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {isCatCollapsed ? 'Show' : 'Hide'}
                    </span>
                    {isCatCollapsed ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
                  </div>
                </button>

                {/* Collapsible Category Content */}
                <AnimatePresence>
                  {!isCatCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
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
          className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Additional Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          border shadow
        `}
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
          <div className="text-center p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white">
            <div className="text-3xl font-bold mb-2">
              {Object.values(skillData).reduce((acc, cat) => acc + cat.skills.length, 0)}+
            </div>
            <div className="text-primary-100">Core Technologies</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white">
            <div className="text-3xl font-bold mb-2">5+</div>
            <div className="text-emerald-100">Years Experience</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white">
            <div className="text-3xl font-bold mb-2">
              {Math.round(Object.values(skillData).reduce((acc, cat) =>
                acc + cat.skills.reduce((sum, skill) => sum + skill.level, 0) / cat.skills.length, 0
              ) / Object.keys(skillData).length)}%
            </div>
            <div className="text-purple-100">Average Proficiency</div>
          </div>
        </motion.div>
      </div>
    </section>
  );


};
