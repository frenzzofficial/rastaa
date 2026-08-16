import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Set this to your repo name (only needed for a *project* page like
// username.github.io/rastaa — leave both empty if this repo IS your
// username.github.io root site).
const repoName = "rastaa";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  output: "export", // static HTML export -> ./out
  images: { unoptimized: true }, // next/image has no server on GitHub Pages
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  trailingSlash: true, // GitHub Pages serves /route/index.html cleanly
};

export default nextConfig;
