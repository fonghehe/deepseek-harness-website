import { locales } from '@/i18n';
import { escapeHtml, siteOrigin } from '@/lib/seo';

export function GET(request: Request) {
  const origin = siteOrigin(request);
  const groups = [
    Object.values(locales).map((locale) => ({ language: locale.language, path: locale.path })),
    ...['', 'architecture/', 'highlights/', 'requirements/', 'learning/'].map((page) =>
      Object.values(locales).map((locale) => ({
        language: locale.language,
        path: locale.docsPath + page,
      })),
    ),
  ];
  const urls = groups
    .map((group) => {
      const alternatives = [...group, { language: 'x-default', path: group[0].path }]
        .map(
          (locale) =>
            `<xhtml:link rel="alternate" hreflang="${locale.language}" href="${escapeHtml(origin + locale.path)}"/>`,
        )
        .join('');
      return group
        .map((locale) => `<url><loc>${escapeHtml(origin + locale.path)}</loc>${alternatives}</url>`)
        .join('');
    })
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
