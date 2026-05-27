"use client";
import React from "react";

export function TimeoutPolicyDiagram() {
  return (
    <div className="bg-[var(--bg-secondary)] p-6 md:p-8 rounded-2xl shadow-sm border border-[var(--border-color)] my-6 max-w-[700px] mx-auto">
      {/* Responsive horizontal scroll container */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="w-full min-w-[620px] flex items-start justify-between gap-8 p-1">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-6 py-3 font-extrabold text-[var(--text-primary)] shadow-sm text-center">
              API 처리 스레드<br />
              <span className="text-xs font-bold text-[var(--text-secondary)]">각 구간별 작업 수행</span>
            </div>
            <div className="text-blue-600 dark:text-blue-400 shrink-0">
              <svg className="w-6 h-6 animate-bounce shrink-0" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
            <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-xs font-bold text-[var(--text-primary)] text-center w-full shadow-sm">
              지연 발생 판별
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {/* 정상 처리 */}
            <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl shadow-sm justify-between">
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold w-20 text-center text-xs md:text-sm shrink-0 tracking-wide">
                정상 처리
              </div>
              <div className="text-emerald-500 dark:text-emerald-400 shrink-0">
                <svg className="w-5 h-5 shrink-0" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold shrink-0 shadow-sm">
                다음 단계 정상 진행
              </div>
            </div>

            {/* 타임아웃 발생 */}
            <div className="flex flex-col gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 justify-between">
                <div className="text-red-600 dark:text-red-400 font-semibold w-20 text-center text-xs md:text-sm shrink-0 tracking-wide">
                  임계치 초과
                </div>
                <div className="text-red-500 dark:text-red-400 shrink-0">
                  <svg className="w-5 h-5 shrink-0" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-red-600 dark:text-red-400 font-bold text-xs md:text-sm text-center shrink-0 shadow-sm">
                  즉각적인 Error 반환
                </div>
              </div>

              {/* Error 발생 후 후속 처리 로직 시각화 */}
              <div className="flex justify-center text-red-500 dark:text-red-400 my-0.5 shrink-0">
                <svg className="w-5 h-5 shrink-0 animate-pulse" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <div className="text-[11px] font-semibold text-red-600 dark:text-red-400 mb-2 text-center uppercase tracking-wider">
                  Error 발생 시 후속 조치 기능
                </div>
                <div className="flex gap-2 justify-center text-[10px] md:text-xs font-semibold text-red-600 dark:text-red-400">
                  <span className="bg-[var(--bg-secondary)] border border-red-500/20 px-2.5 py-1.5 rounded-lg shadow-sm text-center">
                    스레드 반환 (전체 장애 방지)
                  </span>
                  <span className="bg-[var(--bg-secondary)] border border-red-500/20 px-2.5 py-1.5 rounded-lg shadow-sm text-center">
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
