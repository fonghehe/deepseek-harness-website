import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { isLocale, locales } from '@/i18n';
import { escapeHtml, siteOrigin } from '@/lib/seo';
import { cachedDocument, documentResponse } from '@/lib/document-cache';
import { docsSeoElements } from '@/lib/docs-seo';
import descriptions from '../../../../docs/descriptions.json';
import navigation from '../../../../docs/navigation.json';
import { missingDocument } from '@/lib/recovery';

export const dynamic = 'force-dynamic';

/** Serve the built VitePress documents from the same origin as the product. */
export async function GET(request: Request, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await context.params;
  if (!slug.length) {
    const target = new URL('/docs/en/', siteOrigin(request));
    target.search = new URL(request.url).search;
    return Response.redirect(target, 308);
  }
  if (!slug.every((segment) => /^[a-z0-9-]+$/i.test(segment)) || !isLocale(slug[0])) {
    return missingDocument('en');
  }
  const locale = slug[0];
  const suffix = slug.slice(1).join('/');
  const route = suffix ? `${suffix}/` : '';
  const file = path.join(process.cwd(), 'public/docs', ...slug, 'index.html');
  try {
    const origin = siteOrigin(request);
    const document = await cachedDocument(`docs|${origin}|${slug.join('/')}`, async () => {
      let html = await readFile(file, 'utf8');
      const page = (suffix || 'overview') as keyof typeof descriptions.en;
      const metadata = docsSeoElements(
        locale,
        origin,
        route,
        navigation[locale][page] + ' | DeepSeek Harness',
        descriptions[locale][page],
      )
        .map(
          ({ tag, attributes }) =>
            `<${tag} data-docs-seo ${Object.entries(attributes)
              .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
              .join(' ')}/>`,
        )
        .join('');
      html = html
        .replace(
          /<html\b([^>]*)>/,
          (_, attributes: string) =>
            `<html${attributes.replace(/\sdir="[^"]*"/g, '')} dir="${locales[locale].direction}" data-site-origin="${escapeHtml(origin)}">`,
        )
        .replace('</head>', `${metadata}</head>`);
      return html;
    });
    return documentResponse(request, document, locales[locale].language);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    return missingDocument(locale);
  }
}
