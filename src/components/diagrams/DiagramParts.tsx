/**
 * Shared sub-components for project architecture diagrams.
 * All colors use CSS Variables (--diagram-*) from globals.css,
 * which respond to data-theme="light" / "dark" / future custom themes.
 *
 * Accent colors (violet, rose, emerald, etc.) are kept as Tailwind utilities
 * since they are theme-independent brand colors.
 */
import React from "react";

// ===== Accent Themes (brand colors — theme-independent) =====
export const themes: Record<string, {
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentBadgeBg: string;
  accentLight: string;
  gradFrom: string;
  gradTo: string;
}> = {
  violet:  { accentText: "#8b5cf6", accentBg: "#8b5cf6", accentBorder: "rgba(139,92,246,0.3)", accentBadgeBg: "rgba(139,92,246,0.1)", accentLight: "rgba(139,92,246,0.06)", gradFrom: "#8b5cf6", gradTo: "#6d28d9" },
  rose:    { accentText: "#f43f5e", accentBg: "#f43f5e", accentBorder: "rgba(244,63,94,0.3)",  accentBadgeBg: "rgba(244,63,94,0.1)",  accentLight: "rgba(244,63,94,0.06)",  gradFrom: "#f43f5e", gradTo: "#be123c" },
  emerald: { accentText: "#10b981", accentBg: "#10b981", accentBorder: "rgba(16,185,129,0.3)", accentBadgeBg: "rgba(16,185,129,0.1)", accentLight: "rgba(16,185,129,0.06)", gradFrom: "#10b981", gradTo: "#047857" },
  cyan:    { accentText: "#06b6d4", accentBg: "#06b6d4", accentBorder: "rgba(6,182,212,0.3)",  accentBadgeBg: "rgba(6,182,212,0.1)",  accentLight: "rgba(6,182,212,0.06)",  gradFrom: "#06b6d4", gradTo: "#0e7490" },
  fuchsia: { accentText: "#d946ef", accentBg: "#d946ef", accentBorder: "rgba(217,70,239,0.3)", accentBadgeBg: "rgba(217,70,239,0.1)", accentLight: "rgba(217,70,239,0.06)", gradFrom: "#d946ef", gradTo: "#a21caf" },
  blue:    { accentText: "#3b82f6", accentBg: "#3b82f6", accentBorder: "rgba(59,130,246,0.3)", accentBadgeBg: "rgba(59,130,246,0.1)", accentLight: "rgba(59,130,246,0.06)", gradFrom: "#3b82f6", gradTo: "#1d4ed8" },
  amber:   { accentText: "#f59e0b", accentBg: "#f59e0b", accentBorder: "rgba(245,158,11,0.3)", accentBadgeBg: "rgba(245,158,11,0.1)", accentLight: "rgba(245,158,11,0.06)", gradFrom: "#f59e0b", gradTo: "#b45309" },
  indigo:  { accentText: "#6366f1", accentBg: "#6366f1", accentBorder: "rgba(99,102,241,0.3)", accentBadgeBg: "rgba(99,102,241,0.1)", accentLight: "rgba(99,102,241,0.06)", gradFrom: "#6366f1", gradTo: "#4338ca" },
  slate:   { accentText: "var(--diagram-text-secondary)", accentBg: "var(--diagram-text-muted)", accentBorder: "var(--diagram-card-border)", accentBadgeBg: "var(--diagram-badge-bg)", accentLight: "var(--diagram-layer-bg)", gradFrom: "#64748b", gradTo: "#334155" },
};

// ===== Sub-components =====

export function DiagramWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full mt-8 mb-12 flex justify-center font-sans">
      <div
        className="max-w-[900px] w-full rounded-[24px] overflow-hidden transition-colors duration-300"
        style={{
          background: 'var(--diagram-bg)',
          border: '1px solid var(--diagram-wrapper-border)',
          boxShadow: 'var(--diagram-wrapper-shadow)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function DiagramHeader({ title, desc, theme = "slate" }: { title: string; desc: string; theme?: string }) {
  const t = themes[theme] || themes.slate;
  const isCustomTheme = theme !== "slate" && themes[theme];
  const gradStyle = isCustomTheme
    ? { background: `linear-gradient(135deg, ${t.gradFrom}, ${t.gradTo})` }
    : { background: 'var(--diagram-header-bg)' };

  return (
    <div
      className="p-8 text-center transition-colors duration-300"
      style={{ ...gradStyle, borderBottom: '1px solid var(--diagram-header-border)' }}
    >
      <h2
        className="text-2xl font-black mb-2 tracking-tight"
        style={{ color: isCustomTheme ? '#ffffff' : 'var(--diagram-text-heading)' }}
      >
        {title}
      </h2>
      <p
        className="font-medium text-sm m-0"
        style={{ color: isCustomTheme ? 'rgba(255,255,255,0.9)' : 'var(--diagram-text-secondary)' }}
      >
        {desc}
      </p>
    </div>
  );
}

export function DiagramBody({ children }: { children: React.ReactNode }) {
  return <div className="py-8 px-12">{children}</div>;
}

export function TwoColumnGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-12">{children}</div>;
}

export function SectionTitle({ icon, label, theme }: { icon: React.ReactNode; label: string; theme: string }) {
  const t = themes[theme] || themes.slate;
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg text-base"
        style={{
          background: t.accentBadgeBg,
          border: `1px solid ${t.accentBorder}`,
          color: t.accentText,
        }}
      >
        {icon}
      </div>
      <h3
        className="font-extrabold text-[17px] tracking-tight m-0"
        style={{ color: 'var(--diagram-text-heading)' }}
      >
        {label}
      </h3>
    </div>
  );
}

export function FlowCard({ theme = "slate", variant = "soft", title, desc }: {
  theme?: string; variant?: "soft" | "solid" | "dark"; title: string; desc: string;
}) {
  const t = themes[theme] || themes.slate;

  let cardStyle: React.CSSProperties = {};
  let titleStyle: React.CSSProperties = {};
  let descStyle: React.CSSProperties = {};
  let iconBoxStyle: React.CSSProperties = {};

  if (variant === "solid") {
    cardStyle = {
      background: `linear-gradient(135deg, ${t.gradFrom}, ${t.gradTo})`,
      border: '1px solid transparent',
      boxShadow: 'var(--diagram-card-shadow)',
    };
    titleStyle = { color: '#ffffff', fontWeight: 800 };
    descStyle = { color: 'rgba(255,255,255,0.9)' };
    iconBoxStyle = { background: 'rgba(255,255,255,0.2)', color: '#ffffff' };
  } else if (variant === "dark") {
    cardStyle = {
      background: 'var(--diagram-header-bg)',
      border: '1px solid var(--diagram-card-border)',
      boxShadow: 'var(--diagram-card-shadow)',
    };
    titleStyle = { color: 'var(--diagram-text-heading)', fontWeight: 800 };
    descStyle = { color: 'var(--diagram-text-secondary)' };
    iconBoxStyle = { background: 'var(--diagram-badge-bg)', color: 'var(--diagram-text-primary)' };
  } else {
    // soft
    cardStyle = {
      background: 'var(--diagram-card-bg)',
      border: `1px solid ${t.accentBorder}`,
      boxShadow: 'var(--diagram-soft-shadow)',
    };
    titleStyle = { color: 'var(--diagram-text-heading)', fontWeight: 700 };
    descStyle = { color: 'var(--diagram-text-secondary)' };
    iconBoxStyle = { background: t.accentBadgeBg, color: t.accentText, border: `1px solid ${t.accentBorder}` };
  }

  return (
    <div className="p-4 rounded-2xl flex items-center gap-4" style={cardStyle}>
      <div
        className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
        style={iconBoxStyle}
      />
      <div>
        <h4 className="m-0 text-[14px] leading-tight" style={titleStyle}>{title}</h4>
        <p className="text-[11px] m-0 mt-1 leading-relaxed" style={descStyle}>{desc}</p>
      </div>
    </div>
  );
}

export function Arrow() {
  return (
    <div
      className="flex justify-center items-center h-8 text-xl font-black"
      style={{ color: 'var(--diagram-arrow-color)' }}
    >
      ↓
    </div>
  );
}

export function LayerBox({ label, title, theme, children }: { label: string; title: string; theme: string; children: React.ReactNode }) {
  const t = themes[theme] || themes.slate;
  return (
    <div
      className="relative p-5 rounded-3xl"
      style={{
        background: t.accentLight,
        border: `2px solid ${t.accentBorder}`,
      }}
    >
      <div
        className="absolute -top-3 left-5 text-[10px] px-3 py-0.5 rounded-full font-extrabold uppercase"
        style={{
          background: t.accentBadgeBg,
          color: t.accentText,
          border: `1px solid ${t.accentBorder}`,
        }}
      >
        {label}
      </div>
      <h4
        className="font-bold mb-4 mt-1 text-[14px] m-0"
        style={{ color: 'var(--diagram-text-heading)' }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

export function LayerItem({ label, desc, badge, theme }: { label: string; desc: string; badge: string; theme: string }) {
  const t = themes[theme] || themes.slate;
  return (
    <div
      className="flex justify-between items-center p-3 rounded-xl mb-3 last:mb-0"
      style={{
        background: 'var(--diagram-card-bg)',
        border: `1px solid ${t.accentBorder}`,
        boxShadow: 'var(--diagram-soft-shadow)',
      }}
    >
      <div>
        <p className="text-xs font-bold m-0" style={{ color: 'var(--diagram-text-heading)' }}>{label}</p>
        <p className="text-[10px] m-0 mt-0.5" style={{ color: 'var(--diagram-text-secondary)' }}>{desc}</p>
      </div>
      <span
        className="text-[10px] font-black px-2 py-0.5 rounded shrink-0 whitespace-nowrap"
        style={{
          background: t.accentBadgeBg,
          color: t.accentText,
          border: `1px solid ${t.accentBorder}`,
        }}
      >
        {badge}
      </span>
    </div>
  );
}

export function ResultBox({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <div
      className="p-4 rounded-2xl flex items-center justify-center gap-2 mt-2"
      style={{
        background: 'var(--diagram-result-bg)',
        border: '1px solid var(--diagram-result-border)',
        boxShadow: 'var(--diagram-soft-shadow)',
      }}
    >
      {icon && (
        <span
          className="w-4 h-4 flex items-center justify-center text-base"
          style={{ color: 'var(--diagram-result-text)' }}
        >
          {icon}
        </span>
      )}
      <p className="text-xs font-extrabold m-0" style={{ color: 'var(--diagram-result-text)' }}>{text}</p>
    </div>
  );
}

export function FooterGrid({ items }: { items: { theme: string; title: string; desc: string }[] }) {
  return (
    <div className="px-12 pb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, i) => {
        const t = themes[item.theme] || themes.slate;
        return (
          <div
            key={i}
            className="p-5 rounded-2xl"
            style={{
              background: 'var(--diagram-card-bg)',
              border: `1px solid ${t.accentBorder}`,
              boxShadow: 'var(--diagram-soft-shadow)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ background: t.accentBg }} />
              <h4
                className="font-bold text-xs uppercase m-0"
                style={{ color: 'var(--diagram-text-heading)' }}
              >
                {item.title}
              </h4>
            </div>
            <p className="text-xs leading-relaxed m-0" style={{ color: 'var(--diagram-text-secondary)' }}>{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
