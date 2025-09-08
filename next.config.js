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
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://autogalerie-nord.de' : '',
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.dein.auto https://api.pixel-base.de https://code.jquery.com; object-src 'none';"
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/images/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
