import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Photos and screensavers are plain files in /public, so no remote image
  // hosts need to be allow-listed here.

  // Pins the project root, so Next doesn't guess based on folders above this one.
  turbopack: { root: __dirname },
};

export default nextConfig;
