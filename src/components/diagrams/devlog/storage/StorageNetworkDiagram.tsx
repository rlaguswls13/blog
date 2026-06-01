"use client";
import React from "react";
import { Icons } from "@/components/diagrams/DiagramIcons";

/* ===== Inline style helpers using CSS Variables ===== */
const S = {
  heading: { color: 'var(--diagram-text-heading)' } as React.CSSProperties,
  text: { color: 'var(--diagram-text-primary)' } as React.CSSProperties,
  muted: { color: 'var(--diagram-text-muted)' } as React.CSSProperties,
  secondary: { color: 'var(--diagram-text-secondary)' } as React.CSSProperties,
  card: {
    background: 'var(--diagram-card-bg)',
    border: '1px solid var(--diagram-card-border)',
    boxShadow: 'var(--diagram-card-shadow)',
  } as React.CSSProperties,
  innerBox: {
    background: 'var(--diagram-badge-bg)',
    border: '1px solid var(--diagram-badge-border)',
  } as React.CSSProperties,
  specRow: {
    background: 'var(--diagram-badge-bg)',
    border: '1px solid var(--diagram-badge-border)',
  } as React.CSSProperties,
  progressTrack: {
    background: 'var(--diagram-progress-track)',
  } as React.CSSProperties,
  banner: (accentBg: string) => ({
    background: accentBg,
    border: '1px solid var(--diagram-card-border)',
    boxShadow: 'var(--diagram-soft-shadow)',
  } as React.CSSProperties),
};

/* Accent color definitions (theme-independent) */
const ACCENT = {
  amber: { color: '#f59e0b', light: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  emerald: { color: '#10b981', light: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
  rose: { color: '#f43f5e', light: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.25)' },
  indigo: { color: '#6366f1', light: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)' },
};

function Badge({ children, accent }: { children: React.ReactNode; accent: typeof ACCENT.amber }) {
  return (
    <span
      className="text-xs font-bold px-3 py-1 rounded-full"
      style={{ background: accent.light, color: accent.color, border: `1px solid ${accent.border}` }}
    >
      {children}
    </span>
  );
}

function ProgressBar({ label, value, accent, labelRight }: { label: string; value: string; accent: string; labelRight: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span style={S.secondary}>{label}</span>
        <span className="font-bold" style={{ color: accent }}>{labelRight}</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={S.progressTrack}>
        <div className="h-1.5 rounded-full" style={{ width: value, background: accent }} />
      </div>
    </div>
  );
}

function NetNode({ children, borderColor, bg, isSolid }: { children: React.ReactNode; borderColor: string; bg?: string; isSolid?: boolean }) {
  const style: React.CSSProperties = isSolid
    ? { background: bg || borderColor, color: '#ffffff' }
    : { background: 'var(--diagram-card-bg)', border: `2px solid ${borderColor}` };
  return (
    <div className="px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2 justify-center" style={style}>
      {children}
    </div>
  );
}

export function StorageNetworkDiagram() {
  return (
    <>
      <style>{`
        @keyframes flow-fast { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
        .data-flow-fast { stroke-dasharray: 8, 4; animation: flow-fast 0.6s linear infinite; }
        @keyframes flow-mid { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
        .data-flow-mid { stroke-dasharray: 6, 4; animation: flow-mid 1.2s linear infinite; }
        @keyframes flow-slow { 0% { stroke-dashoffset: 30; } 100% { stroke-dashoffset: 0; } }
        .data-flow-slow { stroke-dasharray: 4, 4; animation: flow-slow 2.5s linear infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
      `}</style>

      <div className="w-full mt-6 font-sans" style={S.heading}>
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
          {/* Banner */}
          <div className="rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6" style={{ ...S.card, background: ACCENT.indigo.light }}>
            <div className="space-y-1">
              <h2 className="text-lg font-bold" style={S.heading}>사용 목적에 따른 네트워크 스토리지 아키텍처 비교</h2>
              <p className="text-sm" style={S.secondary}>데이터가 장치 간에 수송되는 범위와 토폴로지에 따라 다르게 구축되는 엔터프라이즈 환경별 아키텍처 정보입니다.</p>
            </div>
            <div className="flex gap-2">
              {['DAS: 단독 전용', 'NAS: 범용 파일 공유', 'SAN: 고속 저장망'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-medium" style={{ background: 'var(--diagram-card-bg)', color: 'var(--diagram-text-primary)', border: '1px solid var(--diagram-card-border)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Network Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* DAS */}
            <div className="rounded-3xl p-6 flex flex-col justify-between" style={S.card}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge accent={ACCENT.rose}>1대1 직결 전송</Badge>
                  <h3 className="text-xl font-bold" style={S.heading}>DAS</h3>
                </div>
                <p className="text-[10px] mb-6 uppercase tracking-wider font-semibold" style={S.muted}>Direct Attached Storage</p>
                <div className="rounded-2xl p-4 flex flex-col items-center justify-center h-48 relative mb-6" style={{ background: ACCENT.rose.light }}>
                  <div className="flex flex-col items-center z-10">
                    <NetNode borderColor={ACCENT.rose.color}>
                      <Icons.ServerRack className="w-4 h-4" style={{ color: ACCENT.rose.color }} />
                      <span className="text-xs font-bold" style={S.heading}>서버 (Server)</span>
                    </NetNode>
                    <svg className="h-16 w-32 my-1" viewBox="0 0 100 60">
                      <line x1="50" y1="0" x2="50" y2="60" stroke={ACCENT.rose.color} strokeWidth="3" opacity="0.3" />
                      <line x1="50" y1="0" x2="50" y2="60" stroke={ACCENT.rose.color} strokeWidth="3" className="data-flow-fast" />
                    </svg>
                    <NetNode borderColor={ACCENT.rose.color} bg={ACCENT.rose.color} isSolid>
                      <Icons.DatabaseStack className="w-4 h-4" />
                      <span className="text-xs font-bold">전용 스토리지</span>
                    </NetNode>
                  </div>
                  <span className="absolute right-4 bottom-4 text-[9px] font-mono px-2 py-0.5 rounded" style={{ color: ACCENT.rose.color, background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.rose.border}` }}>SATA / SAS / SCSI</span>
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={S.text}>스토리지 유닛을 서버에 일 대 일 케이블로 바로 도킹하여 운용합니다. 단일 제어에서 극속 효율을 올리기 용이하지만 자원 공유에는 부적절합니다.</p>
              </div>
              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid var(--diagram-card-border)' }}>
                <ProgressBar label="속도 및 지연율" value="95%" accent={ACCENT.rose.color} labelRight="극도로 빠름" />
                <ProgressBar label="자원 공유 및 확장성" value="25%" accent={ACCENT.rose.color} labelRight="미비" />
              </div>
            </div>

            {/* NAS */}
            <div className="rounded-3xl p-6 flex flex-col justify-between" style={S.card}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge accent={ACCENT.emerald}>이더넷 네트워크 파일 공유</Badge>
                  <h3 className="text-xl font-bold" style={S.heading}>NAS</h3>
                </div>
                <p className="text-[10px] mb-6 uppercase tracking-wider font-semibold" style={S.muted}>Network Attached Storage</p>
                <div className="rounded-2xl p-4 flex flex-col items-center justify-center h-48 relative mb-6" style={{ background: ACCENT.emerald.light }}>
                  <div className="flex flex-col items-center w-full z-10">
                    <div className="flex space-x-3 mb-2">
                      <div className="px-2 py-1 rounded shadow-sm text-[9px] font-semibold" style={{ background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.emerald.border}`, ...S.heading }}>PC A Client</div>
                      <div className="px-2 py-1 rounded shadow-sm text-[9px] font-semibold" style={{ background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.emerald.border}`, ...S.heading }}>PC B Client</div>
                    </div>
                    <svg className="h-6 w-full" viewBox="0 0 200 30">
                      <path d="M 55,0 L 55,15 L 145,15 L 145,0 M 100,15 L 100,30" fill="none" stroke={ACCENT.emerald.color} strokeWidth="2" opacity="0.3" />
                      <path d="M 55,0 L 55,15 L 145,15 L 145,0 M 100,15 L 100,30" fill="none" stroke={ACCENT.emerald.color} strokeWidth="2" className="data-flow-mid" />
                    </svg>
                    <NetNode borderColor={ACCENT.emerald.color}>
                      <span className="text-[10px] font-bold" style={S.heading}>LAN (공유 스위치)</span>
                    </NetNode>
                    <svg className="h-6 w-full" viewBox="0 0 200 30">
                      <line x1="100" y1="0" x2="100" y2="30" stroke={ACCENT.emerald.color} strokeWidth="2" opacity="0.3" />
                      <line x1="100" y1="0" x2="100" y2="30" stroke={ACCENT.emerald.color} strokeWidth="2" className="data-flow-mid" />
                    </svg>
                    <NetNode borderColor={ACCENT.emerald.color} bg={ACCENT.emerald.color} isSolid>
                      <Icons.ServerNAS className="w-4 h-4" />
                      <span className="text-xs font-bold">NAS 파일 서버</span>
                    </NetNode>
                  </div>
                  <span className="absolute right-4 bottom-4 text-[9px] font-mono px-2 py-0.5 rounded" style={{ color: ACCENT.emerald.color, background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.emerald.border}` }}>NFS / SMB / CIFS</span>
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={S.text}>이더넷 LAN 위에 단독 운영 체제 기반의 저장장치를 마운트하는 형태입니다. 네트워크망 내 단말들이 자유로이 문서를 공유합니다.</p>
              </div>
              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid var(--diagram-card-border)' }}>
                <ProgressBar label="속도 및 지연율" value="60%" accent={ACCENT.emerald.color} labelRight="중간 (망 트래픽 의존적)" />
                <ProgressBar label="자원 공유 및 확장성" value="85%" accent={ACCENT.emerald.color} labelRight="우수" />
              </div>
            </div>

            {/* SAN */}
            <div className="rounded-3xl p-6 flex flex-col justify-between" style={S.card}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge accent={ACCENT.indigo}>고성능 전용 네트워크</Badge>
                  <h3 className="text-xl font-bold" style={S.heading}>SAN</h3>
                </div>
                <p className="text-[10px] mb-6 uppercase tracking-wider font-semibold" style={S.muted}>Storage Area Network</p>
                <div className="rounded-2xl p-4 flex flex-col items-center justify-center h-48 relative mb-6" style={{ background: ACCENT.indigo.light }}>
                  <div className="flex flex-col items-center w-full z-10">
                    <div className="flex space-x-3 mb-2">
                      <div className="px-2 py-1 rounded shadow-sm text-[9px] font-semibold" style={{ background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.indigo.border}`, ...S.heading }}>Server A Node</div>
                      <div className="px-2 py-1 rounded shadow-sm text-[9px] font-semibold" style={{ background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.indigo.border}`, ...S.heading }}>Server B Node</div>
                    </div>
                    <svg className="h-6 w-full" viewBox="0 0 200 30">
                      <path d="M 55,0 L 55,15 L 145,15 L 145,0 M 100,15 L 100,30" fill="none" stroke={ACCENT.indigo.color} strokeWidth="2" opacity="0.3" />
                      <path d="M 55,0 L 55,15 L 145,15 L 145,0 M 100,15 L 100,30" fill="none" stroke={ACCENT.indigo.color} strokeWidth="2" className="data-flow-fast" />
                    </svg>
                    <NetNode borderColor={ACCENT.indigo.color}>
                      <span className="text-[10px] font-bold" style={S.heading}>SAN 스위치 (FC/iSCSI)</span>
                    </NetNode>
                    <svg className="h-6 w-full" viewBox="0 0 200 30">
                      <line x1="100" y1="0" x2="100" y2="30" stroke={ACCENT.indigo.color} strokeWidth="2" opacity="0.3" />
                      <line x1="100" y1="0" x2="100" y2="30" stroke={ACCENT.indigo.color} strokeWidth="2" className="data-flow-fast" />
                    </svg>
                    <NetNode borderColor={ACCENT.indigo.color} bg={ACCENT.indigo.color} isSolid>
                      <Icons.DatabaseStack className="w-4 h-4" />
                      <span className="text-xs font-bold">스토리지 풀 (Block)</span>
                    </NetNode>
                  </div>
                  <span className="absolute right-4 bottom-4 text-[9px] font-mono px-2 py-0.5 rounded" style={{ color: ACCENT.indigo.color, background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.indigo.border}` }}>Fibre Channel / iSCSI</span>
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={S.text}>서버와 저장 장치들만 연결하는 고속 전용 광 네트워크를 따로 구성하는 최고급 아키텍처입니다.</p>
              </div>
              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid var(--diagram-card-border)' }}>
                <ProgressBar label="속도 및 지연율" value="100%" accent={ACCENT.indigo.color} labelRight="최상 (광 전용망)" />
                <ProgressBar label="자원 공유 및 확장성" value="95%" accent={ACCENT.indigo.color} labelRight="최상 (자유로운 제어)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
