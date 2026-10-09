import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/i18n';
import '@/components/styles/harness.css';

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locales[locale].language} dir={locales[locale].direction}>
      <body>{children}</body>
    </html>
  );
}
