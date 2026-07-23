"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ProjectBackLink } from "@/components/layout/ProjectBackLink";
import { TagList } from "@/components/ui/TagBadge";
import { CalendarIcon } from "@/components/ui/Icons";
import { formatPeriods } from "@/lib/utils";
import type { Project, ProjectDetail } from "@/types";
import { TabGroup } from "@/components/ui/TabGroup";
import { DeferredContent, LoadingPlaceholder } from "@/components/ui/DeferredContent";

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
    const filename = flowDiagram.split("/").pop() as keyof typeof projectDiagrams | undefined;
    if (!filename || !(filename in projectDiagrams)) return null;
    const Diagram = projectDiagrams[filename];
    return (
      <DeferredContent label="다이어그램 불러오는 중" minHeight={280} rootMargin="280px 0px" className="lazy-diagram-slot">
        <Diagram />
      </DeferredContent>
    );
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
    <article className="detail-content-page project-detail-page">
      <ProjectBackLink />
      <header className="detail-page-heading project-card" style={{ marginBottom: "40px" }}>
        <span className="page-heading-eyebrow">PROJECT DETAIL</span>
        <h1 className="page-title">{meta.title}</h1>
        <p className="project-period">
          <CalendarIcon /> {formatPeriods(meta.periods)}
        </p>
        <TagList tags={meta.tags} />
      </header>

      <div className="mdx-content">
        <div className="section-title">프로젝트 개요</div>
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
    </article>
  );
}

const diagramLoading = () => <LoadingPlaceholder label="다이어그램 불러오는 중" minHeight={280} />;
const projectDiagrams = {
  "email-large-scale.html": dynamic(() => import("@/components/diagrams/projects/EmailLargeScale").then((m) => m.EmailLargeScale), { ssr: false, loading: diagramLoading }),
  "email-hybrid.html": dynamic(() => import("@/components/diagrams/projects/EmailHybrid").then((m) => m.EmailHybrid), { ssr: false, loading: diagramLoading }),
  "sso-filter.html": dynamic(() => import("@/components/diagrams/projects/SsoFilter").then((m) => m.SsoFilter), { ssr: false, loading: diagramLoading }),
  "rbac-flow.html": dynamic(() => import("@/components/diagrams/projects/RbacFlow").then((m) => m.RbacFlow), { ssr: false, loading: diagramLoading }),
  "container-support.html": dynamic(() => import("@/components/diagrams/projects/ContainerSupport").then((m) => m.ContainerSupport), { ssr: false, loading: diagramLoading }),
  "cs-pipeline.html": dynamic(() => import("@/components/diagrams/projects/CSPipeline").then((m) => m.CSPipeline), { ssr: false, loading: diagramLoading }),
  "integrated-portal.html": dynamic(() => import("@/components/diagrams/projects/IntegratedPortal").then((m) => m.IntegratedPortal), { ssr: false, loading: diagramLoading }),
  "cloud-migration-flow.html": dynamic(() => import("@/components/diagrams/projects/CloudMigrationFlow").then((m) => m.CloudMigrationFlow), { ssr: false, loading: diagramLoading }),
  "devops-db-arch.html": dynamic(() => import("@/components/diagrams/projects/DevopsDbArch").then((m) => m.DevopsDbArch), { ssr: false, loading: diagramLoading }),
  "devops-pipeline.html": dynamic(() => import("@/components/diagrams/projects/DevopsPipeline").then((m) => m.DevopsPipeline), { ssr: false, loading: diagramLoading }),
} as const;
