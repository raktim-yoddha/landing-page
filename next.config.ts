import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML in out/, served by Cloudflare Workers static assets (wrangler.jsonc).
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
