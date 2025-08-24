// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Generate tighter, right-sized responsive images for your layout
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],

    // Prefer AVIF / WebP when the browser supports it (smaller, faster)
    formats: ["image/avif", "image/webp"],

    // Cache remote images on the Next.js Image Optimization CDN
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days

    // Allow only the remotes you really use
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // If you add others, declare them here:
      // { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "your-cms.example.com" },
    ],
  },

  // Small best-practice wins
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
