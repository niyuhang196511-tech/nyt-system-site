import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async headers() {
    return [
      {
        // 匹配 public/draco 下的所有文件
        source: "/draco/:file*",
        headers: [
          {
            key: "Content-Type",
            value: "application/wasm", // 主要用于 .wasm；请见下方测试步骤确认
          },
          {
            key: "Cache-Control",
            value: "public, max-age=600, stale-while-revalidate=1200",
          },
          // 不要设置 Content-Disposition: attachment —— 那会强制浏览器下载
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${process.env.NEXT_PUBLIC_MINIO_REMOTE}/:path*`,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
