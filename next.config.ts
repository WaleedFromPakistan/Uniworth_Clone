const isProd = process.env.NODE_ENV === 'production';

const remotePatterns = isProd
  ? [
      {
        protocol: 'https',
        hostname: 'superb-freedom-1e5f2d4367.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'superb-freedom-1e5f2d4367.media.strapiapp.com',
        pathname: '/**',
      },
    ]
  : [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
    ];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns,
    unoptimized: true,
  },
};

export default nextConfig;
