/** @type {import('next').NextConfig} */
const nextConfig = {
  exportTrailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true
    }
  },
}

module.exports = nextConfig
