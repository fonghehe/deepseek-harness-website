import type { NextConfig } from 'next';
import locales from './src/i18n/locales.json';

const config: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  trailingSlash: true,
  experimental: { globalNotFound: true },
  async headers() {
    return [
      {
        source: '/docs/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      ...Object.values(locales).map((locale) => ({
        source: locale.path.slice(0, -1),
        headers: [{ key: 'Content-Language', value: locale.language }],
      })),
    ];
  },
  async redirects() {
    return [{ source: '/docs/:path*/index.html', destination: '/docs/:path*/', permanent: true }];
  },
  outputFileTracingIncludes: { '/docs/[[...slug]]': ['./public/docs/**/*.html'] },
};
export default config;
