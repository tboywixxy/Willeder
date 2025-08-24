// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
