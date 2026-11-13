import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Sprites come from whatever URL the API returns; skip the optimizer so any host works.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
