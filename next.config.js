/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // Increase body size limit for file uploads (up to 2GB for GitHub Releases)
  api: {
    bodyParser: false, // Disable default body parser for file uploads
    responseLimit: false,
  },
  async rewrites() {
    return [
      // Proxy Firebase Auth requests to firebaseapp.com
      {
        source: '/__/auth/:path*',
        destination: 'https://my-portfolio-d84d3.firebaseapp.com/__/auth/:path*',
      },
      {
        source: '/__/firebase/:path*',
        destination: 'https://my-portfolio-d84d3.firebaseapp.com/__/firebase/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Force Google to recognize site name as "Mohd Haziq" not "Render"
          {
            key: 'X-Site-Name',
            value: 'Mohd Haziq',
          },
        ],
      },
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
        ],
      },
      {
        source: '/favicon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/apple-touch-icon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
