"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DevlogBackLinkInner({ category }: { category: string }) {
  const searchParams = useSearchParams();
  const pkg = searchParams.get("pkg") || "All";
  const page = searchParams.get("page") || "1";
  
  const href = `/devlog?tab=${category}&pkg=${pkg}&page=${page}`;
  
  return (
    <Link href={href} className="back-link">
      ← 목록으로
    </Link>
  );
}

export function DevlogBackLink({ category }: { category: string }) {
  return (
    <Suspense fallback={<Link href={`/devlog?tab=${category}`} className="back-link">← 목록으로</Link>}>
      <DevlogBackLinkInner category={category} />
    </Suspense>
  );
}
