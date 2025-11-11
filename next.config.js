/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static optimization for API routes to avoid webpack chunk issues
  experimental: {
    serverComponentsExternalPackages: ['resend'],
  },
}

module.exports = nextConfig

