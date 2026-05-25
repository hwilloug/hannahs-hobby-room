import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog-images.poppyland.dev',
      },
    ],
  },
};

export default nextConfig;
