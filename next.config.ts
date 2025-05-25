/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'superb-freedom-1e5f2d4367.strapiapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'superb-freedom-1e5f2d4367.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
