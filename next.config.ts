import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // This is the path for requests from your frontend
        destination:
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/:path*", // The actual API endpoint
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
