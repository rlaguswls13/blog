import projectDetails from "@/data/pages/detail/project-detail.json";
import projectsMeta from "@/data/pages/main/projects.json";
import type { Project, ProjectDetail } from "@/types";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  return projectsMeta.projects.map((p) => ({
    id: p.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meta = (projectsMeta.projects as Project[]).find(
    (p) => p.id === id
  );
  const detail = (projectDetails as ProjectDetail[]).find(
    (d) => d.id === meta?.id || d.project_id === id
  );

  if (!meta || !detail) return <div>Project not found</div>;

  return <ProjectDetailClient meta={meta} detail={detail} />;
}
