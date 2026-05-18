"use client";

import React, { useState } from "react";
import projectsData from "@/data/projects.json";
import { TagList } from "@/components/ui/TagBadge";
import { formatPeriods, calculateTotalPeriod, sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import type { Project } from "@/types";

export default function ProjectsPage() {
  const sorted = sortByDateDesc(projectsData.projects as Project[]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 rows of 2 columns

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginatedProjects = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <h1>프로젝트</h1>
      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
        }}
      >
        {paginatedProjects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="project-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <h3>{p.title}</h3>
              <p className="project-period">
                📅 {formatPeriods(p.periods)} {calculateTotalPeriod(p.periods)}
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
      {totalPages > 1 && (
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
    </>
  );
}
