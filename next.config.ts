import type { NextConfig } from "next";

/* next build always sets NODE_ENV=production automatically */
const basePath = process.env.NODE_ENV === "production" ? "/spaceplus-bkk" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  /* expose to client components (video src, CSS url) */
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
