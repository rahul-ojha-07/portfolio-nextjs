import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";
import type { Project } from "@/types";

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { colors } = useTheme();

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Some of my recent work and open source contributions
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: idx * 0.07 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary-500/40 transition-all duration-300 group border border-gray-100 dark:border-gray-800 flex flex-col"
            >
              <div className="p-7 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-balance">
                  {project.name}
                </h3>
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                  {project.description}
                </p>

                {/* Role/Outcome */}
                {(project.roles || project.outcomes) && (
                  <div className="mb-3">
                    {project.roles && (
                      <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Role:</span> {project.roles}
                      </p>
                    )}
                    {project.outcomes && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        <span className="font-semibold">Outcome:</span> {project.outcomes}
                      </p>
                    )}
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium border shadow"
                      style={{
                        backgroundColor: `${colors.primary}22`, // subtle accent BG
                        color: colors.primary,
                        borderColor: colors.primary,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
                    >
                      <FiGithub className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
