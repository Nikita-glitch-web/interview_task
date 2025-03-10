/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <=== enables static exports
  reactStrictMode: true,
  basePath: "/interview_task",
};

module.exports = nextConfig;
