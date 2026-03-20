/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Docker standalone build
  output: "standalone",

  // 禁用图片优化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;