import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Photos and screensavers are plain files in /public, so no remote image
  // hosts need to be allow-listed here.

  // Pins the project root, so Next doesn't guess based on folders above this one.
  turbopack: { root: __dirname },

  // The bouquet page is a self-contained 3D studio written as one HTML file, so
  // it lives in /public rather than /app. This serves it at /bouquet, which is
  // the address written to the NFC sticker. A rewrite proxies without changing
  // the URL in the address bar — do NOT turn this into a redirect.
  async rewrites() {
    return [{ source: "/bouquet", destination: "/bouquet-studio.html" }];
  },
};

export default nextConfig;
