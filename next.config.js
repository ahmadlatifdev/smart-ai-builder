/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.cjdropshipping.com', 'img.alicdn.com', 'yourstore.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
