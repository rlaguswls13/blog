"use client";
import React from "react";

export function PubSubArchitecture() {
  return (
    <div className="bg-[var(--bg-secondary)] p-6 md:p-8 rounded-2xl shadow-sm border border-[var(--border-color)] my-6 max-w-[920px] mx-auto space-y-8">
      
      {/* 1. 기존 직접 호출 방식 */}
      <div>
        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <span className="bg-red-500/10 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-md text-xs tracking-wider">AS-IS</span>
          기존 직접 호출 방식 (Direct DI)
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 border border-[var(--border-color)] bg-[var(--bg-tertiary)] rounded-xl">
          
          <div className="flex-1 max-w-[200px] w-full bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center shadow-sm">
            <span className="font-extrabold text-[var(--text-primary)] text-sm">
              주문 서비스
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-red-600 dark:text-red-400 shrink-0 px-2 w-full md:w-auto">
            <span className="text-xs font-bold mb-1">직접 호출 (동기)</span>
            <svg className="w-6 h-6 shrink-0 animate-pulse hidden md:block" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            <svg className="w-6 h-6 shrink-0 animate-pulse md:hidden" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>

          <div className="flex-1 max-w-[280px] w-full bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center shadow-sm relative">
            <span className="font-extrabold text-[var(--text-primary)] text-sm block mb-2">
              로깅 서비스
            </span>
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-1 rounded">
              장애 발생 시 주문 마비 💥
            </span>
          </div>

        </div>
      </div>

      {/* 2. Pub/Sub 이벤트 방식 */}
      <div>
        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md text-xs tracking-wider">TO-BE</span>
          이벤트 기반 아키텍처 (Pub/Sub)
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 border border-[var(--border-color)] bg-[var(--bg-tertiary)] rounded-xl relative">
          
          {/* 발행자 */}
          <div className="flex-1 max-w-[200px] w-full bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center shadow-sm">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1.5 block">Publisher</span>
            <span className="font-extrabold text-[var(--text-primary)] text-sm">
              주문 서비스
            </span>
          </div>

          {/* Arrow 1 */}
          <div className="flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 px-2 w-full md:w-auto">
            <span className="text-xs font-bold mb-1">이벤트 던짐</span>
            <svg className="w-6 h-6 shrink-0 hidden md:block" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            <svg className="w-6 h-6 shrink-0 md:hidden" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>

          {/* Event Bus */}
          <div className="flex-1 max-w-[200px] w-full bg-zinc-500/10 border border-zinc-500/20 rounded-xl p-4 text-center shadow-sm">
            <span className="font-extrabold text-[var(--text-primary)] text-sm flex items-center justify-center gap-2">
              <span className="text-xl">📬</span> Event Bus
            </span>
            <span className="text-xs font-semibold text-[var(--text-secondary)] mt-1 block">
              ApplicationEventPublisher
            </span>
          </div>

          {/* Arrow 2 */}
          <div className="flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 px-2 w-full md:w-auto">
            <span className="text-xs font-bold mb-1">비동기 배달</span>
            <svg className="w-6 h-6 shrink-0 hidden md:block" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            <svg className="w-6 h-6 shrink-0 md:hidden" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>

          {/* 구독자 */}
          <div className="flex-1 max-w-[280px] w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center shadow-sm relative">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 block">Subscriber</span>
            <span className="font-extrabold text-[var(--text-primary)] text-sm block mb-2">
              로깅 서비스
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
              장애 발생 시 격리 🛡️
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
