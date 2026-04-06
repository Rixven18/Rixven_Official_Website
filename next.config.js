// =============================================================================
// RIXVEN — next.config.js
// Optimized for Cloudflare Pages with Edge Runtime support.
// Supports hybrid rendering: static pages + Cloudflare Worker edge functions.
// =============================================================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ---------------------------------------------------------------------------
  // CLOUDFLARE DEPLOYMENT STRATEGY
  // ---------------------------------------------------------------------------
  // Use Cloudflare Pages adapter for hybrid static + edge functions
  // output: 'export' removed - using @cloudflare/next-on-pages instead

  // Ensure trailing slashes for proper static file serving
  trailingSlash: true,

  // ---------------------------------------------------------------------------
  // REACT 19 EXPERIMENTAL FEATURES
  // ---------------------------------------------------------------------------
  experimental: {
    reactCompiler: false,
    ppr: false,
    inlineCss: false,
  },

  // ---------------------------------------------------------------------------
  // IMAGE OPTIMIZATION
  // ---------------------------------------------------------------------------
  images: {
    unoptimized: true,
  },

  // ---------------------------------------------------------------------------
  // SECURITY HEADERS — Production-Grade RIXVEN Security Posture
  // ---------------------------------------------------------------------------
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ---------------------------------------------------------------------------
  // REDIRECTS — Canonical URL enforcement
  // ---------------------------------------------------------------------------
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'www.rixven.com' }],
        destination: 'https://rixven.com/:path*',
        permanent: true,
      },
    ];
  },

  // ---------------------------------------------------------------------------
  // WEBPACK CUSTOMIZATION
  // ---------------------------------------------------------------------------
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // ---------------------------------------------------------------------------
  // COMPILER OPTIONS
  // ---------------------------------------------------------------------------
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },

  // ---------------------------------------------------------------------------
  // TYPESCRIPT & ESLINT
  // ---------------------------------------------------------------------------
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // ---------------------------------------------------------------------------
  // PERFORMANCE
  // ---------------------------------------------------------------------------
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // ---------------------------------------------------------------------------
  // ENVIRONMENT VARIABLES
  // ---------------------------------------------------------------------------
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://rixven.com',
    NEXT_PUBLIC_SITE_NAME: 'RIXVEN',
  },
};

module.exports = nextConfig;