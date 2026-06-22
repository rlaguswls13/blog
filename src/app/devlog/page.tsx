"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import devlogData from "@/data/devlog.json";
import { TabGroup } from "@/components/ui/TabGroup";
import { TagList } from "@/components/ui/TagBadge";
import { CalendarIcon, SearchIcon } from "@/components/ui/Icons";
import { EducationLog } from "@/components/ui/EducationLog";
import { sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import { Pagination } from "@/components/ui/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import type { DevlogCategory, DevlogEntry } from "@/types";

type TabKey = DevlogCategory | "education_log";

function DevlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    { key: "tech_study", label: "기술 학습 기록" },
    { key: "problem_solving", label: "문제 해결 기록" },
    { key: "competition_event", label: "대회/행사" },
    { key: "education_log", label: "교육일지" },
  ];

  const initialTab = searchParams.get("tab") || tabs.find(t => t.key !== "education_log" && (devlogData[t.key as DevlogCategory]?.length || 0) > 0)?.key || tabs[0].key;
  const initialPkg = searchParams.get("pkg") || "All";
  const initialSearch = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab as TabKey);
  const [activePkg, setActivePkg] = useState(initialPkg);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSearchOpen, setIsSearchOpen] = useState(!!initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 6;

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    const currentPkg = searchParams.get("pkg");
    const currentQ = searchParams.get("q") || "";
    const currentPg = searchParams.get("page");
    if (currentTab !== activeTab || currentPkg !== activePkg || currentQ !== searchQuery || currentPg !== String(currentPage)) {
      const qParam = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : "";
      router.replace(`/devlog?tab=${activeTab}&pkg=${activePkg}${qParam}&page=${currentPage}`, { scroll: false });
    }
  }, [activeTab, activePkg, searchQuery, currentPage, router, searchParams]);

  const allEntries = activeTab === "education_log"
    ? []
    : sortByDateDesc(devlogData[activeTab as DevlogCategory] as DevlogEntry[]);
  
  // Extract unique packages
  const packages = useMemo(() => {
    const pkgs = new Set<string>();
    allEntries.forEach(e => {
      if (e.package) pkgs.add(e.package);
    });
    const sortedPkgs = Array.from(pkgs).sort((a, b) => a.localeCompare(b));
    return ["All", ...sortedPkgs];
  }, [allEntries]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    let result = allEntries;
    if (activePkg !== "All") {
      result = result.filter(e => e.package === activePkg);
    }
    if (searchQuery.trim()) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(lowerQ) ||
        e.description?.toLowerCase().includes(lowerQ) ||
        e.tags?.some(t => t.toLowerCase().includes(lowerQ))
      );
    }
    return result;
  }, [allEntries, activePkg, searchQuery]);

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (key: string) => {
    setActiveTab(key as TabKey);
    setActivePkg("All");
    setCurrentPage(1);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handlePkgChange = (pkg: string) => {
    setActivePkg(pkg);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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

        {activeTab === "education_log" ? (
          <div style={{ marginTop: "30px" }}>
            <EducationLog />
          </div>
        ) : (
          <div className="devlog-layout" style={{ marginTop: "30px" }}>
            <aside className="devlog-sidebar">
              <nav>
                {packages.map((pkg) => (
                  <button
                    key={pkg}
                    className={`pkg-pill ${activePkg === pkg ? "active" : ""}`}
                    onClick={() => handlePkgChange(pkg)}
                  >
                    {pkg === "All" ? "전체 보기" : pkg.toUpperCase()}
                  </button>
                ))}
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
              {filteredEntries.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                  해당 카테고리에 등록된 문서가 없습니다.
                </div>
              ) : (
                <>
                  <div className="devlog-grid">
                    {paginatedEntries.map((entry) => (
                      <Link
                        key={entry.id}
                        href={`/devlog/${activeTab}/${entry.id}?pkg=${activePkg}&page=${currentPage}`}
                        className="devlog-card-link"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="devlog-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                          <div className="devlog-meta" style={{ marginBottom: "10px" }}>
                            <span><CalendarIcon /> {entry.date}</span>
                          </div>
                          <h3 style={{ marginTop: 0, marginBottom: "12px" }}>{entry.title}</h3>
                          <TagList tags={entry.tags} />
                          <p className="devlog-description" style={{ color: "var(--text-secondary)", marginTop: "12px", flexGrow: 1, fontSize: "0.95rem", lineHeight: "1.5" }}>
                            {entry.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    maxPageButtons={5}
                  />
                </>
              )}
            </main>
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
