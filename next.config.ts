import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://cdn-icons-png.flaticon.com/**"),
      new URL("https://randomuser.me/**"),
      new URL("https://unpkg.com/**"),
      new URL("https://cdn-icons-png.flaticon.com/512/4140/4140048.png/**"),
      new URL("https://res.cloudinary.com/**"),
    ],
    domains: [
      "https://cdn-icons-png.flaticon.com",
      "https://unpkg.com",
      "https://cdn-icons-png.flaticon.com",
      "https://randomuser.me",
      "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    ],
  },
};

export default nextConfig;
