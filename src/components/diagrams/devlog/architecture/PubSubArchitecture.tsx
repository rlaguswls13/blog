"use client";
import React from "react";

export function PubSubArchitecture() {
  return (
    <div className="p-6 md:p-8 rounded-2xl shadow-sm my-6 max-w-[920px] mx-auto space-y-8"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      
      {/* 1. 기존 직접 호출 방식 */}
      <div>
        <h4 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="px-2.5 py-1 rounded-md text-xs tracking-wider"
            style={{ background: 'rgba(244,63,94,0.08)', color: '#f43f5e' }}>AS-IS</span>
          기존 직접 호출 방식 (Direct DI)
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 rounded-xl"
          style={{ border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
          
          <div className="flex-1 max-w-[200px] w-full rounded-xl p-4 text-center shadow-sm"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <span className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
              주문 서비스
            </span>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0 px-2 w-full md:w-auto" style={{ color: '#f43f5e' }}>
            <span className="text-xs font-bold mb-1">직접 호출 (동기)</span>
            <svg className="w-6 h-6 shrink-0 animate-pulse hidden md:block" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            <svg className="w-6 h-6 shrink-0 animate-pulse md:hidden" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>

          <div className="flex-1 max-w-[280px] w-full rounded-xl p-4 text-center shadow-sm relative"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}>
            <span className="font-extrabold text-sm block mb-2" style={{ color: 'var(--text-primary)' }}>
              로깅 서비스
            </span>
            <span className="text-xs font-semibold px-2 py-1 rounded"
              style={{ color: '#f43f5e', background: 'rgba(244,63,94,0.08)' }}>
              장애 발생 시 주문 마비 💥
            </span>
          </div>

        </div>
      </div>

      {/* 2. Pub/Sub 이벤트 방식 */}
      <div>
        <h4 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="px-2.5 py-1 rounded-md text-xs tracking-wider"
            style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981' }}>TO-BE</span>
          이벤트 기반 아키텍처 (Pub/Sub)
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 rounded-xl relative"
          style={{ border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
          
          {/* 발행자 */}
          <div className="flex-1 max-w-[200px] w-full rounded-xl p-4 text-center shadow-sm"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <span className="text-xs font-bold mb-1.5 block" style={{ color: '#3b82f6' }}>Publisher</span>
            <span className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
              주문 서비스
            </span>
          </div>

          {/* Arrow 1 */}
          <div className="flex flex-col items-center justify-center shrink-0 px-2 w-full md:w-auto" style={{ color: '#10b981' }}>
            <span className="text-xs font-bold mb-1">이벤트 던짐</span>
            <svg className="w-6 h-6 shrink-0 hidden md:block" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            <svg className="w-6 h-6 shrink-0 md:hidden" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>

          {/* Event Bus */}
          <div className="flex-1 max-w-[200px] w-full rounded-xl p-4 text-center shadow-sm"
            style={{ background: 'rgba(113,113,122,0.08)', border: '1px solid rgba(113,113,122,0.2)' }}>
            <span className="font-extrabold text-sm flex items-center justify-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 block shrink-0" style={{ color: '#6366f1' }}>
                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Event Bus
            </span>
            <span className="text-xs font-semibold mt-1 block" style={{ color: 'var(--text-secondary)' }}>
              ApplicationEventPublisher
            </span>
          </div>

          {/* Arrow 2 */}
          <div className="flex flex-col items-center justify-center shrink-0 px-2 w-full md:w-auto" style={{ color: '#10b981' }}>
            <span className="text-xs font-bold mb-1">비동기 배달</span>
            <svg className="w-6 h-6 shrink-0 hidden md:block" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            <svg className="w-6 h-6 shrink-0 md:hidden" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>

          {/* 구독자 */}
          <div className="flex-1 max-w-[280px] w-full rounded-xl p-4 text-center shadow-sm relative"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <span className="text-xs font-bold mb-1.5 block" style={{ color: '#10b981' }}>Subscriber</span>
            <span className="font-extrabold text-sm block mb-2" style={{ color: 'var(--text-primary)' }}>
              로깅 서비스
            </span>
            <span className="text-xs font-semibold px-2 py-1 rounded"
              style={{ color: '#10b981', background: 'rgba(16,185,129,0.08)' }}>
              장애 발생 시 격리 🛡️
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
