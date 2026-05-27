"use client";

import { useState } from "react";
import educationData from "@/data/education.json";
import { CalendarIcon, RefreshIcon, BlogIcon, CommentIcon, CloseIcon, ClockIcon } from "@/components/ui/Icons";
import { TagList } from "@/components/ui/TagBadge";
import { Pagination } from "@/components/ui/Pagination";

interface EducationEntry {
  id: string;
  round: string;
  date: string;
  keywords: string[];
  impression: string;
  blogTitle: string;
  notionUrl: string;
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

  const entries = educationData as EducationEntry[];
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.2rem", margin: 0, color: "var(--text-primary)", fontWeight: 600 }}>교육일지 목록</h2>
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
            style={{ cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
            onClick={() => setSelectedEntry(entry)}
          >
            <div className="education-card-header">
              <span className="education-round">{entry.round}</span>
              <span className="devlog-meta">
                <CalendarIcon /> {formatDate(entry.date)}
              </span>
            </div>

            {entry.blogTitle && (
              <h3 style={{ marginTop: "8px", marginBottom: "12px", fontSize: "1.05rem" }}>
                {entry.blogTitle}
              </h3>
            )}

            <TagList tags={entry.keywords} />

            <p
              className="devlog-description"
              style={{
                color: "var(--text-secondary)",
                marginTop: "12px",
                flexGrow: 1,
                fontSize: "0.92rem",
                lineHeight: "1.6",
              }}
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
                <BlogIcon /> 블로깅 페이지 보기 ↗
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
              <h2 style={{ margin: "12px 0 16px", fontSize: "1.3rem" }}>
                {selectedEntry.blogTitle}
              </h2>
            )}

            <TagList tags={selectedEntry.keywords} />

            <div className="education-modal-section">
              <h4><CommentIcon /> 느낀점</h4>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "var(--text-secondary)" }}>
                {selectedEntry.impression || "내용이 아직 없습니다."}
              </p>
            </div>

            {selectedEntry.notionUrl && (
              <a
                href={selectedEntry.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="education-blog-link"
                style={{ marginTop: "20px" }}
              >
                <BlogIcon /> 블로깅 페이지에서 자세히 보기 ↗
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
            className="education-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "500px" }}
          >
             <button
              className="education-modal-close"
              onClick={() => setShowSyncModal(false)}
            >
              <CloseIcon />
            </button>

            <h2 style={{ fontSize: "1.3rem", marginTop: 0, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <RefreshIcon style={{ color: "var(--accent-primary)" }} /> Notion 교육일지 동기화 안내
            </h2>

            <div style={{ lineHeight: "1.7", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              <p style={{ marginBottom: "12px" }}>
                현재 포트폴리오 웹사이트는 <strong>GitHub Pages 정적 호스팅</strong>으로 안전하고 빠르게 운영되고 있습니다.
              </p>

              <div style={{ background: "rgba(98, 0, 238, 0.05)", border: "1px solid rgba(98, 0, 238, 0.15)", borderRadius: "8px", padding: "14px", marginBottom: "16px" }}>
                <h4 style={{ margin: "0 0 6px", color: "var(--accent-primary)", fontSize: "0.95rem" }}><ClockIcon /> 1시간 단위 자동 동기화</h4>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  보안 강화를 위해 Notion API 토큰을 소스코드와 브라우저에 직접 노출하지 않고 환경 변수로 관리하고 있습니다.
                  대신 <strong>GitHub Actions 스케줄러가 1시간마다 자동으로 실행</strong>되어 노션의 최신 내용을 가져와 사이트를 업데이트합니다.
                </p>
              </div>

              <p style={{ marginBottom: "0" }}>
                노션에 작성한 글은 1시간 단위 자동 빌드 스케줄러에 의해 자동으로 사이트에 반영됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
