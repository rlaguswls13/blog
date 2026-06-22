import React from "react";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export function Collapsible({ title, children }: CollapsibleProps) {
  return (
    <details className="mt-4 mb-2 p-4 border border-[var(--border-color)] rounded-xl bg-[var(--bg-tertiary)]/30">
      <summary className="cursor-pointer font-bold text-[var(--accent-primary)] hover:opacity-80 transition-opacity select-none flex items-center">
        <span>{title}</span>
      </summary>
      <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
        {children}
      </div>
    </details>
  );
}
