import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

// ADSENSE_ACCOUNT 저장소 Variable이 설정된 빌드(예: commercial-blog)에서만 AdSense 메타 태그 추가
const adsenseAccount = process.env.ADSENSE_ACCOUNT;

export const metadata: Metadata = {
  title: "김현진 블로그",
  description:
    "Java & Spring Boot 기반 풀스택 개발자 김현진의 포트폴리오입니다.",
  ...(adsenseAccount ? { other: { "google-adsense-account": adsenseAccount } } : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className="theme-dark">
      <body>
        <ThemeProvider>
          <div className="container">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
