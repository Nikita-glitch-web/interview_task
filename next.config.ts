import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    unoptimized: true,
  },
  output: "export",
  basePath: "/interview_task",
  assetPrefix: "/interview_task",
};

export default nextConfig;
