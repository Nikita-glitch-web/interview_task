const nextConfig = {
  images: {
    formats: ["image/webp"],
    unoptimized: true,
  },
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/interview_task" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/interview_task" : "",
};

export default nextConfig;
