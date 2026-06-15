/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  // Allow large image uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // SEO: Remove X-Powered-By header
  poweredByHeader: false,
  // SEO: Enable compression for better Core Web Vitals
  compress: true,
  // SEO: Redirect old broken URLs from Search Console
  async redirects() {
    return [
      { source: '/search', destination: '/', permanent: true },
      { source: '/areas/palghar', destination: '/areas', permanent: true },
      { source: '/areas/palghar/:path*', destination: '/areas', permanent: true },
      { source: '/areas/mumbai', destination: '/areas', permanent: true },
      { source: '/areas/central-line', destination: '/areas', permanent: true },
      { source: '/areas/western-line', destination: '/areas', permanent: true },
      { source: '/areas/south-mumbai', destination: '/areas', permanent: true },
      { source: '/areas/vile parle', destination: '/areas/vile-parle', permanent: true },
      { source: '/areas/vile parle/:path*', destination: '/areas/vile-parle/:path*', permanent: true },
      { source: '/areas/mira road', destination: '/areas/mira-road', permanent: true },
      { source: '/areas/mira road/:path*', destination: '/areas/mira-road/:path*', permanent: true },
      { source: '/areas/lower parel', destination: '/areas/lower-parel', permanent: true },
      { source: '/areas/lower parel/:path*', destination: '/areas/lower-parel/:path*', permanent: true },
      { source: '/areas/navi mumbai', destination: '/areas/navi-mumbai', permanent: true },
      { source: '/areas/navi mumbai/:path*', destination: '/areas/navi-mumbai/:path*', permanent: true },
      
      // Catch garbage URLs generated from old broken link tags
      { source: '/areas/:location/<a%20href=', destination: '/areas/:location', permanent: true },
      { source: '/areas/:location/%3Ca%20href=', destination: '/areas/:location', permanent: true },
      { source: '/areas/:location/%3Ca%20href%3D', destination: '/areas/:location', permanent: true },
      { source: '/blog/terrace-<a%20href=', destination: '/blog', permanent: true },
      { source: '/blog/terrace-%3Ca%20href=', destination: '/blog', permanent: true },
      { source: '/blog/terrace-%3Ca%20href%3D', destination: '/blog', permanent: true },
      
      // Redirect deleted/old blogs
      { source: '/blog/civil-contractor-agreement-rules-tips-marathi', destination: '/blog', permanent: true },
    ];
  },
  // SEO + Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
      {
        // Cache static assets aggressively — better Core Web Vitals
        source: '/(.*)\\.(ico|png|jpg|jpeg|svg|webp|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
