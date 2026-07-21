import React from "react";

export function NotionToggle({ title, children, level }: { title: string; children: React.ReactNode; level?: number | string }) {
  // Auto-detect markdown headings if level is not explicitly provided
  let computedLevel = level ? Number(level) : 0;
  let displayTitle = title;
  
  if (!computedLevel && typeof title === 'string') {
    if (title.startsWith('# ')) { computedLevel = 1; displayTitle = title.substring(2); }
    else if (title.startsWith('## ')) { computedLevel = 2; displayTitle = title.substring(3); }
    else if (title.startsWith('### ')) { computedLevel = 3; displayTitle = title.substring(4); }
  }

  const isHeading = computedLevel === 1 || computedLevel === 2 || computedLevel === 3;
  
  return (
    <details className="notion-toggle my-2 p-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-tertiary)]/20">
      <summary className={`cursor-pointer hover:text-[var(--accent-primary)] transition-colors select-none flex items-center ${!isHeading ? "font-medium text-[var(--text-primary)]" : ""}`}>
        {computedLevel === 1 ? <h1 className="inline m-0 border-none pb-0 hover:text-[var(--accent-primary)] transition-colors" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{displayTitle}</h1> :
         computedLevel === 2 ? <h2 className="inline m-0 border-none pb-0 hover:text-[var(--accent-primary)] transition-colors" style={{ fontSize: '1.05rem', fontWeight: 700 }}>{displayTitle}</h2> :
         computedLevel === 3 ? <h3 className="inline m-0 border-none pb-0 hover:text-[var(--accent-primary)] transition-colors" style={{ fontSize: '0.95rem', fontWeight: 600 }}>{displayTitle}</h3> :
         <span>{displayTitle}</span>}
      </summary>
      <div className="mt-3 pt-3 border-t border-[var(--border-color)] pl-2">
        {children}
      </div>
    </details>
  );
}
