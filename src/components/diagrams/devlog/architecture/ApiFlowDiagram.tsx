"use client";
import React from "react";

export function ApiFlowDiagram() {
  return (
    <div className="bg-[var(--bg-secondary)] p-6 md:p-8 rounded-2xl shadow-sm border border-[var(--border-color)] my-6 max-w-[920px] mx-auto">
      {/* Responsive horizontal scroll container */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="w-full min-w-[820px] flex items-stretch justify-between gap-4 p-1">
          {/* Client */}
          <div className="flex-1 flex flex-col justify-center items-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl p-4 text-center">
            <span className="text-xs font-bold text-[var(--text-secondary)] mb-1.5">B2B 고객</span>
            <span className="font-extrabold text-[var(--text-primary)] text-sm md:text-base">
              API 요청<br />
              <span className="text-xs font-semibold text-[var(--text-secondary)]">(수백 KB ~ 1MB 이상)</span>
            </span>
          </div>

          {/* Arrow 1 */}
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 px-2">
            <svg className="w-6 h-6 shrink-0 animate-pulse" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>

          {/* 1차 응답 그룹 */}
          <div className="flex-[1.5] bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400 mb-3 text-center tracking-wider">
              1차 응답 구간 (빠른 응답)
            </div>
            <div className="space-y-2">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2.5 text-center text-xs md:text-sm text-zinc-700 dark:text-zinc-300 shadow-sm font-semibold whitespace-nowrap">
                핵심 데이터(PK 등) 즉시 저장
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2.5 text-center text-xs md:text-sm text-zinc-700 dark:text-zinc-300 shadow-sm font-semibold whitespace-nowrap">
                대용량 데이터 서버 File 적재
              </div>
            </div>
            <div className="mt-3 text-center border-t border-blue-500/20 pt-2 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wide">
              접수 완료 응답 반환
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 px-2">
            <svg className="w-6 h-6 shrink-0 animate-pulse" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>

          {/* 2차 비동기 그룹 */}
          <div className="flex-[1.5] bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-xs md:text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3 text-center tracking-wider">
              비동기 백그라운드 구간
            </div>
            <div className="space-y-2">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2.5 text-center text-xs md:text-sm text-zinc-700 dark:text-zinc-300 shadow-sm font-semibold whitespace-nowrap">
                내부 로직 수행 (인증/가공)
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2.5 text-center text-xs md:text-sm text-zinc-700 dark:text-zinc-300 shadow-sm font-semibold whitespace-nowrap">
                MQ 통신 (우선순위 분기)
              </div>
            </div>
            <div className="mt-3 text-center border-t border-emerald-500/20 pt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wide">
              DB 최종 동기화 처리
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
