'use client';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Summary must remain the native disclosure trigger; an explicit button role normalizes its accessibility semantics across browsers. */

import { useEffect, useRef } from 'react';
import { locales } from '@/i18n/locales';
import type { Locale } from '@/i18n';

export function LocaleMenu({ locale }: { locale: Locale }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent | PointerEvent) => {
      const element = disclosure.current;
      if (!element?.open) return;
      if (event instanceof KeyboardEvent) {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        element.open = false;
        element.querySelector('summary')?.focus();
      } else if (!element.contains(event.target as Node)) element.open = false;
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
    };
  }, []);
  return (
    <details className="site-locale" ref={disclosure}>
      <summary role="button">
        <svg
          className="locale-globe"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" />
        </svg>
        <span className="locale-label">{locales[locale].label}</span>
        <svg className="locale-chevron" viewBox="0 0 16 16" aria-hidden="true" fill="none">
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <ul>
        {Object.entries(locales).map(([key, language]) => (
          <li key={key}>
            <a
              href={language.path}
              lang={language.language}
              hrefLang={language.language}
              dir={language.direction}
              aria-current={key === locale ? 'page' : undefined}
              onClick={(event) => {
                if (
                  event.button ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                location.assign(language.path + location.search + location.hash);
              }}
            >
              {language.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
