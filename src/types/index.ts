export interface Skill {
  name: string;
  percent: number;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  periods: string[];
  tags: string[];
  description: string;
  type?: "enterprise" | "personal";
}

interface ProjectSection {
  title: string;
  body?: string;
  list?: string[];
}

interface ProjectTab {
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

export interface DevlogEntry {
  id: string;
  slug?: string;
  sourceId?: string;
  title: string;
  package?: string;
  date: string;
  tags: string[];
  description: string;
}

export type DevlogCategory = "tech_study" | "problem_solving" | "competition_event" | "blog";
