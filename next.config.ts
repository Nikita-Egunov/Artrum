import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  compiler: {
    removeConsole: {
      exclude: ["error", "warn"], // оставляет только error и warn
    },
  }
};

export default nextConfig;
