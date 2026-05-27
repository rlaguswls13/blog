import React from "react";

export function Indent({ children }: { children: React.ReactNode }) {
  return <div className="mdx-indent-block">{children}</div>;
}
