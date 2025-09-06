
export interface Project {
  name: string;
  date: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  dateRange?: string;
  certificateUrl?: string;
}

export interface Certification {
  name: string;
  imageUrl: string;
  verifyUrl: string;
}