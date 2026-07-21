import React from "react";

export function NotionIndent({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-6 border-l-2 border-[var(--border-color)]/30 ml-2 my-2">
      {children}
    </div>
  );
}
