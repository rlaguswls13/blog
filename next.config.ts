import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/resume" : "",
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
