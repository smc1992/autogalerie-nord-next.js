/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: [],
    loader: 'default',
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingRoot: undefined,
  },
  assetPrefix: '',
  basePath: '',
  trailingSlash: false,
};

module.exports = nextConfig;
