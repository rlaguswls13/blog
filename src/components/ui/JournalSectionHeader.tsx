"use client";

import { useState } from "react";
import { CloseIcon, ClockIcon, RefreshIcon } from "@/components/ui/Icons";

type JournalSectionHeaderProps = {
  categoryKey: string;
  title: string;
  count: number;
};

export function JournalSectionHeader({ categoryKey, title, count }: JournalSectionHeaderProps) {
  const [showSyncModal, setShowSyncModal] = useState(false);
  const sourceDescription = categoryKey === "education"
    ? "교육 과정과 학습 내용을 관리하는 Notion 데이터 소스"
    : "개인적으로 작성한 기록을 관리하는 Notion 데이터 소스";

  return (
    <>
      <div className="education-list-header journal-list-header">
        <div>
          <span className="journal-list-eyebrow">NOTION JOURNAL</span>
          <div className="section-title journal-list-title">
            {title} 목록 <small>{count}</small>
          </div>
        </div>
        <button type="button" onClick={() => setShowSyncModal(true)} className="sync-button">
          <RefreshIcon /> 동기화 안내
        </button>
      </div>

      {showSyncModal && (
        <div className="education-modal-overlay" onClick={() => setShowSyncModal(false)}>
          <div className="education-modal education-sync-modal" onClick={(event) => event.stopPropagation()}>
            <button className="education-modal-close" onClick={() => setShowSyncModal(false)} aria-label="닫기">
              <CloseIcon />
            </button>

            <div className="section-title education-sync-modal-title">
              <RefreshIcon style={{ color: "var(--accent-primary)" }} /> Notion {title} 동기화 안내
            </div>

            <div className="education-sync-modal-body">
              <p>{title}는 {sourceDescription}에서 가져옵니다.</p>
              <div className="education-sync-info-box">
                <h4><ClockIcon /> 1시간 단위 자동 동기화</h4>
                <p>
                  API 토큰은 환경 변수로 보호하며, GitHub Actions가 Notion의 변경 사항을 확인해 정적 페이지를 다시 생성합니다.
                </p>
              </div>
              <p>
                환경 변수의 카테고리 key는 <strong>{categoryKey}</strong>이며, 새 글은 다음 자동 빌드 이후 사이트에 반영됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
