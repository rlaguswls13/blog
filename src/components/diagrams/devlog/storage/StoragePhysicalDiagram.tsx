"use client";
import React, { useState } from "react";

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

function SpecTable({ rows }: { rows: { label: string; value: string; accent?: string }[] }) {
  return (
    <div className="p-3 rounded-2xl text-xs space-y-1.5" style={S.specRow}>
      {rows.map((r, i) => (
        <div key={i} className="flex justify-between">
          <span style={S.muted}>{r.label}</span>
          <span className="font-semibold" style={{ color: r.accent || 'var(--diagram-text-primary)' }}>{r.value}</span>
        </div>
      ))}
    </div>
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

function SimProgressBar({ label, accent, pct }: { label: string; accent: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold mb-2">
        <span style={{ color: accent }}>{label}</span>
        <span style={S.secondary}>{pct === 100 ? '완료' : pct > 0 ? `${Math.round(pct)}%` : '대기 중'}</span>
      </div>
      <div className="w-full h-3 rounded-full overflow-hidden" style={S.progressTrack}>
        <div className="h-3 transition-all duration-100" style={{ width: `${pct}%`, background: accent }} />
      </div>
    </div>
  );
}

export function StoragePhysicalDiagram() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState({ nvme: 0, sata: 0, hdd: 0 });

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setProgress({ nvme: 0, sata: 0, hdd: 0 });
    const interval = 50;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextNvme = Math.min(100, prev.nvme + (100 / (150 / interval)));
        const nextSata = Math.min(100, prev.sata + (100 / (1500 / interval)));
        const nextHdd = Math.min(100, prev.hdd + (100 / (5000 / interval)));
        if (nextNvme === 100 && nextSata === 100 && nextHdd === 100) {
          clearInterval(timer);
          setIsSimulating(false);
        }
        return { nvme: nextNvme, sata: nextSata, hdd: nextHdd };
      });
    }, interval);
  };

  return (
    <>
      <style>{`
        @keyframes flow-fast { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
        .data-flow-fast { stroke-dasharray: 8, 4; animation: flow-fast 0.6s linear infinite; }
        @keyframes flow-mid { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
        .data-flow-mid { stroke-dasharray: 6, 4; animation: flow-mid 1.2s linear infinite; }
        @keyframes flow-slow { 0% { stroke-dashoffset: 30; } 100% { stroke-dashoffset: 0; } }
        .data-flow-slow { stroke-dasharray: 4, 4; animation: flow-slow 2.5s linear infinite; }
        @keyframes spin-platter { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animated-platter { transform-origin: 50px 50px; animation: spin-platter 4s linear infinite; }
        @keyframes sweep-arm { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(6deg); } }
        .animated-arm { transform-origin: 85px 15px; animation: sweep-arm 1.8s ease-in-out infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
      `}</style>

      <div className="w-full mt-6 font-sans" style={S.heading}>
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
          {/* Banner */}
          <div className="rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6" style={{ ...S.card, background: ACCENT.indigo.light }}>
            <div className="space-y-1">
              <h2 className="text-lg font-bold" style={S.heading}>하드웨어 단에서 보는 물리적 저장 매체 구분</h2>
              <p className="text-sm" style={S.secondary}>메인보드 인터페이스 규격과 내부 작동 메커니즘에 따른 하드웨어 장치별 심층 분석 정보입니다.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['M.2 NVMe: 극속 처리', 'SATA SSD: 범용 플래시', 'HDD: 고용량 아카이브'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-medium" style={{ background: 'var(--diagram-card-bg)', color: 'var(--diagram-text-primary)', border: '1px solid var(--diagram-card-border)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* NVMe */}
            <div className="rounded-3xl p-6 flex flex-col justify-between" style={S.card}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge accent={ACCENT.amber}>PCIe 초고속 버스</Badge>
                  <h3 className="text-xl font-bold" style={S.heading}>M.2 NVMe SSD</h3>
                </div>
                <p className="text-[10px] mb-6 uppercase tracking-wider font-semibold" style={S.muted}>Non-Volatile Memory Express</p>
                <div className="rounded-2xl p-4 flex flex-col items-center justify-center h-48 relative mb-6" style={S.innerBox}>
                  <svg className="h-32 w-52" viewBox="0 0 200 120" fill="none">
                    <rect x="30" y="45" width="140" height="30" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <rect x="25" y="52" width="5" height="16" fill="#f59e0b" />
                    <line x1="25" y1="55" x2="29" y2="55" stroke="#f59e0b" strokeWidth="1.5" /><line x1="25" y1="59" x2="29" y2="59" stroke="#f59e0b" strokeWidth="1.5" /><line x1="25" y1="63" x2="29" y2="63" stroke="#f59e0b" strokeWidth="1.5" /><line x1="25" y1="67" x2="29" y2="67" stroke="#f59e0b" strokeWidth="1.5" />
                    <rect x="55" y="54" width="12" height="12" fill="#d97706" opacity="0.8" />
                    <rect x="85" y="49" width="30" height="22" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <rect x="125" y="49" width="30" height="22" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <path d="M 10,75 L 190,75" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                    <path d="M 10,75 L 190,75" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" className="data-flow-fast" />
                  </svg>
                  <span className="absolute right-4 bottom-4 text-[9px] font-mono px-2 py-0.5 rounded" style={{ color: ACCENT.amber.color, background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.amber.border}` }}>PCIe x4 Lanes Direct</span>
                </div>
                <div className="space-y-4 mb-6">
                  <p className="text-sm leading-relaxed" style={S.text}>CPU 버스(PCIe)에 컨트롤러가 병목 없이 직접 통신하는 초고속 플래시 스토리지 방식입니다.</p>
                  <SpecTable rows={[
                    { label: '인터페이스', value: 'PCIe Gen4 / Gen5' },
                    { label: '최대 대역폭', value: '3,500 ~ 7,500+ MB/s', accent: ACCENT.amber.color },
                    { label: '평균 지연율', value: '10~30 µs (극저지연)' },
                  ]} />
                </div>
              </div>
              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid var(--diagram-card-border)' }}>
                <ProgressBar label="순차 읽기/쓰기 성능" value="100%" accent={ACCENT.amber.color} labelRight="최상 (100%)" />
                <ProgressBar label="GB당 가성비" value="45%" accent={ACCENT.amber.color} labelRight="중간 (기본 단가 높음)" />
              </div>
            </div>

            {/* SATA SSD */}
            <div className="rounded-3xl p-6 flex flex-col justify-between" style={S.card}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge accent={ACCENT.emerald}>SATA III 범용 전송</Badge>
                  <h3 className="text-xl font-bold" style={S.heading}>SATA SSD</h3>
                </div>
                <p className="text-[10px] mb-6 uppercase tracking-wider font-semibold" style={S.muted}>Solid State Drive (2.5 Inch)</p>
                <div className="rounded-2xl p-4 flex flex-col items-center justify-center h-48 relative mb-6" style={S.innerBox}>
                  <svg className="h-32 w-52" viewBox="0 0 200 120" fill="none">
                    <rect x="50" y="25" width="100" height="70" rx="6" fill="#334155" stroke="#475569" strokeWidth="2" />
                    <rect x="56" y="31" width="88" height="58" rx="3" fill="#1e293b" />
                    <path d="M 62,40 L 138,40" stroke="#475569" strokeWidth="1.5" />
                    <rect x="62" y="50" width="25" height="15" rx="1" fill="#64748b" opacity="0.7" />
                    <rect x="130" y="93" width="12" height="4" fill="#cbd5e1" />
                    <rect x="110" y="93" width="16" height="4" fill="#cbd5e1" />
                    <path d="M 10,105 L 190,105" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                    <path d="M 10,105 L 190,105" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" className="data-flow-mid" />
                  </svg>
                  <span className="absolute right-4 bottom-4 text-[9px] font-mono px-2 py-0.5 rounded" style={{ color: ACCENT.emerald.color, background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.emerald.border}` }}>SATA 6 Gbps Cap</span>
                </div>
                <div className="space-y-4 mb-6">
                  <p className="text-sm leading-relaxed" style={S.text}>낸드 플래시 소자를 사용하나 SATA III 인터페이스 규격에 연결하므로 물리적 속도 상한선이 제한됩니다.</p>
                  <SpecTable rows={[
                    { label: '인터페이스', value: 'SATA III' },
                    { label: '최대 대역폭', value: '500 ~ 600 MB/s', accent: ACCENT.emerald.color },
                    { label: '평균 지연율', value: '80~150 µs' },
                  ]} />
                </div>
              </div>
              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid var(--diagram-card-border)' }}>
                <ProgressBar label="순차 읽기/쓰기 성능" value="55%" accent={ACCENT.emerald.color} labelRight="보통 (55%)" />
                <ProgressBar label="GB당 가성비" value="75%" accent={ACCENT.emerald.color} labelRight="우수 (대중적 가격대)" />
              </div>
            </div>

            {/* HDD */}
            <div className="rounded-3xl p-6 flex flex-col justify-between" style={S.card}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Badge accent={ACCENT.rose}>자성 회전 플래터</Badge>
                  <h3 className="text-xl font-bold" style={S.heading}>HDD</h3>
                </div>
                <p className="text-[10px] mb-6 uppercase tracking-wider font-semibold" style={S.muted}>Hard Disk Drive</p>
                <div className="rounded-2xl p-4 flex flex-col items-center justify-center h-48 relative mb-6" style={S.innerBox}>
                  <svg className="h-32 w-52" viewBox="0 0 200 120" fill="none">
                    <rect x="55" y="15" width="90" height="90" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <rect x="61" y="21" width="78" height="78" rx="4" fill="#0f172a" />
                    <g className="animated-platter">
                      <circle cx="50" cy="50" r="35" fill="url(#platter-grad)" stroke="#64748b" strokeWidth="1.5" />
                      <circle cx="50" cy="50" r="8" fill="#020617" />
                      <line x1="50" y1="15" x2="50" y2="25" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" />
                      <line x1="50" y1="75" x2="50" y2="85" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" />
                      <line x1="15" y1="50" x2="25" y2="50" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" />
                      <line x1="75" y1="50" x2="85" y2="50" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" />
                    </g>
                    <g className="animated-arm">
                      <circle cx="85" cy="15" r="5" fill="#94a3b8" />
                      <path d="M 85,15 L 45,45 L 38,48" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                      <rect x="36" y="46" width="4" height="4" fill="#f43f5e" />
                    </g>
                    <defs><radialGradient id="platter-grad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#94a3b8" /><stop offset="85%" stopColor="#475569" /><stop offset="100%" stopColor="#334155" /></radialGradient></defs>
                    <path d="M 10,112 L 190,112" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                    <path d="M 10,112 L 190,112" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" className="data-flow-slow" />
                  </svg>
                  <span className="absolute right-4 bottom-4 text-[9px] font-mono px-2 py-0.5 rounded" style={{ color: ACCENT.rose.color, background: 'var(--diagram-card-bg)', border: `1px solid ${ACCENT.rose.border}` }}>SATA Connection / Platters</span>
                </div>
                <div className="space-y-4 mb-6">
                  <p className="text-sm leading-relaxed" style={S.text}>물리적으로 회전하는 플래터와 헤드 암을 제어하여 데이터를 쓰고 읽는 구형 자기식 드라이브입니다.</p>
                  <SpecTable rows={[
                    { label: '인터페이스', value: 'SATA III' },
                    { label: '최대 대역폭', value: '100 ~ 250 MB/s', accent: ACCENT.rose.color },
                    { label: '평균 지연율', value: '5,000 ~ 15,000 µs' },
                  ]} />
                </div>
              </div>
              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid var(--diagram-card-border)' }}>
                <ProgressBar label="순차 읽기/쓰기 성능" value="15%" accent={ACCENT.rose.color} labelRight="극히 낮음 (15%)" />
                <ProgressBar label="GB당 가성비" value="100%" accent={ACCENT.rose.color} labelRight="최상 (압도적 보관 가성비)" />
              </div>
            </div>
          </div>

          {/* Simulation */}
          <div className="rounded-3xl p-6" style={S.card}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold" style={S.heading}>실제 10GB 용량 파일 전송 체감 시뮬레이터</h3>
                <p className="text-xs" style={S.secondary}>저장 매체 규격 대역폭에 비례한 실시간 복사 소요 시간을 직접 비교 대조해 볼 수 있습니다.</p>
              </div>
              <button onClick={startSimulation} disabled={isSimulating}
                className={`${isSimulating ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'} text-white font-bold px-6 py-2.5 rounded-2xl transition shadow-md duration-200`}
                style={{ background: '#6366f1' }}>
                {isSimulating ? '시뮬레이션 진행중...' : '전송 시뮬레이션 구동'}
              </button>
            </div>
            <div className="space-y-6">
              <SimProgressBar label="M.2 NVMe SSD (동작 대역폭 약 7,000 MB/s)" accent={ACCENT.amber.color} pct={progress.nvme} />
              <SimProgressBar label="SATA SSD (동작 대역폭 약 500 MB/s)" accent={ACCENT.emerald.color} pct={progress.sata} />
              <SimProgressBar label="HDD (동작 대역폭 약 150 MB/s)" accent={ACCENT.rose.color} pct={progress.hdd} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
