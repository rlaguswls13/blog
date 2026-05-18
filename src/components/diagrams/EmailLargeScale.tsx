"use client";

export function EmailLargeScale() {
  return (
    <div className="diagram-container">
      <div style={{ maxWidth: 900, width: "100%", background: "#fff", borderRadius: 24, boxShadow: "0 25px 50px rgba(0,0,0,0.12)", overflow: "hidden", border: "1px solid #e2e8f0" }}>
        <div style={{ background: "#0f172a", padding: "32px", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 8, borderBottom: "none" }}>대규모 이메일 커스텀 발송 아키텍처</h2>
          <p style={{ color: "#94a3b8", fontWeight: 500, margin: 0 }}>대용량 청구서 파일 병목 해결 및 GC 메모리 최적화 체계</p>
        </div>
        <div style={{ padding: "32px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h3 style={{ color: "#4f46e5", fontWeight: 700, fontSize: "1.1rem", marginBottom: 16 }}>📡 대용량 첨부파일 처리 프로세스</h3>
            <FlowCard bg="#eef2ff" border="#c7d2fe" iconBg="#4f46e5" title="Large-Scale Data Input" desc="대규모 결재 내역 및 대용량 청구서 첨부" />
            <Arrow />
            <FlowCard bg="linear-gradient(135deg, #4f46e5, #7c3aed)" border="transparent" iconBg="rgba(255,255,255,0.2)" title="Custom Dispatch Engine" desc="Java Segment Block 방식 특화 아키텍처" light />
            <Arrow />
            <FlowCard bg="#1e293b" border="#334155" iconBg="#334155" title="High-Availability Server" desc="STABLE_DISPATCH_QUEUE" light />
          </div>
          <div>
            <h3 style={{ color: "#e11d48", fontWeight: 700, fontSize: "1.1rem", marginBottom: 16 }}>🛡️ [Real-time] 시스템 과부하 방어 로직</h3>
            <FlowCard bg="#fff1f2" border="#fecdd3" iconBg="#fff" title="Resource Monitoring" desc="실시간 메모리 사용량 추적 및 통제" titleColor="#881337" />
            <Arrow />
            <div style={{ position: "relative", padding: 24, background: "#fffbeb", border: "2px solid #f59e0b", borderRadius: 24 }}>
              <div style={{ position: "absolute", top: -12, left: 24, background: "#f59e0b", color: "#fff", fontSize: 10, padding: "4px 12px", borderRadius: 12, fontWeight: 700, textTransform: "uppercase" as const }}>Optimization Layer</div>
              <h4 style={{ fontWeight: 700, color: "#78350f", marginBottom: 16 }}>Heap & GC Optimization</h4>
              <OptItem label="GC Policy Tuning" desc="효율적 객체 소멸 및 자원 회수" badge="APPLIED" />
              <OptItem label="Heap Allocation Refactoring" desc="Global/Static 변수 제거 및 참조 개선" badge="HOTFIX" />
            </div>
            <Arrow />
            <div style={{ padding: 20, background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 16, textAlign: "center" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#64748b", fontStyle: "italic", margin: 0 }}>🖥️ Shutdown 방지 및 Downtime 최소화 발송</p>
            </div>
          </div>
        </div>
        <div style={{ padding: "0 48px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <FooterBox color="#4f46e5" bg="#eef2ff" title="가용성 (Availability)" desc="특화 커스텀 설계로 대량 첨부 발송 시 안정적인 퍼포먼스 유지" />
          <FooterBox color="#d97706" bg="#fffbeb" title="자원 효율 (Efficiency)" desc="GC 튜닝 및 힙 메모리 참조 개선을 통해 시스템 과부하 완벽 방어" />
          <FooterBox color="#059669" bg="#ecfdf5" title="유지보수 (Maintainability)" desc="더미 데이터 생성 테스터 모듈 사전 연동으로 사전 검증 편의성 대폭 향상" />
        </div>
      </div>
    </div>
  );
}

function FlowCard({ bg, border, iconBg, title, desc, light, titleColor }: { bg: string; border: string; iconBg: string; title: string; desc: string; light?: boolean; titleColor?: string }) {
  const isGrad = bg.startsWith("linear");
  return (
    <div style={{ padding: 20, background: isGrad ? undefined : bg, backgroundImage: isGrad ? bg : undefined, border: `1px solid ${border}`, borderRadius: 16, display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 48, height: 48, background: iconBg, borderRadius: 12, flexShrink: 0 }} />
      <div>
        <h4 style={{ fontWeight: 700, color: light ? "#fff" : (titleColor || "#1e1b4b"), margin: 0, fontSize: "0.95rem" }}>{title}</h4>
        <p style={{ fontSize: 12, color: light ? "rgba(255,255,255,0.7)" : "#64748b", margin: "4px 0 0", lineHeight: 1.4 }}>{desc}</p>
      </div>
    </div>
  );
}

function Arrow() {
  return <div style={{ display: "flex", justifyContent: "center", height: 40, alignItems: "center", color: "#cbd5e1", fontSize: 24 }}>↓</div>;
}

function OptItem({ label, desc, badge }: { label: string; desc: string; badge: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "#fff", borderRadius: 12, border: "1px solid #fde68a", marginBottom: 8 }}>
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#78350f", margin: 0 }}>{label}</p>
        <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{desc}</p>
      </div>
      <span style={{ fontSize: 10, fontWeight: 900, color: "#d97706", background: "#fef3c7", padding: "4px 8px", borderRadius: 4 }}>{badge}</span>
    </div>
  );
}

function FooterBox({ color, bg, title, desc }: { color: string; bg: string; title: string; desc: string }) {
  return (
    <div style={{ padding: 24, background: bg, borderRadius: 16 }}>
      <h4 style={{ color, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase" as const, marginBottom: 4 }}>{title}</h4>
      <p style={{ fontSize: 12, color: "#1e293b", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>{desc}</p>
    </div>
  );
}
