import type { NextConfig } from "next";

// BASE_PATH="ROOT" 는 커스텀 도메인 루트(예: beji-blog.me) 서빙을 의미 (basePath 없음)
// BASE_PATH 가 없으면 기존과 동일하게 "/blog" 사용
const rawBasePath = process.env.BASE_PATH;
const resolvedBasePath = rawBasePath === "ROOT" ? "" : rawBasePath || "/blog";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? resolvedBasePath : "",
  trailingSlash: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
};

export default nextConfig;
