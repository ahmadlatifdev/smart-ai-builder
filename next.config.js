/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'cdn.cjdropshipping.com',
      'img.alicdn.com',
      'yourstore.com'
    ],
  },

  // REMOVE the old experimental.serverActions boolean (it breaks Next.js 14)
  experimental: {},
};

module.exports = nextConfig;

