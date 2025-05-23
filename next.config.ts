/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['superb-freedom-1e5f2d4367.strapiapp.com'], // Allow images from localhost (Strapi backend)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'superb-freedom-1e5f2d4367.strapiapp.com',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
