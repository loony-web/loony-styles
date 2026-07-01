import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@loony/ui", "@loony/icons", "@loony/tokens", "@loony/utils"],
};

export default nextConfig;
