/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/__/auth/handler',
        destination: '/firebase-auth-handler',
      },
      {
        source: '/__/auth/handler/:path*',
        destination: '/firebase-auth-handler',
      },
    ]
  },
}

module.exports = nextConfig
