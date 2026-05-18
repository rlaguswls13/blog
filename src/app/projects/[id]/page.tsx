import { BackLink } from "@/components/layout/BackLink";
import projectsMeta from "@/data/projects.json";
import projectDetails from "@/data/project-detail.json";
import { TagList } from "@/components/ui/TagBadge";
import { formatPeriods } from "@/lib/utils";
import type { Project, ProjectDetail } from "@/types";
import { CloudMigrationFlow } from "@/components/diagrams/CloudMigrationFlow";
import { ContainerSupport } from "@/components/diagrams/ContainerSupport";
import { CSPipeline } from "@/components/diagrams/CSPipeline";
import { DevopsDbArch } from "@/components/diagrams/DevopsDbArch";
import { DevopsPipeline } from "@/components/diagrams/DevopsPipeline";
import { EmailHybrid } from "@/components/diagrams/EmailHybrid";
import { EmailLargeScale } from "@/components/diagrams/EmailLargeScale";
import { IntegratedPortal } from "@/components/diagrams/IntegratedPortal";
import { RbacFlow } from "@/components/diagrams/RbacFlow";
import { SsoFilter } from "@/components/diagrams/SsoFilter";

export async function generateStaticParams() {
  return projectsMeta.projects.map((p) => ({
    id: p.id,
  }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const meta = (projectsMeta.projects as Project[]).find(
    (p) => p.id === params.id
  );
  const detail = (projectDetails as ProjectDetail[]).find(
    (d) => d.id === meta?.id || d.project_id === params.id
  );

  if (!meta || !detail) return <div>Project not found</div>;

  const renderDiagram = (id: string) => {
    switch (id) {
      case "cloud-migration":
        return <CloudMigrationFlow />;
      case "enterprise-support":
        return <CSPipeline />;
      case "integrated-support":
        return <IntegratedPortal />;
      case "enterprise-email":
        return (
          <>
            <EmailLargeScale />
            <div style={{ marginTop: "40px" }}>
              <EmailHybrid />
            </div>
          </>
        );
      case "messaging-sso":
        return (
          <>
            <SsoFilter />
            <div style={{ marginTop: "40px" }}>
              <RbacFlow />
            </div>
          </>
        );
      case "devops-portal":
        return (
          <>
            <DevopsDbArch />
            <div style={{ marginTop: "40px" }}>
              <DevopsPipeline />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <BackLink href="/projects" label="목록으로" />
      <div className="project-card" style={{ marginBottom: "40px" }}>
        <h1>{meta.title}</h1>
        <p className="project-period">
          📅 {formatPeriods(meta.periods)}
        </p>
        <TagList tags={meta.tags} />
      </div>

      <div className="mdx-content">
        <h2>프로젝트 개요</h2>
        <p>{meta.description}</p>

        {renderDiagram(params.id)}

        {detail.tabs && detail.tabs.map((tab, tIdx) => (
          <div key={tIdx} style={{ marginTop: "40px" }}>
            <h2 style={{ color: "var(--accent-primary)", borderBottom: "2px solid var(--accent-primary)" }}>
              {tab.title}
            </h2>
            {tab.sections.map((section, idx) => (
              <div key={idx}>
                <h3>{section.title}</h3>
                {section.body && <p dangerouslySetInnerHTML={{ __html: section.body.replace(/\n/g, "<br/>") }} />}
                {section.list && (
                  <ul>
                    {section.list.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}

        {detail.sections && detail.sections.map((section, idx) => (
          <div key={idx}>
            <hr className="section-divider" />
            <h2>{section.title}</h2>
            {section.body && <p dangerouslySetInnerHTML={{ __html: section.body.replace(/\n/g, "<br/>") }} />}
            {section.list && (
              <ul>
                {section.list.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
