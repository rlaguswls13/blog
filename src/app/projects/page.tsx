"use client";

import React, { useState } from "react";
import projectsData from "@/data/projects.json";
import { TagList } from "@/components/ui/TagBadge";
import { formatPeriods, calculateTotalPeriod, sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import { CalendarIcon, SearchIcon } from "@/components/ui/Icons";
import type { Project } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialSearch = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSearchOpen, setIsSearchOpen] = useState(!!initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 6; // 6 cards per page

  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    const currentPg = searchParams.get("page");
    if (currentQ !== searchQuery || currentPg !== String(currentPage)) {
      const qParam = searchQuery ? `?q=${encodeURIComponent(searchQuery)}&page=${currentPage}` : `?page=${currentPage}`;
      router.replace(`/projects${qParam}`, { scroll: false });
    }
  }, [searchQuery, currentPage, router, searchParams]);

  const allProjects = sortByDateDesc(projectsData.projects as Project[]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let result = allProjects;
    if (searchQuery.trim()) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerQ) ||
        p.description.toLowerCase().includes(lowerQ) ||
        p.tags?.some(t => t.toLowerCase().includes(lowerQ))
      );
    }
    return result;
  }, [allProjects, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <header>
        <h1>프로젝트</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "-15px", marginBottom: "40px" }}>
          참여한 주요 프로젝트 목록입니다.
        </p>
      </header>

      <div className="devlog-container">
        <div className="devlog-layout" style={{ marginTop: "30px" }}>
          <aside className="devlog-sidebar">
            <nav>
              <button className="pkg-pill active">전체 프로젝트</button>
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
        {paginatedProjects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}?page=${currentPage}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="project-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <h3>{p.title}</h3>
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
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}

