/**
 * Shared sub-components for project architecture diagrams.
 * All project diagrams follow a consistent two-column layout with header, flow cards, and footer.
 */
import React from "react";

// ===== Styles =====
const S = {
  wrapper: { maxWidth: 900, width: "100%", background: "#fff", borderRadius: 24, boxShadow: "0 25px 50px rgba(0,0,0,0.12)", overflow: "hidden", border: "1px solid #e2e8f0" } as React.CSSProperties,
  header: (bg?: string) => ({ background: bg || "#0f172a", padding: 32, textAlign: "center" as const }),
  headerTitle: { fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 8, borderBottom: "none" } as React.CSSProperties,
  headerDesc: { color: "#94a3b8", fontWeight: 500, margin: 0 } as React.CSSProperties,
  body: { padding: "32px 48px" } as React.CSSProperties,
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 } as React.CSSProperties,
  arrow: { display: "flex", justifyContent: "center", height: 40, alignItems: "center", color: "#cbd5e1", fontSize: 24 } as React.CSSProperties,
  sectionTitle: (color: string) => ({ color, fontWeight: 700, fontSize: "1.1rem", marginBottom: 16 } as React.CSSProperties),
  footerGrid: { padding: "0 48px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 } as React.CSSProperties,
};

// ===== Sub-components =====

export function DiagramWrapper({ children }: { children: React.ReactNode }) {
  return <div className="diagram-container"><div style={S.wrapper}>{children}</div></div>;
}

export function DiagramHeader({ title, desc, bg }: { title: string; desc: string; bg?: string }) {
  return (
    <div style={S.header(bg)}>
      <h2 style={S.headerTitle}>{title}</h2>
      <p style={S.headerDesc}>{desc}</p>
    </div>
  );
}

export function DiagramBody({ children }: { children: React.ReactNode }) {
  return <div style={S.body}>{children}</div>;
}

export function TwoColumnGrid({ children }: { children: React.ReactNode }) {
  return <div style={S.grid2}>{children}</div>;
}

export function SectionTitle({ icon, label, color }: { icon: string; label: string; color: string }) {
  return <h3 style={S.sectionTitle(color)}>{icon} {label}</h3>;
}

export function FlowCard({ bg, gradBg, border, title, desc, light, titleColor }: {
  bg?: string; gradBg?: string; border?: string; title: string; desc: string; light?: boolean; titleColor?: string;
}) {
  return (
    <div style={{ padding: 20, background: gradBg || bg || "#f8f8f8", border: `1px solid ${border || "#e2e8f0"}`, borderRadius: 16, display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 48, height: 48, background: light ? "rgba(255,255,255,0.2)" : (bg || "#eee"), borderRadius: 12, flexShrink: 0 }} />
      <div>
        <h4 style={{ fontWeight: 700, color: light ? "#fff" : (titleColor || "#1e293b"), margin: 0, fontSize: "0.95rem" }}>{title}</h4>
        <p style={{ fontSize: 12, color: light ? "rgba(255,255,255,0.7)" : "#64748b", margin: "4px 0 0", lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
}

export function Arrow() {
  return <div style={S.arrow}>↓</div>;
}

export function LayerBox({ label, title, color, children }: { label: string; title: string; color: string; children: React.ReactNode }) {
  const c = colorMap[color] || colorMap.violet;
  return (
    <div style={{ position: "relative", padding: 24, background: c.bg, border: `2px solid ${c.border}`, borderRadius: 24 }}>
      <div style={{ position: "absolute", top: -12, left: 24, background: c.border, color: "#fff", fontSize: 10, padding: "4px 12px", borderRadius: 12, fontWeight: 700, textTransform: "uppercase" }}>{label}</div>
      <h4 style={{ fontWeight: 700, color: c.text, marginBottom: 16 }}>{title}</h4>
      {children}
    </div>
  );
}

export function LayerItem({ label, desc, badge, color }: { label: string; desc: string; badge: string; color?: string }) {
  const c = colorMap[color || "violet"] || colorMap.violet;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "#fff", borderRadius: 12, border: `1px solid ${c.bg}`, marginBottom: 8 }}>
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: c.text, margin: 0 }}>{label}</p>
        <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{desc}</p>
      </div>
      <span style={{ fontSize: 10, fontWeight: 900, color: c.border, background: c.bg, padding: "4px 8px", borderRadius: 4, whiteSpace: "nowrap" }}>{badge}</span>
    </div>
  );
}

export function ResultBox({ text }: { text: string }) {
  return (
    <div style={{ padding: 20, background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 16, textAlign: "center" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: "#64748b", fontStyle: "italic", margin: 0 }}>{text}</p>
    </div>
  );
}

export function FooterGrid({ items }: { items: { color: string; bg: string; title: string; desc: string }[] }) {
  return (
    <div style={S.footerGrid}>
      {items.map((item, i) => (
        <div key={i} style={{ padding: 24, background: item.bg, borderRadius: 16 }}>
          <h4 style={{ color: item.color, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 4 }}>{item.title}</h4>
          <p style={{ fontSize: 12, color: "#1e293b", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  violet: { bg: "#f5f3ff", border: "#7c3aed", text: "#4c1d95" },
  amber: { bg: "#fffbeb", border: "#f59e0b", text: "#78350f" },
  rose: { bg: "#fff1f2", border: "#f43f5e", text: "#881337" },
  cyan: { bg: "#ecfeff", border: "#06b6d4", text: "#164e63" },
  indigo: { bg: "#eef2ff", border: "#4f46e5", text: "#312e81" },
  emerald: { bg: "#ecfdf5", border: "#10b981", text: "#064e3b" },
  fuchsia: { bg: "#fdf4ff", border: "#d946ef", text: "#701a75" },
  slate: { bg: "#f1f5f9", border: "#64748b", text: "#1e293b" },
};
