/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      // Proxy Firebase Auth requests to firebaseapp.com (Firebase official Option 3)
      // This makes Google Sign-In show "Continue to mohdhaziq-portfolio.onrender.com"
      // instead of "Continue to my-portfolio-d84d3.firebaseapp.com"
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
}

module.exports = nextConfig
