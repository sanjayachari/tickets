import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Use remotePatterns for dynamic hostnames or multiple hosts
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**", // allow all paths under Staybook
      },
    ],
  },
  // Optional: other Next.js config here
};

export default nextConfig;
