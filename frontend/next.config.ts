import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Public images are already compressed WebP assets; serving them directly avoids first-view optimization work.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
