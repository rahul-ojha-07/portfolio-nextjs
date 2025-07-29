import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/hooks/useTheme";
import type { PersonalData } from "@/types";

interface NavigationProps {
  name: string;
  sections: PersonalData["sections"];
}

export const Navigation: React.FC<NavigationProps> = ({ name, sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  const allNavItems = [
    { id: "home", label: "Home", enabled: sections.hero },
    { id: "about", label: "About", enabled: sections.about },
    { id: "skills", label: "Skills", enabled: sections.skills },
    { id: "experience", label: "Experience", enabled: sections.experience },
    { id: "education", label: "Education", enabled: true },
    { id: "projects", label: "Projects", enabled: sections.projects },
    { id: "testimonials", label: "Testimonials", enabled: sections.testimonials },
    { id: "contact", label: "Contact", enabled: sections.contact },
  ].filter(item => item.enabled);

  const sectionIds = allNavItems.map(item => item.id);
  const activeSection = useScrollSpy(sectionIds);

  // Scroll handler that scrolls to element, closes menu on mobile
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -64; // navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 150);
  };


  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: colors.background + "CC", // semi-transparent
        borderColor: colors.border,
        color: colors.foreground,
      }}
      aria-label="Primary Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand / Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="font-bold text-xl"
            style={{ color: colors.foreground }}
            aria-label="Go to home section"
          >
            {name}
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {allNavItems.map(item => (
              <a
                href={`#${item.id}`}
                key={item.id}
                onClick={(e) => scrollToSection(e, item.id)}
                className="relative transition-all duration-300 focus:outline-none"
                style={{
                  color: activeSection === item.id ? colors.primary : colors.foreground + "CC",
                  fontWeight: activeSection === item.id ? "600" : "400",
                  cursor: "pointer",
                }}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: colors.primary }}
                  />
                )}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile navigation toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="focus:outline-none"
            >
              {isOpen ? (
                <FiX size={24} style={{ color: colors.foreground }} aria-hidden="true" />
              ) : (
                <FiMenu size={24} style={{ color: colors.foreground }} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              id="mobile-menu"
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ backgroundColor: colors.background, borderTop: `1px solid ${colors.border}` }}
            >
              <div className="py-4 space-y-4">
                {allNavItems.map(item => (
                  <a
                    href={`#${item.id}`}
                    key={item.id}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="block w-full text-left px-4 py-2 transition-all duration-300 focus:outline-none"
                    style={{
                      color: activeSection === item.id ? colors.primary : colors.foreground + "CC",
                      fontWeight: activeSection === item.id ? "600" : "400",
                      backgroundColor: activeSection === item.id ? colors.primary + "22" : "transparent",
                      cursor: "pointer",
                    }}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    tabIndex={0}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
