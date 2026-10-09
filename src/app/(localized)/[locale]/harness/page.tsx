import { notFound, permanentRedirect } from 'next/navigation';
import { isLocale, locales } from '@/i18n';
import { LandingPage } from '@/components/landing-page';
import { websiteMetadata } from '@/lib/website-metadata';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return websiteMetadata(locale);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === 'zh') permanentRedirect(locales.zh.path);
  return <LandingPage locale={locale} />;
}
