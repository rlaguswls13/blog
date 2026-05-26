"use client";

import { useState, useEffect, Suspense } from "react";
import devlogData from "@/data/devlog.json";
import { TabGroup } from "@/components/ui/TabGroup";
import { TagList } from "@/components/ui/TagBadge";
import { sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import type { DevlogCategory, DevlogEntry } from "@/types";

function DevlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    { key: "tech_study", label: "기술 학습 기록" },
    { key: "problem_solving", label: "문제 해결 기록" },
  ];

  // Initialize from URL or defaults
  const initialTab = searchParams.get("tab") || tabs.find(t => (devlogData[t.key as DevlogCategory]?.length || 0) > 0)?.key || tabs[0].key;
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [activeTab, setActiveTab] = useState<DevlogCategory>(initialTab as DevlogCategory);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 6; // 3 rows of 2 columns

  // Sync state to URL without reloading
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    const currentPg = searchParams.get("page");
    if (currentTab !== activeTab || currentPg !== String(currentPage)) {
      router.replace(`/devlog?tab=${activeTab}&page=${currentPage}`, { scroll: false });
    }
  }, [activeTab, currentPage, router, searchParams]);

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

        <div className="devlog-grid" style={{ marginTop: "30px" }}>
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
      </div>
    </>
  );
}

export default function DevlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DevlogContent />
    </Suspense>
  );
}
