import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { locales, messages, type Locale } from '@/i18n';
import product from '@/config/product.json';
import { siteOrigin } from './seo';
import { sharingImagePath, sitePath } from '../config/deployment';

async function origin() {
  if (process.env.GITHUB_PAGES === 'true') {
    if (!process.env.SITE_URL) throw new Error('Pages requires SITE_URL');
    return new URL(process.env.SITE_URL).origin;
  }
  const requestHeaders = await headers();
  const protocol = requestHeaders.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const host = requestHeaders.get('host') || 'localhost:3100';
  return siteOrigin(new Request(`${protocol}://${host}`, { headers: { host } }));
}

export async function websiteMetadata(locale: Locale): Promise<Metadata> {
  const base = await origin();
  const language = locales[locale];
  const text = messages[locale].Harness.Index;
  const image = {
    url: base + sharingImagePath,
    width: 1200,
    height: 630,
    alt: 'DeepSeek Harness',
  };
  return {
    metadataBase: new URL(base),
    title: text.harnessMetaTitle,
    description: text.harnessMetaDesc,
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
    alternates: {
      canonical: base + language.path,
      languages: Object.fromEntries([
        ...Object.values(locales).map((entry) => [entry.language, base + entry.path]),
        ['x-default', base + locales.en.path],
      ]),
    },
    icons: { icon: [{ url: sitePath('/brand/favicon.svg'), type: 'image/svg+xml' }] },
    openGraph: {
      type: 'website',
      siteName: 'DeepSeek Harness',
      title: text.harnessMetaTitle,
      description: text.harnessMetaDesc,
      url: base + language.path,
      images: [image],
      ...(language.ogLocale ? { locale: language.ogLocale } : {}),
      alternateLocale: Object.values(locales)
        .filter((entry) => entry.ogLocale && entry.language !== language.language)
        .map((entry) => entry.ogLocale!),
    },
    twitter: {
      card: 'summary_large_image',
      title: text.harnessMetaTitle,
      description: text.harnessMetaDesc,
      images: [image.url],
    },
  };
}

export async function websiteStructuredData(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: messages[locale].Harness.Index.harnessMetaTitle,
    description: messages[locale].Harness.Index.harnessMetaDesc,
    url: (await origin()) + locales[locale].path,
    inLanguage: locales[locale].language,
    about: {
      '@type': 'SoftwareApplication',
      name: 'DeepSeek Harness',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Windows, macOS',
      url: product.links.repository,
    },
  };
}
