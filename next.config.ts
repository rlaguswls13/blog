import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/blog" : "",
  trailingSlash: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
