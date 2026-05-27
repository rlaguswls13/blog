"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProjectBackLinkInner() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const q = searchParams.get("q") || "";
  
  const qParam = q ? `&q=${encodeURIComponent(q)}` : "";
  const href = `/projects?page=${page}${qParam}`;
  
  return (
    <Link href={href} className="back-link">
      ← 목록으로
    </Link>
  );
}

export function ProjectBackLink() {
  return (
    <Suspense fallback={<Link href="/projects" className="back-link">← 목록으로</Link>}>
      <ProjectBackLinkInner />
    </Suspense>
  );
}
