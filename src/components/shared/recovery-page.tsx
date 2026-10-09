'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { basePath } from '@/config/deployment';
import { isLocale, locales, type Locale } from '@/i18n/locales';
import labels from '@/i18n/recovery.json';
import { recoveryMarkup, recoveryStyles } from '@/lib/recovery';

export function RecoveryPage({
  reset,
  initialLocale = 'en',
}: {
  reset?: () => void;
  initialLocale?: Locale;
}) {
  const locale = useSyncExternalStore(
    () => () => {},
    () => {
      const path = location.pathname.slice(basePath.length).split('/').filter(Boolean);
      const value = path[0] === 'docs' ? path[1] : path[0];
      const current = isLocale(value || '')
        ? (value as Locale)
        : value === 'harness'
          ? 'zh'
          : initialLocale;
      return current;
    },
    () => initialLocale,
  );
  useEffect(() => {
    const current = locale;
    document.documentElement.lang = locales[current].language;
    document.documentElement.dir = locales[current].direction;
    document.title = labels[current][reset ? 'error' : 'missing'] + ' | DeepSeek Harness';
  }, [locale, reset]);
  return (
    <>
      <style>{recoveryStyles}</style>
      <main className="recovery" lang={locales[locale].language} dir={locales[locale].direction}>
        <div
          dangerouslySetInnerHTML={{ __html: recoveryMarkup(locale, reset ? 'error' : 'missing') }}
        />
        {reset && <button onClick={reset}>{labels[locale].retry}</button>}
      </main>
    </>
  );
}
