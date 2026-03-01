export interface ResumeData {
  name: string;
  title: string;
  tagline?: string;
  avatar?: string;
  location: string;
  email: string;
  phone?: string;
  wechat?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects?: Project[];
  languages?: Language[];
  certifications?: Certification[];
  awards?: Award[];
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  employmentType?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
  courses?: string[];
  patents?: Patent[];
  papers?: Paper[];
}

export interface Patent {
  authors: string;
  title: string;
  number?: string;
  status: string; // e.g. "授权" | "公开" | "参与，授权"
}

export interface Paper {
  authors: string;
  title: string;
  journal: string;
  doi?: string;
  note?: string; // e.g. "JCR Q1, IF = 9.40"
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Award {
  name: string;
  level?: string;
  date?: string;
}
