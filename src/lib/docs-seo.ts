import { locales } from '../i18n/locales';
import { sharingImagePath } from '../config/deployment';
type Locale = keyof typeof locales;

/** Shared by VitePress navigation and the Next.js document response. */
export function docsSeoElements(
  locale: Locale,
  origin: string,
  suffix: string,
  title: string,
  description: string,
) {
  const url = origin + locales[locale].docsPath + suffix;
  const image = origin + sharingImagePath;
  const elements: { tag: 'meta' | 'link'; attributes: Record<string, string> }[] = [
    { tag: 'link', attributes: { rel: 'canonical', href: url } },
    ...Object.values(locales).map((language) => ({
      tag: 'link' as const,
      attributes: {
        rel: 'alternate',
        hreflang: language.language,
        href: origin + language.docsPath + suffix,
      },
    })),
    {
      tag: 'link',
      attributes: {
        rel: 'alternate',
        hreflang: 'x-default',
        href: origin + locales.en.docsPath + suffix,
      },
    },
    ...Object.entries({
      'og:type': 'article',
      'og:site_name': 'DeepSeek Harness',
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:image': image,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'DeepSeek Harness',
    }).map(([property, content]) => ({ tag: 'meta' as const, attributes: { property, content } })),
    ...Object.entries({
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    }).map(([name, content]) => ({ tag: 'meta' as const, attributes: { name, content } })),
  ];
  if (locales[locale].ogLocale)
    elements.push({
      tag: 'meta',
      attributes: { property: 'og:locale', content: locales[locale].ogLocale! },
    });
  return elements;
}
