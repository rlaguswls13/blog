"use client";
import React from "react";

export function TimeoutPolicyDiagram() {
  return (
    <div className="p-6 md:p-8 rounded-2xl shadow-sm my-6 max-w-[700px] mx-auto"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="w-full min-w-[620px] flex items-start justify-between gap-8 p-1">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="rounded-xl px-6 py-3 font-extrabold shadow-sm text-center"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              API 처리 스레드<br />
              <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>각 구간별 작업 수행</span>
            </div>
            <div className="shrink-0" style={{ color: '#3b82f6' }}>
              <svg className="w-6 h-6 animate-bounce shrink-0" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
            <div className="rounded-lg px-4 py-2 text-xs font-bold text-center w-full shadow-sm"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              지연 발생 판별
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {/* 정상 처리 */}
            <div className="flex items-center gap-4 p-4 rounded-xl shadow-sm justify-between"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="font-semibold w-20 text-center text-xs md:text-sm shrink-0 tracking-wide" style={{ color: '#10b981' }}>
                정상 처리
              </div>
              <div className="shrink-0" style={{ color: '#10b981' }}>
                <svg className="w-5 h-5 shrink-0" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="rounded-lg px-4 py-2 text-xs md:text-sm font-bold shrink-0 shadow-sm"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#10b981' }}>
                다음 단계 정상 진행
              </div>
            </div>

            {/* 타임아웃 발생 */}
            <div className="flex flex-col gap-3 p-4 rounded-xl shadow-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <div className="flex items-center gap-4 justify-between">
                <div className="font-semibold w-20 text-center text-xs md:text-sm shrink-0 tracking-wide" style={{ color: '#ef4444' }}>
                  임계치 초과
                </div>
                <div className="shrink-0" style={{ color: '#ef4444' }}>
                  <svg className="w-5 h-5 shrink-0" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
                <div className="rounded-lg px-4 py-2 font-bold text-xs md:text-sm text-center shrink-0 shadow-sm"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#ef4444' }}>
                  즉각적인 Error 반환
                </div>
              </div>

              <div className="flex justify-center my-0.5 shrink-0" style={{ color: '#ef4444' }}>
                <svg className="w-5 h-5 shrink-0 animate-pulse" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>

              <div className="rounded-xl p-3"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <div className="text-[11px] font-semibold mb-2 text-center uppercase tracking-wider" style={{ color: '#ef4444' }}>
                  Error 발생 시 후속 조치 기능
                </div>
                <div className="flex gap-2 justify-center text-[10px] md:text-xs font-semibold" style={{ color: '#ef4444' }}>
                  <span className="px-2.5 py-1.5 rounded-lg shadow-sm text-center"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    스레드 반환 (전체 장애 방지)
                  </span>
                  <span className="px-2.5 py-1.5 rounded-lg shadow-sm text-center"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    서버 담당자 알림 고지
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
