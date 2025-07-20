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

