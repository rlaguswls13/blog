import React from "react";

export function NotionTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto my-6 border border-[var(--border-color)] rounded-xl bg-[var(--bg-secondary)] shadow-sm custom-scrollbar">
      <table className="w-full text-left border-collapse m-0 min-w-max [&_td]:px-5 [&_td]:py-3.5 [&_td]:border-b [&_td]:border-[var(--border-color)] [&_td]:text-sm [&_tr:last-child_td]:border-b-0 [&_tr]:transition-colors [&_tr:hover]:bg-[var(--bg-tertiary)]/40 [&_tr:first-child_td]:bg-[var(--bg-tertiary)]/80 [&_tr:first-child_td]:font-semibold [&_tr:first-child_td]:text-[var(--text-primary)] [&_tr:first-child_td]:border-b-2">
        {children}
      </table>
    </div>
  );
}
