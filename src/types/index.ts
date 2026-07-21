// ===== Profile Types =====
export interface SocialLink {
  icon: string;
  link: string;
}

export interface Education {
  degree: string;
  year: string;
  school: string;
}

export interface Skill {
  name: string;
  percent: number;
  icon: string;
}

export interface ProfileData {
  profile: {
    name: string;
    role: string;
    organization: string;
    image: string;
    bio_title: string;
    bio_text: string;
    social: SocialLink[];
    interests: string[];
    education: Education[];
  };
  skills: {
    technical: Skill[];
    hobbies: Skill[];
  };
}

// ===== Project Types =====
export interface Project {
  id: string;
  title: string;
  periods: string[];
  tags: string[];
  description: string;
  type?: "enterprise" | "personal";
}

export interface ProjectSection {
  title: string;
  body?: string;
  list?: string[];
}

export interface ProjectTab {
  title: string;
  sections: ProjectSection[];
  reference?: string;
  flow_diagram?: string;
}

export interface ProjectDetail {
  id: string;
  project_id?: string;
  overview?: string;
  tech_stack?: string[];
  sections?: ProjectSection[];
  tabs?: ProjectTab[];
  diagram?: string;
  reference?: string;
  flow_diagram?: string;
}

// ===== Devlog Types =====
export interface DevlogEntry {
  id: string;
  title: string;
  package?: string;
  date: string;
  tags: string[];
  description: string;
}

export interface DevlogData {
  tech_study: DevlogEntry[];
  problem_solving: DevlogEntry[];
  competition_event: DevlogEntry[];
}

export type DevlogCategory = "tech_study" | "problem_solving" | "competition_event" | "blog";

// ===== Devlog Detail (MDX Frontmatter) =====
export interface DevlogFrontmatter {
  id: string;
  title: string;
  package?: string;
  date: string;
  tags: string[];
  description: string;
  category: DevlogCategory;
}

// ===== Resume Types =====
export interface ResumeItem {
  title: string;
  date: string;
  description: string;
}

export interface ResumeData {
  resume: {
    work: ResumeItem[];
    education: ResumeItem[];
    certification: ResumeItem[];
  };
}

// ===== Contact Types =====
export interface ContactLink {
  icon: string;
  label: string;
  url: string;
}

export interface ContactData {
  contact: {
    intro: string;
    email: string;
    links: ContactLink[];
  };
}

// ===== Notion Types =====
export interface NotionIndexItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags?: string[];
  date?: string;
  lastEditedTime?: string;
  coverImage?: string | null;
  icon?: string | null;
}
