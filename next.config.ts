import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [new URL('https://uyxyao9m8r2tcbrm.public.blob.vercel-storage.com/**')],
  },
};

export default nextConfig;
