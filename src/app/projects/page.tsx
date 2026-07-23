"use client";

import React, { useState } from "react";
import projectsData from "@/data/pages/main/projects.json";
import { TagList } from "@/components/ui/TagBadge";
import { formatPeriods, calculateTotalPeriod, sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import { CalendarIcon, SearchIcon } from "@/components/ui/Icons";
import type { Project } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardThumbnail } from "@/components/ui/CardThumbnail";
import { getProjectThumbnail } from "@/lib/thumbnails";
import { LoadingPlaceholder } from "@/components/ui/DeferredContent";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialTab = (searchParams.get("tab") === "personal" ? "personal" : "enterprise") as "enterprise" | "personal";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSearchOpen, setIsSearchOpen] = useState(!!initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [activeTab, setActiveTab] = useState<"enterprise" | "personal">(initialTab);
  const itemsPerPage = 6; // 6 cards per page

  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    const currentPg = searchParams.get("page");
    const currentTab = searchParams.get("tab") || "enterprise";

    if (currentQ !== searchQuery || currentPg !== String(currentPage) || currentTab !== activeTab) {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (currentPage > 1) params.set("page", String(currentPage));
      if (activeTab !== "enterprise") params.set("tab", activeTab);

      const qParam = params.toString() ? `?${params.toString()}` : "";
      router.replace(`/projects${qParam}`, { scroll: false });
    }
  }, [searchQuery, currentPage, activeTab, router, searchParams]);

  const allProjects = sortByDateDesc(projectsData.projects as Project[]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let result = allProjects;

    // 1. Filter by Active Tab
    result = result.filter(p => p.type === activeTab || (!p.type && activeTab === "enterprise"));

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(lowerQ) ||
        p.description.toLowerCase().includes(lowerQ) ||
        p.tags?.some(t => t.toLowerCase().includes(lowerQ))
      );
    }
    return result;
  }, [allProjects, searchQuery, activeTab]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: "enterprise" | "personal") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHeader
        eyebrow="SELECTED WORK"
        title="작업과 해결 과정"
        description={activeTab === "enterprise" ? "참여한 주요 엔터프라이즈 작업과 담당 역할을 소개합니다." : "직접 기획하고 구현한 개인 작업을 소개합니다."}
        marker="02"
      />

      <div className="devlog-container">
        <div className="devlog-layout" style={{ marginTop: "30px" }}>
          <aside className="devlog-sidebar">
            <nav>
              <button
                onClick={() => handleTabChange("enterprise")}
                className={`pkg-pill ${activeTab === "enterprise" ? "active" : ""}`}
              >
                참여 작업
              </button>
              <button
                onClick={() => handleTabChange("personal")}
                className={`pkg-pill ${activeTab === "personal" ? "active" : ""}`}
              >
                개인 작업
              </button>
            </nav>
            <div className="sidebar-search">
              {!isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  style={{
                    background: "transparent", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "8px",
                    color: "var(--text-secondary)", padding: "8px 12px",
                    borderRadius: "6px", width: "100%", fontSize: "0.95rem"
                  }}
                  className="pkg-pill"
                >
                  <SearchIcon style={{ position: 'relative', left: '0', transform: 'none' }} /> 검색
                </button>
              ) : (
                <div style={{ position: "relative" }}>
                  <span
                    onClick={() => setIsSearchOpen(false)}
                    style={{ cursor: "pointer", position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10, display: "flex" }}
                  >
                    <SearchIcon style={{ position: "relative", left: "0", transform: "none" }} />
                  </span>
                  <input
                    type="text"
                    placeholder="검색어 입력..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    autoFocus
                  />
                </div>
              )}
            </div>
          </aside>

          <main className="devlog-main">
            <div className="projects-grid">
              {paginatedProjects.map((p, index) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}?page=${currentPage}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}${activeTab !== "enterprise" ? `&tab=${activeTab}` : ""}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="project-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardThumbnail src={getProjectThumbnail(p.id)} alt="" className="project-card-thumbnail" priority={index === 0} />
                    <div className="item-title">{p.title}</div>
                    <p className="project-period">
                      <CalendarIcon /> {formatPeriods(p.periods)} {calculateTotalPeriod(p.periods)}
                    </p>
                    <TagList tags={p.tags} />
                    <p style={{ color: "var(--text-secondary)", marginTop: 12, flexGrow: 1 }}>
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages >= 1 && (
              <div className="pagination-container">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`pagination-btn ${currentPage === pageNum ? "active" : ""}`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<LoadingPlaceholder label="프로젝트 목록 불러오는 중" minHeight={360} />}>
      <ProjectsContent />
    </Suspense>
  );
}

