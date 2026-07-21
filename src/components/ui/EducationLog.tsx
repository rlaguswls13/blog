"use client";

import { useMemo, useState } from "react";
import educationData from "@/data/notion/education.json";
import { CalendarIcon, RefreshIcon, BlogIcon, CommentIcon, CloseIcon, ClockIcon } from "@/components/ui/Icons";
import { TagList } from "@/components/ui/TagBadge";
import { Pagination } from "@/components/ui/Pagination";
import { normalizeEducationEntry } from "@/lib/utils";
import Link from "next/link";

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
}

export function EducationLog({
  itemsPerPage = 9,
  maxPageButtons = 5,
}: EducationLogProps) {
  const [selectedEntry, setSelectedEntry] = useState<EducationEntry | null>(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const entries = useMemo(() => {
    if (!Array.isArray(educationData)) return [];
    return (educationData as any[])
      .map((item) => normalizeEducationEntry(item))
      .filter((item): item is EducationEntry => item !== null);
  }, []);

  const totalPages = Math.ceil(entries.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntries = entries.slice(indexOfFirstItem, indexOfLastItem);


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
      <div className="education-list-header">
        <div className="section-title" style={{ margin: 0 }}>교육일지 목록</div>
        <button
          onClick={() => setShowSyncModal(true)}
          className="sync-button"
        >
          <RefreshIcon /> 동기화 안내
        </button>
      </div>

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

            {entry.notionUrl && (
              <a
                href={entry.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="education-blog-link"
                onClick={(e) => e.stopPropagation()}
              >
                <BlogIcon /> 상세내용 ↗
              </a>
            )}
          </div>
        ))}
      </div>

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

            {selectedEntry.notionUrl && (
              <a
                href={selectedEntry.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="education-blog-link"
              >
                <BlogIcon /> 상세내용 ↗
              </a>
            )}
          </div>
        </div>
      )}

      {/* Sync Info Modal */}
      {showSyncModal && (
        <div
          className="education-modal-overlay"
          onClick={() => setShowSyncModal(false)}
        >
          <div
            className="education-modal education-sync-modal"
            onClick={(e) => e.stopPropagation()}
          >
             <button
              className="education-modal-close"
              onClick={() => setShowSyncModal(false)}
            >
              <CloseIcon />
            </button>

            <div className="section-title education-sync-modal-title">
              <RefreshIcon style={{ color: "var(--accent-primary)" }} /> Notion 교육일지 동기화 안내
            </div>

            <div className="education-sync-modal-body">
              <p style={{ marginBottom: "12px" }}>
                현재 포트폴리오 웹사이트는 <strong>GitHub Pages 정적 호스팅</strong>으로 안전하고 빠르게 운영되고 있습니다.
              </p>

              <div className="education-sync-info-box">
                <h4><ClockIcon /> 1시간 단위 자동 동기화</h4>
                <p>
                  보안 강화를 위해 Notion API 토큰을 소스코드와 브라우저에 직접 노출하지 않고 환경 변수로 관리하고 있습니다.
                  대신 <strong>GitHub Actions 스케줄러가 자동으로 실행</strong>되어 노션의 최신 내용을 가져와 사이트를 업데이트합니다.
                </p>
              </div>

              <p>
                노션에 작성한 글은 1시간 단위 자동 빌드 스케줄러에 의해 자동으로 사이트에 반영됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
