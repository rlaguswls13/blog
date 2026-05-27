"use client";
import React from "react";

export function DbBottleneckDiagram() {
  return (
    <div className="bg-[var(--bg-secondary)] p-6 md:p-8 rounded-2xl shadow-sm border border-[var(--border-color)] my-6 max-w-[660px] mx-auto">
      {/* Responsive horizontal scroll container */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="w-full min-w-[480px] flex flex-col items-center gap-4 p-1">
          <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg py-2 px-6 font-extrabold text-[var(--text-primary)] shadow-sm text-sm">
            API 데이터 수신
          </div>
          
          <div className="text-blue-600 dark:text-blue-400 shrink-0">
            <svg className="w-6 h-6 animate-bounce shrink-0" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
          
          <div className="flex gap-6 w-full justify-center">
            {/* 분기 1: 가벼운 데이터 */}
            <div className="flex-1 flex flex-col items-center gap-3 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 text-center tracking-wide">
                PK, 식별자, 경량 데이터
              </div>
              <div className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-center shadow-sm">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs md:text-sm whitespace-nowrap">
                  DB 즉시 저장
                </span>
              </div>
              <div className="text-indigo-500 dark:text-indigo-400 my-0.5 shrink-0">
                <svg className="w-5 h-5 shrink-0" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg py-2 w-full text-center text-xs text-zinc-700 dark:text-zinc-300 shadow-sm font-semibold">
                기능적 무결성 즉시 확보
              </div>
            </div>

            {/* 분기 2: 대용량 데이터 */}
            <div className="flex-1 flex flex-col items-center gap-3 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
              <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 text-center tracking-wide">
                대용량 텍스트/파일 데이터
              </div>
              <div className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-center shadow-sm">
                <span className="font-bold text-orange-600 dark:text-orange-400 text-xs md:text-sm whitespace-nowrap">
                  서버 내부 File 임시 적재
                </span>
              </div>
              <div className="text-orange-500 dark:text-orange-400 flex flex-col items-center my-0.5 shrink-0">
                <span className="text-[10px] text-[var(--text-secondary)] mb-1 font-bold whitespace-nowrap bg-[var(--bg-tertiary)] px-2 py-0.5 rounded border border-[var(--border-color)] shadow-sm">
                  비동기 대기 / 자원 모니터링
                </span>
                <svg className="w-5 h-5 shrink-0 animate-pulse" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
              <div className="w-full bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-2.5 text-center shadow-sm">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs md:text-sm whitespace-nowrap">
                  DB 자원 여유 시 최종 동기화
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
