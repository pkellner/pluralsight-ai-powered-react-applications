import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'].filter(ext =>
    !ext.includes('socket-server')
  ),
};

export default nextConfig;