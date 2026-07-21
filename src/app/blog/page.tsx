"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LegacyBlogRedirectPage() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <main className="legacy-redirect-page">
      <meta httpEquiv="refresh" content="0;url=/" />
      <p>Career 페이지 경로가 변경되었습니다.</p>
      <Link href="/">홈으로 이동 →</Link>
    </main>
  );
}
