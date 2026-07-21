"use client";

import { useMemo, useState } from "react";
import educationData from "@/data/notion/education.json";
import { CalendarIcon, BlogIcon, CommentIcon, CloseIcon } from "@/components/ui/Icons";
import { TagList } from "@/components/ui/TagBadge";
import { Pagination } from "@/components/ui/Pagination";
import { normalizeEducationEntry, sortByDateDesc } from "@/lib/utils";
import Link from "next/link";
import { JournalSectionHeader } from "@/components/ui/JournalSectionHeader";

interface EducationEntry {
  id: string;
  title: string;
  round: string;
  date: string;
  keywords: string[];
  impression: string;
  blogTitle: string;
  notionUrl: string;
  slug: string;
}

interface EducationLogProps {
  itemsPerPage?: number;
  maxPageButtons?: number;
  searchQuery?: string;
}

export function EducationLog({
  itemsPerPage = 9,
  maxPageButtons = 5,
  searchQuery = "",
}: EducationLogProps) {
  const [selectedEntry, setSelectedEntry] = useState<EducationEntry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const entries = useMemo(() => {
    if (!Array.isArray(educationData)) return [];
    const normalizedEntries = (educationData as unknown[])
      .map((item) => normalizeEducationEntry(item))
      .filter((item): item is EducationEntry => item !== null);
    return sortByDateDesc(normalizedEntries);
  }, []);

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return entries;
    return entries.filter((entry) =>
      entry.title.toLowerCase().includes(query)
      || entry.blogTitle.toLowerCase().includes(query)
      || entry.round.toLowerCase().includes(query)
      || entry.impression.toLowerCase().includes(query)
      || entry.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
    );
  }, [entries, searchQuery]);

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);


  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return dateStr.replace(/-/g, ".");
  };

  const truncateText = (text: string, maxLen: number) => {
    if (!text) return "내용 없음";
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen) + "...";
  };

  return (
    <>
      <JournalSectionHeader categoryKey="education" title="교육일지" count={filteredEntries.length} />

      <div className="devlog-grid">
        {currentEntries.map((entry) => (
          <div
            key={entry.id}
            className="devlog-card education-card"
            onClick={() => setSelectedEntry(entry)}
          >
            <div className="education-card-header">
              <span className="education-round">{entry.round}</span>
              <span className="devlog-meta">
                <CalendarIcon /> {formatDate(entry.date)}
              </span>
            </div>

            {entry.blogTitle && (
              <div className="item-title">
                {entry.blogTitle}
              </div>
            )}

            <TagList tags={entry.keywords} />

            <p
              className="devlog-description"
            >
              {truncateText(entry.impression, 100)}
            </p>

            {entry.slug && (
              <Link
                href={`/devlog/education/${entry.slug}?tab=journal&journal=education`}
                className="education-blog-link"
                onClick={(e) => e.stopPropagation()}
              >
                <BlogIcon /> 상세내용 ↗
              </Link>
            )}
          </div>
        ))}
      </div>

      {currentEntries.length === 0 && (
        <div className="devlog-empty-state">검색 조건에 맞는 교육일지가 없습니다.</div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        maxPageButtons={maxPageButtons}
      />


      {/* Modal */}
      {selectedEntry && (
        <div
          className="education-modal-overlay"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="education-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="education-modal-close"
              onClick={() => setSelectedEntry(null)}
            >
              <CloseIcon />
            </button>

            <div className="education-modal-header">
              <span className="education-round">{selectedEntry.round}</span>
              <span className="devlog-meta">
                <CalendarIcon /> {formatDate(selectedEntry.date)}
              </span>
            </div>

            {selectedEntry.blogTitle && (
              <div className="section-title" style={{ margin: "12px 0 16px" }}>
                {selectedEntry.blogTitle}
              </div>
            )}

            <TagList tags={selectedEntry.keywords} />

            <div className="education-modal-section">
              <h4><CommentIcon /> 느낀점</h4>
              <p className="education-modal-impression">
                {selectedEntry.impression || "내용이 아직 없습니다."}
              </p>
            </div>

            {selectedEntry.slug && (
              <Link
                href={`/devlog/education/${selectedEntry.slug}?tab=journal&journal=education`}
                className="education-blog-link"
              >
                <BlogIcon /> 상세내용 ↗
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
