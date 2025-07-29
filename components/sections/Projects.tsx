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
      style={{ backgroundColor: colors.background }}
      aria-label="Featured Projects"
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1
            style={{ color: colors.foreground }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Featured Projects
          </h1>
          <p
            style={{ color: colors.foreground, opacity: 0.75 }}
            className="text-xl max-w-3xl mx-auto"
          >
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
              style={{
                backgroundColor: colors.card ? colors.card : colors.background,
                borderColor: colors.cardBorder,
                boxShadow: `0 4px 6px ${colors.cardShadow ?? "rgba(0, 0, 0, 0.1)"
                  }`,
              }}
              className="rounded-2xl overflow-hidden border flex flex-col transition-shadow duration-300"
              aria-label={`Project: ${project.name}`}
            >
              <div className="p-7 flex flex-col flex-grow">
                {/* Title */}
                <h2
                  style={{ color: colors.foreground }}
                  className="text-xl font-bold mb-2 break-words"
                >
                  {project.name}
                </h2>
                {/* Description */}
                <p
                  style={{ color: colors.foreground, opacity: 0.75 }}
                  className="mb-4 flex-grow"
                >
                  {project.description}
                </p>

                {/* Role/Outcome */}
                {(project.roles || project.outcomes) && (
                  <div className="mb-3">
                    {project.roles && (
                      <p
                        style={{ color: colors.foreground, opacity: 0.6 }}
                        className="text-xs mb-1"
                      >
                        <span style={{ fontWeight: "600" }}>Role: </span>
                        {project.roles}
                      </p>
                    )}
                    {project.outcomes && (
                      <p
                        style={{ color: colors.accent ?? colors.primary }}
                        className="text-xs"
                      >
                        <span style={{ fontWeight: "600" }}>Outcome: </span>
                        {project.outcomes}
                      </p>
                    )}
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        backgroundColor: colors.primary + "22", // ~13% alpha
                        color: colors.primary,
                        borderColor: colors.primary,
                      }}
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-auto flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: colors.primary,
                        borderColor: colors.primary,
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border transition-colors hover:bg-primary-600 hover:text-white"
                      aria-label={`View code for ${project.name} on GitHub`}
                    >
                      <FiGithub aria-hidden="true" />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: colors.primary }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white transition-colors hover:bg-primary-700"
                      aria-label={`View live demo of ${project.name}`}
                    >
                      <FiExternalLink aria-hidden="true" />
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
