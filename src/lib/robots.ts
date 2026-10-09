import { sitePath } from '@/config/deployment';
import { siteOrigin } from '@/lib/seo';

export function GET(request: Request) {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin(request)}${sitePath('/sitemap.xml')}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
}
