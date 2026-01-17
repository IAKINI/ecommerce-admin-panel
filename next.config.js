/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Vercel için optimizasyon
  swcMinify: true,
  compress: true,
}

module.exports = nextConfig