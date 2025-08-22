import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Either simple domains:
    // domains: ["picsum.photos"],

    // Or remotePatterns (more flexible):
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // add others you use:
      // { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
