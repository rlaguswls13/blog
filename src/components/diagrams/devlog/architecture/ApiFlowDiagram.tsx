"use client";
import React from "react";

export function ApiFlowDiagram() {
  return (
    <div className="p-6 md:p-8 rounded-2xl shadow-sm my-6 max-w-[920px] mx-auto"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="w-full min-w-[820px] flex items-stretch justify-between gap-4 p-1">
          {/* Client */}
          <div className="flex-1 flex flex-col justify-center items-center rounded-xl p-4 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <span className="text-xs font-bold mb-1.5" style={{ color: 'var(--text-secondary)' }}>B2B 고객</span>
            <span className="font-extrabold text-sm md:text-base" style={{ color: 'var(--text-primary)' }}>
              API 요청<br />
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>(수백 KB ~ 1MB 이상)</span>
            </span>
          </div>

          {/* Arrow 1 */}
          <div className="flex items-center justify-center shrink-0 px-2" style={{ color: '#3b82f6' }}>
            <svg className="w-6 h-6 shrink-0 animate-pulse" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>

          {/* 1차 응답 그룹 */}
          <div className="flex-[1.5] rounded-xl p-4"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <div className="text-xs md:text-sm font-bold mb-3 text-center tracking-wider" style={{ color: '#3b82f6' }}>
              1차 응답 구간 (빠른 응답)
            </div>
            <div className="space-y-2">
              <div className="rounded-lg p-2.5 text-center text-xs md:text-sm shadow-sm font-semibold whitespace-nowrap"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                핵심 데이터(PK 등) 즉시 저장
              </div>
              <div className="rounded-lg p-2.5 text-center text-xs md:text-sm shadow-sm font-semibold whitespace-nowrap"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                대용량 데이터 서버 File 적재
              </div>
            </div>
            <div className="mt-3 text-center pt-2 text-xs font-bold tracking-wide"
              style={{ borderTop: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6' }}>
              접수 완료 응답 반환
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="flex items-center justify-center shrink-0 px-2" style={{ color: '#10b981' }}>
            <svg className="w-6 h-6 shrink-0 animate-pulse" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>

          {/* 2차 비동기 그룹 */}
          <div className="flex-[1.5] rounded-xl p-4"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div className="text-xs md:text-sm font-bold mb-3 text-center tracking-wider" style={{ color: '#10b981' }}>
              비동기 백그라운드 구간
            </div>
            <div className="space-y-2">
              <div className="rounded-lg p-2.5 text-center text-xs md:text-sm shadow-sm font-semibold whitespace-nowrap"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                내부 로직 수행 (인증/가공)
              </div>
              <div className="rounded-lg p-2.5 text-center text-xs md:text-sm shadow-sm font-semibold whitespace-nowrap"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                MQ 통신 (우선순위 분기)
              </div>
            </div>
            <div className="mt-3 text-center pt-2 text-xs font-bold tracking-wide"
              style={{ borderTop: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
              DB 최종 동기화 처리
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
