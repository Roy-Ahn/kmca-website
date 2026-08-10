import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Keep links to the previous Canva site working.
    return [
      { source: "/page-2", destination: "/business", permanent: true },
      { source: "/page-3", destination: "/consulting", permanent: true },
      { source: "/-", destination: "/global", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
