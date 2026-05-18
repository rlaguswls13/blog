"use client";

import { useState } from "react";
import devlogData from "@/data/devlog.json";
import { TabGroup } from "@/components/ui/TabGroup";
import { TagList } from "@/components/ui/TagBadge";
import { sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import type { DevlogCategory, DevlogEntry } from "@/types";

export default function DevlogPage() {
  const [activeTab, setActiveTab] = useState<DevlogCategory>("problem_solving");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 rows of 2 columns

  const tabs = [
    { key: "tech_study", label: "기술 학습 기록" },
    { key: "problem_solving", label: "문제 해결 기록" },
  ];

  const entries = sortByDateDesc(devlogData[activeTab] as DevlogEntry[]);
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  
  const paginatedEntries = entries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (key: string) => {
    setActiveTab(key as DevlogCategory);
    setCurrentPage(1); // Reset to first page on tab change
  };

  return (
    <>
      <header>
        <h1>기술 학습 & 문제 해결</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "-15px", marginBottom: "40px" }}>
          기술 공부 기록과 문제 해결 과정을 기록하는 공간입니다.
        </p>
      </header>

      <div className="devlog-container">
        <TabGroup
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div
          className="devlog-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {paginatedEntries.map((entry) => (
            <Link
              key={entry.id}
              href={`/devlog/${activeTab}/${entry.id}`}
              className="devlog-card-link"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="devlog-card"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="devlog-meta" style={{ marginBottom: "10px" }}>
                  <span>📅 {entry.date}</span>
                </div>
                <h3 style={{ marginTop: 0, marginBottom: "12px" }}>{entry.title}</h3>
                <TagList tags={entry.tags} />
                <p
                  className="devlog-description"
                  style={{
                    color: "var(--text-secondary)",
                    marginTop: "12px",
                    flexGrow: 1,
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                  }}
                >
                  {entry.description}
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
      </div>
    </>
  );
}
