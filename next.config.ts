import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      { source: "/oportunidad", destination: "/la-oportunidad", permanent: true },
      { source: "/metodologia", destination: "/como-trabajamos", permanent: true },
    ];
  },
};

export default nextConfig;
