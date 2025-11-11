/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static optimization for API routes to avoid webpack chunk issues
  experimental: {
    serverComponentsExternalPackages: ['@vercel/kv', 'resend'],
  },
}

module.exports = nextConfig

