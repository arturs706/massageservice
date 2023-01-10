/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    urlImports: ['https://unpkg.com', 'https://cdn.skypack.dev', 'https://cdnjs.cloudflare.com', 'https://res.cloudinary.com', 'https://cdn.jsdelivr.net'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['files.stripe.com', 'res.cloudinary.com', 'mdbcdn.b-cdn.net']
  },
}

module.exports = nextConfig
