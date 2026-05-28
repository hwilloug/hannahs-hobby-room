import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/categories/gardening', destination: '/categories/gardening/', permanent: true },
      { source: '/categories/coding', destination: '/categories/coding/', permanent: true },
      { source: '/categories/books', destination: '/categories/books/', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog-images.poppyland.dev',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
