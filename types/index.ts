export interface PersonalData {
  name: string;
  title: string[];
  about: string;
  photo: string;
  contact: {
    email: string;
    location: string;
    phone?: string;
    social: {
      linkedin?: string;
      github?: string;
      twitter?: string;
      personalWebsite?: string;
      other?: Array<{ name: string; url: string }>;
    };
  };
   socialLinks?: SocialLink[];

  skillCategories: { [key: string]: SkillCategory };
  additionalSkills: string[];
  skills: string[];
  projects: Project[];
  companies: Company[];
  education: Education[];
  work: WorkExperience[];
  sections: SectionConfig;
  testimonials: Testimonial[];
  testimonialStats: TestimonialStats;
  colorSchemes: {
    light: ColorScheme;
    dark: ColorScheme;
  };
  blog?: BlogPost[];
  seo: {
    keywords: string[];
    description: string;
  };

}
export interface SectionConfig {
  hero: boolean;
  about: boolean;
  skills: boolean;
  experience: boolean;
  projects: boolean;
  testimonials: boolean;
  contact: boolean;
}
export interface Project {
  name: string;
  description: string;
  technologies: string[];
  roles: string;
  outcomes: string;
  github?: string;
  demo?: string;
  image?: string;
}

export interface Company {
  name: string;
  logo: string;
}

export interface Education {
  degree: string;
  institute: string;
  period: string;
}

export interface WorkExperience {
  position: string;
  company: string;
  period: string;
  description?: string;
}

export interface ColorScheme {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  card: string;
  cardShadow: string;
  cardBorder: string;
  badgeBackground: string;
  badgeText: string;
  tagBackground: string;
  tagText: string;
  highlight: string;
  border: string;

  skillBarBg: string;
  skillBarBgDark: string;
  skillGlow: string;
  skillBadgeExpert: string;
  skillBadgeAdvanced: string;
  skillBadgeIntermediate: string;
  skillBadgeBeginner: string;
  skillBadgeText: string;

  statCardGradient1: string;
  statCardGradient2: string;
  statCardGradient3: string;
  statCardGradient4: string;
  statCardGradient5: string;
  statCardGradient6: string;
}

export interface ThemeContextType {
  theme: "light" | "dark";
  colors: ColorScheme;
  toggleTheme: () => void;
}



export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags: string[];
}
export interface SkillCategory {
  icon: string;
  color: string;
  skills: Array<{
    name: string;
    level: number;
    years: string;
  }>;
}
export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  date: string;
  category: string;
}

export interface TestimonialStats {
  totalReviews: number;
  averageRating: number;
  recommendationRate: number;
}

// Add this interface for one social link
export interface SocialLink {
  label: string;        // e.g., "GitHub"
  icon: string;         // e.g., "FiGithub" (icon component name as string)
  url: string;          // link or mailto
}

