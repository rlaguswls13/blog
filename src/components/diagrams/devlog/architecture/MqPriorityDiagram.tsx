"use client";
import React from "react";

export function MqPriorityDiagram() {
  return (
    <div className="bg-[var(--bg-secondary)] p-6 md:p-8 rounded-2xl shadow-sm border border-[var(--border-color)] my-6 max-w-[920px] mx-auto">
      {/* Responsive horizontal scroll container */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="w-full min-w-[580px] flex items-center justify-between gap-4 p-1">
          {/* Dispatcher / mqAgent */}
          <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl p-4 text-center shadow-sm w-44 shrink-0">
            <span className="text-[10px] font-bold text-[var(--text-secondary)] block mb-1">
              Dispatcher / mqAgent
            </span>
            <span className="font-extrabold text-[var(--text-primary)] text-xs md:text-sm">
              Priority 판별 로직
            </span>
          </div>

          {/* Arrow */}
          <div className="text-blue-600 dark:text-blue-400 shrink-0">
            <svg className="w-6 h-6 shrink-0" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-3 w-full">
            {/* Fast Channel */}
            <div className="flex items-center gap-2.5 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl shadow-sm justify-between">
              <div className="w-24 text-right text-xs font-semibold text-rose-600 dark:text-rose-400 shrink-0">
                즉시 처리 (High)
              </div>
              <div className="text-rose-500 dark:text-rose-400 shrink-0">
                <svg className="w-4 h-4 shrink-0" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-rose-600 dark:text-rose-400 font-bold w-32 text-center text-xs shrink-0 shadow-sm">
                Fast Channel
              </div>
              <div className="text-rose-500 dark:text-rose-400 shrink-0">
                <svg className="w-4 h-4 shrink-0" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg px-3 py-1.5 text-[10px] md:text-xs font-bold text-center w-24 shrink-0 shadow-sm border border-zinc-700">
                MQ Server
              </div>
            </div>

            {/* Normal Channel */}
            <div className="flex items-center gap-2.5 bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-xl shadow-sm justify-between">
              <div className="w-24 text-right text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                일반 처리 (Normal)
              </div>
              <div className="text-blue-500 dark:text-blue-400 shrink-0">
                <svg className="w-4 h-4 shrink-0" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-blue-600 dark:text-blue-400 font-bold w-32 text-center text-xs shrink-0 shadow-sm">
                Normal Channel
              </div>
              <div className="text-blue-500 dark:text-blue-400 shrink-0">
                <svg className="w-4 h-4 shrink-0" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg px-3 py-1.5 text-[10px] md:text-xs font-bold text-center w-24 shrink-0 shadow-sm border border-zinc-700">
                MQ Server
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
