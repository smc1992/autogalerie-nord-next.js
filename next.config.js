/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['autogalerie-nord.de', 'www.autogalerie-nord.de'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'autogalerie-nord.de',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.autogalerie-nord.de',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
