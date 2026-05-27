"use client";

import React, { useState } from "react";
import { ProjectBackLink } from "@/components/layout/ProjectBackLink";
import { TagList } from "@/components/ui/TagBadge";
import { CalendarIcon } from "@/components/ui/Icons";
import { formatPeriods } from "@/lib/utils";
import type { Project, ProjectDetail } from "@/types";
import { CloudMigrationFlow } from "@/components/diagrams/projects/CloudMigrationFlow";
import { ContainerSupport } from "@/components/diagrams/projects/ContainerSupport";
import { CSPipeline } from "@/components/diagrams/projects/CSPipeline";
import { DevopsDbArch } from "@/components/diagrams/projects/DevopsDbArch";
import { DevopsPipeline } from "@/components/diagrams/projects/DevopsPipeline";
import { EmailHybrid } from "@/components/diagrams/projects/EmailHybrid";
import { EmailLargeScale } from "@/components/diagrams/projects/EmailLargeScale";
import { IntegratedPortal } from "@/components/diagrams/projects/IntegratedPortal";
import { RbacFlow } from "@/components/diagrams/projects/RbacFlow";
import { SsoFilter } from "@/components/diagrams/projects/SsoFilter";
import { TabGroup } from "@/components/ui/TabGroup";

interface ProjectDetailClientProps {
  meta: Project;
  detail: ProjectDetail;
}

export default function ProjectDetailClient({
  meta,
  detail,
}: ProjectDetailClientProps) {
  const [activeTabKey, setActiveTabKey] = useState("0");

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
      <ProjectBackLink />
      <div className="project-card" style={{ marginBottom: "40px" }}>
        <h1>{meta.title}</h1>
        <p className="project-period">
          <CalendarIcon /> {formatPeriods(meta.periods)}
        </p>
        <TagList tags={meta.tags} />
      </div>

      <div className="mdx-content">
        <h2>프로젝트 개요</h2>
        <p>{meta.description}</p>

        {detail.tabs && detail.tabs.length > 0 && (
          <div style={{ marginTop: "40px", marginBottom: "30px" }}>
            <TabGroup
              tabs={tabItems}
              activeTab={activeTabKey}
              onTabChange={(key) => setActiveTabKey(key)}
            />
          </div>
        )}

        {activeTab ? (
          <div style={{ marginTop: "30px" }}>
            {renderTabDiagram(activeTab.flow_diagram)}

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
            {renderTabDiagram(detail.flow_diagram)}

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
