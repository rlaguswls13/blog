"use client";
import React from "react";

export function DbBottleneckDiagram() {
  return (
    <div className="p-6 md:p-8 rounded-2xl shadow-sm my-6 max-w-[660px] mx-auto"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="w-full min-w-[480px] flex flex-col items-center gap-4 p-1">
          <div className="rounded-lg py-2 px-6 font-extrabold shadow-sm text-sm"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
            API 데이터 수신
          </div>
          
          <div className="shrink-0" style={{ color: '#3b82f6' }}>
            <svg className="w-6 h-6 animate-bounce shrink-0" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
          
          <div className="flex gap-6 w-full justify-center">
            {/* 분기 1: 가벼운 데이터 */}
            <div className="flex-1 flex flex-col items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <div className="text-xs font-semibold text-center tracking-wide" style={{ color: '#6366f1' }}>
                PK, 식별자, 경량 데이터
              </div>
              <div className="w-full rounded-xl p-2.5 text-center shadow-sm"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span className="font-bold text-xs md:text-sm whitespace-nowrap" style={{ color: '#6366f1' }}>
                  DB 즉시 저장
                </span>
              </div>
              <div className="my-0.5 shrink-0" style={{ color: '#6366f1' }}>
                <svg className="w-5 h-5 shrink-0" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
              <div className="rounded-lg py-2 w-full text-center text-xs shadow-sm font-semibold"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                기능적 무결성 즉시 확보
              </div>
            </div>

            {/* 분기 2: 대용량 데이터 */}
            <div className="flex-1 flex flex-col items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
              <div className="text-xs font-semibold text-center tracking-wide" style={{ color: '#f97316' }}>
                대용량 텍스트/파일 데이터
              </div>
              <div className="w-full rounded-xl p-2.5 text-center shadow-sm"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span className="font-bold text-xs md:text-sm whitespace-nowrap" style={{ color: '#f97316' }}>
                  서버 내부 File 임시 적재
                </span>
              </div>
              <div className="flex flex-col items-center my-0.5 shrink-0" style={{ color: '#f97316' }}>
                <span className="text-[10px] mb-1 font-bold whitespace-nowrap px-2 py-0.5 rounded shadow-sm"
                  style={{ color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                  비동기 대기 / 자원 모니터링
                </span>
                <svg className="w-5 h-5 shrink-0 animate-pulse" width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
              <div className="w-full rounded-xl p-2.5 text-center shadow-sm"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <span className="font-bold text-xs md:text-sm whitespace-nowrap" style={{ color: '#6366f1' }}>
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
