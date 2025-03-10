const nextConfig = {
  output: "export",
  distDir: "docs",
  basePath: process.env.NODE_ENV === "production" ? "/interview_task" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/interview_task/" : "",
  images: {
    unoptimized: true,
  },
};
