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
import { PageHeader } from "@/components/layout/PageHeader";
import journalCategories from "@/data/journal-categories.json";
import { JournalSectionHeader } from "@/components/ui/JournalSectionHeader";
import { DevlogSectionHeader } from "@/components/ui/DevlogSectionHeader";
import educationData from "@/data/notion/education.json";
import { normalizeEducationEntry } from "@/lib/utils";

type TabKey = DevlogCategory | "journal" | "all";
type DisplayCategory = DevlogCategory | "education";
type DisplayEntry = DevlogEntry & { category: DisplayCategory };

const devlogCategoryLabels: Record<DisplayCategory, string> = {
  tech_study: "기술 학습",
  problem_solving: "문제 해결",
  competition_event: "대회·행사",
  blog: "개인일지",
  education: "교육일지",
};

const categoryCollator = new Intl.Collator("ko", { numeric: true, sensitivity: "base" });

function compareCategoryLabels(left: string, right: string) {
  const leftIsLatin = /^[A-Za-z]/.test(left);
  const rightIsLatin = /^[A-Za-z]/.test(right);
  if (leftIsLatin !== rightIsLatin) return leftIsLatin ? -1 : 1;
  return categoryCollator.compare(left, right);
}

function getPackageLabel(pkg: string) {
  if (pkg === "journal") return "일지";
  return pkg.toUpperCase();
}

function DevlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    { key: "all", label: "전체 글" },
    { key: "tech_study", label: "기술 학습 기록" },
    { key: "problem_solving", label: "문제 해결 기록" },
    { key: "competition_event", label: "대회/행사" },
    { key: "journal", label: "일지" },
  ];

  const requestedTab = searchParams.get("tab") || tabs[0].key;
  const initialTab = requestedTab === "blog" || requestedTab === "education_log" ? "journal" : requestedTab;
  const initialPkg = searchParams.get("pkg") || "All";
  const initialJournal = searchParams.get("journal")
    || (requestedTab === "blog" ? "blog" : requestedTab === "education_log" ? "education" : "")
    || journalCategories[0]?.key
    || "education";
  const initialSearch = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab as TabKey);
  const [activePkg, setActivePkg] = useState(initialPkg);
  const [activeJournal, setActiveJournal] = useState(initialJournal);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSearchOpen, setIsSearchOpen] = useState(!!initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 6;
  const sortedJournalCategories = useMemo(
    () => [...journalCategories].sort((left, right) => compareCategoryLabels(left.label, right.label)),
    [],
  );

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    const currentPkg = searchParams.get("pkg");
    const currentQ = searchParams.get("q") || "";
    const currentPg = searchParams.get("page");
    const currentJournal = searchParams.get("journal");
    if (currentTab !== activeTab || currentPkg !== activePkg || currentQ !== searchQuery || currentPg !== String(currentPage) || (activeTab === "journal" && currentJournal !== activeJournal)) {
      const qParam = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : "";
      const journalParam = activeTab === "journal" ? `&journal=${activeJournal}` : "";
      router.replace(`/devlog?tab=${activeTab}${journalParam}&pkg=${activePkg}${qParam}&page=${currentPage}`, { scroll: false });
    }
  }, [activeTab, activeJournal, activePkg, searchQuery, currentPage, router, searchParams]);

  const allEntries = useMemo(() => {
    let entries: DisplayEntry[] = [];
    if (activeTab === "journal" && activeJournal === "education") {
      return [];
    }

    if (activeTab === "all") {
      const contentCategories: DevlogCategory[] = ["tech_study", "problem_solving", "competition_event", "blog"];
      entries = contentCategories.flatMap((category) =>
        ((devlogData[category] || []) as DevlogEntry[]).map((entry) => ({ ...entry, category })),
      );
      const educationEntries: DisplayEntry[] = (educationData as unknown[])
        .map((entry) => normalizeEducationEntry(entry))
        .filter((entry): entry is NonNullable<ReturnType<typeof normalizeEducationEntry>> => entry !== null)
        .map((entry) => ({
          id: entry.slug || entry.id,
          title: entry.blogTitle || entry.title,
          date: entry.date.replace(/-/g, "."),
          tags: entry.keywords,
          description: entry.impression || "작성된 내용이 없습니다.",
          package: "education",
          category: "education",
        }));
      entries.push(...educationEntries);

      const regularEntries = entries.filter((entry) => entry.category !== "education" && entry.category !== "blog");
      const journalEntries = entries.filter((entry) => entry.category === "education" || entry.category === "blog");
      return [
        ...sortByDateDesc(regularEntries),
        ...sortByDateDesc(journalEntries),
      ];
    } else if (activeTab === "journal") {
      if (activeJournal !== "blog") return [];
      entries = ((devlogData.blog || []) as DevlogEntry[]).map((entry) => ({ ...entry, category: "blog" }));
    } else {
      const category = activeTab as DevlogCategory;
      entries = ((devlogData[category] || []) as DevlogEntry[]).map((entry) => ({ ...entry, category }));
    }
    return sortByDateDesc(entries);
  }, [activeTab, activeJournal]);
  
  // Extract unique packages
  const packages = useMemo(() => {
    const pkgs = new Set<string>();
    allEntries.forEach(e => {
      if (e.package) pkgs.add(e.package);
    });
    const sortedPkgs = Array.from(pkgs).sort((left, right) =>
      compareCategoryLabels(getPackageLabel(left), getPackageLabel(right)),
    );
    if (activeTab === "all") {
      const regularPkgs = sortedPkgs.filter((pkg) => pkg !== "education" && pkg !== "blog");
      const combinedCategories = [...regularPkgs, "journal"].sort((left, right) =>
        compareCategoryLabels(getPackageLabel(left), getPackageLabel(right)),
      );
      return ["All", ...combinedCategories];
    }
    return ["All", ...sortedPkgs];
  }, [activeTab, allEntries]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    let result = allEntries;
    if (activePkg === "journal") {
      result = result.filter((entry) => entry.category === "education" || entry.category === "blog");
    } else if (activePkg !== "All") {
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

  const activeSectionTitle = activeTab === "all"
    ? "전체 글"
    : activeTab === "journal"
      ? journalCategories.find((category) => category.key === activeJournal)?.label || `${activeJournal} 일지`
      : devlogCategoryLabels[activeTab as DevlogCategory];

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

  const handleJournalChange = (key: string) => {
    setActiveJournal(key);
    setActivePkg("All");
    setCurrentPage(1);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHeader
        eyebrow="ENGINEERING LOG"
        title="기술 학습과 문제 해결 기록"
        description="새롭게 학습한 기술과 실무 문제를 분석하고 해결한 과정을 기록합니다."
        marker="03"
      />

      <div className="devlog-container">
        <TabGroup
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="devlog-layout" style={{ marginTop: "30px" }}>
            <aside className="devlog-sidebar">
              <nav aria-label={activeTab === "journal" ? "일지 카테고리" : "패키지 필터"}>
                {activeTab === "journal"
                  ? sortedJournalCategories.map((category) => (
                    <button
                      key={category.key}
                      type="button"
                      className={`pkg-pill ${activeJournal === category.key ? "active" : ""}`}
                      onClick={() => handleJournalChange(category.key)}
                    >
                      {category.label}
                    </button>
                  ))
                  : packages.map((pkg) => (
                    <button
                      key={pkg}
                      className={`pkg-pill ${activePkg === pkg ? "active" : ""}`}
                      onClick={() => handlePkgChange(pkg)}
                    >
                      {pkg === "All" ? "전체 보기" : getPackageLabel(pkg)}
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
              {activeTab === "journal" && activeJournal === "education" ? (
                <EducationLog key={searchQuery} searchQuery={searchQuery} />
              ) : (
                <>
                  {activeTab === "journal" && (
                    <JournalSectionHeader
                      categoryKey={activeJournal}
                      title={journalCategories.find((category) => category.key === activeJournal)?.label || `${activeJournal} 일지`}
                      count={filteredEntries.length}
                    />
                  )}
                  {activeTab !== "journal" && (
                    <DevlogSectionHeader
                      title={activeSectionTitle}
                      count={filteredEntries.length}
                      context={activePkg === "All" ? undefined : activePkg === "journal" ? "일지" : activePkg.toUpperCase()}
                    />
                  )}
                  {filteredEntries.length === 0 ? (
                    <div className="devlog-empty-state">해당 카테고리에 등록된 문서가 없습니다.</div>
                  ) : (
                    <>
                      <div className="devlog-grid">
                        {paginatedEntries.map((entry) => (
                          <Link
                            key={entry.id}
                            href={`/devlog/${entry.category}/${entry.id}?pkg=${activePkg}&page=${currentPage}`}
                            className="devlog-card-link"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <div className="devlog-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                              <div className="devlog-card-topline">
                                <span className="devlog-card-category">{devlogCategoryLabels[entry.category]}</span>
                                <div className="devlog-meta">
                                <span><CalendarIcon /> {entry.date}</span>
                                </div>
                              </div>
                              <div className="item-title" style={{ marginTop: 0, marginBottom: "12px" }}>{entry.title}</div>
                              <TagList tags={entry.tags} />
                              <p className="devlog-description" style={{ color: "var(--text-secondary)", marginTop: "12px", flexGrow: 1, lineHeight: "1.5" }}>
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
                </>
              )}
            </main>
          </div>
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
