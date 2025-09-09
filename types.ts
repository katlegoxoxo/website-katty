export interface ProjectDetail {
  title: string;
  content: string;
  icon: string;
}

export interface Project {
  name: string;
  date: string;
  description: string;
  detailedDescription: ProjectDetail[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  demoComponent?: 'sentimentAnalysis' | 'imageGeneration' | 'resumeBuilder';
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
  name:string;
  issuer: string;
  date: string;
  imageUrl: string;
  verifyUrl: string;
  isBadge?: boolean;
}