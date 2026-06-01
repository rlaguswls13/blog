"use client";
import React from "react";

export function MqPriorityDiagram() {
  return (
    <div className="p-6 md:p-8 rounded-2xl shadow-sm my-6 max-w-[920px] mx-auto"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="w-full min-w-[580px] flex items-center justify-between gap-4 p-1">
          {/* Dispatcher / mqAgent */}
          <div className="rounded-xl p-4 text-center shadow-sm w-44 shrink-0"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <span className="text-[10px] font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>
              Dispatcher / mqAgent
            </span>
            <span className="font-extrabold text-xs md:text-sm" style={{ color: 'var(--text-primary)' }}>
              Priority 판별 로직
            </span>
          </div>

          {/* Arrow */}
          <div className="shrink-0" style={{ color: '#3b82f6' }}>
            <svg className="w-6 h-6 shrink-0" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-3 w-full">
            {/* Fast Channel */}
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl shadow-sm justify-between"
              style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}>
              <div className="w-24 text-right text-xs font-semibold shrink-0" style={{ color: '#f43f5e' }}>
                즉시 처리 (High)
              </div>
              <div className="shrink-0" style={{ color: '#f43f5e' }}>
                <svg className="w-4 h-4 shrink-0" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="rounded-lg px-3 py-1.5 font-bold w-32 text-center text-xs shrink-0 shadow-sm"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#f43f5e' }}>
                Fast Channel
              </div>
              <div className="shrink-0" style={{ color: '#f43f5e' }}>
                <svg className="w-4 h-4 shrink-0" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="text-white rounded-lg px-3 py-1.5 text-[10px] md:text-xs font-bold text-center w-24 shrink-0 shadow-sm"
                style={{ background: '#3f3f46', border: '1px solid #52525b' }}>
                MQ Server
              </div>
            </div>

            {/* Normal Channel */}
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl shadow-sm justify-between"
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div className="w-24 text-right text-xs font-semibold shrink-0" style={{ color: '#3b82f6' }}>
                일반 처리 (Normal)
              </div>
              <div className="shrink-0" style={{ color: '#3b82f6' }}>
                <svg className="w-4 h-4 shrink-0" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="rounded-lg px-3 py-1.5 font-bold w-32 text-center text-xs shrink-0 shadow-sm"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#3b82f6' }}>
                Normal Channel
              </div>
              <div className="shrink-0" style={{ color: '#3b82f6' }}>
                <svg className="w-4 h-4 shrink-0" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
              <div className="text-white rounded-lg px-3 py-1.5 text-[10px] md:text-xs font-bold text-center w-24 shrink-0 shadow-sm"
                style={{ background: '#3f3f46', border: '1px solid #52525b' }}>
                MQ Server
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
