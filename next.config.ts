import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "tneqpkqvkvzlpjmqekdg.supabase.co",
      },
    ],
  },
};

export default nextConfig;