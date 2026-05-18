import projectsData from "@/data/projects.json";
import { TagList } from "@/components/ui/TagBadge";
import { formatPeriods, calculateTotalPeriod, sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import type { Project } from "@/types";

export default function ProjectsPage() {
  const sorted = sortByDateDesc(projectsData.projects as Project[]);

  return (
    <>
      <h1>프로젝트</h1>
      <div style={{ display: "grid", gap: 20 }}>
        {sorted.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="project-card">
              <h3>{p.title}</h3>
              <p className="project-period">
                📅 {formatPeriods(p.periods)} {calculateTotalPeriod(p.periods)}
              </p>
              <TagList tags={p.tags} />
              <p style={{ color: "var(--text-secondary)", marginTop: 12 }}>{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
