import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/categories/gardening', destination: '/', permanent: true },
      { source: '/categories/coding', destination: '/', permanent: true },
      { source: '/categories/books', destination: '/', permanent: true },
    ];
  },
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
