import React from "react";

export function NotionCallout({ icon = "💡", children }: { icon?: string, children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-4 my-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/60">
      <div className="text-xl shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 w-full mdx-callout-content">
        {children}
      </div>
    </div>
  );
}
