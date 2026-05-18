"use client";

import React, { useState } from "react";
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
import { TabGroup } from "@/components/ui/TabGroup";

export async function generateStaticParams() {
  return projectsMeta.projects.map((p) => ({
    id: p.id,
  }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const meta = (projectsMeta.projects as Project[]).find(
    (p) => p.id === id
  );
  const detail = (projectDetails as ProjectDetail[]).find(
    (d) => d.id === meta?.id || d.project_id === id
  );

  const [activeTabKey, setActiveTabKey] = useState("0");

  if (!meta || !detail) return <div>Project not found</div>;

  const renderTabDiagram = (flowDiagram: string | undefined) => {
    if (!flowDiagram) return null;
    const filename = flowDiagram.split("/").pop();
    switch (filename) {
      case "email-large-scale.html":
        return <EmailLargeScale />;
      case "email-hybrid.html":
        return <EmailHybrid />;
      case "sso-filter.html":
        return <SsoFilter />;
      case "rbac-flow.html":
        return <RbacFlow />;
      case "container-support.html":
        return <ContainerSupport />;
      case "cs-pipeline.html":
        return <CSPipeline />;
      case "integrated-portal.html":
        return <IntegratedPortal />;
      case "cloud-migration-flow.html":
        return <CloudMigrationFlow />;
      case "devops-db-arch.html":
        return <DevopsDbArch />;
      case "devops-pipeline.html":
        return <DevopsPipeline />;
      default:
        return null;
    }
  };

  // Convert tabs to the TabGroup expected format
  const tabItems = detail.tabs
    ? detail.tabs.map((tab, idx) => ({
        key: idx.toString(),
        label: tab.title,
      }))
    : [];

  const activeIdx = parseInt(activeTabKey);
  const activeTab = detail.tabs ? detail.tabs[activeIdx] : null;

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

        {/* If the project has tabs, render TabGroup to switch content */}
        {detail.tabs && detail.tabs.length > 0 && (
          <div style={{ marginTop: "40px", marginBottom: "30px" }}>
            <TabGroup
              tabs={tabItems}
              activeTab={activeTabKey}
              onTabChange={(key) => setActiveTabKey(key)}
            />
          </div>
        )}

        {/* Render the matching diagram and sections based on tabs or project level */}
        {activeTab ? (
          <div style={{ marginTop: "30px" }}>
            {/* Tab level diagram */}
            {renderTabDiagram(activeTab.flow_diagram)}

            {/* Tab level sections */}
            {activeTab.sections.map((section, idx) => (
              <div key={idx} style={{ marginTop: "30px" }}>
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
        ) : (
          <div style={{ marginTop: "30px" }}>
            {/* Project level diagram */}
            {renderTabDiagram(detail.flow_diagram)}

            {/* Project level sections */}
            {detail.sections && detail.sections.map((section, idx) => (
              <div key={idx} style={{ marginTop: "30px" }}>
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
        )}
      </div>
    </>
  );
}
