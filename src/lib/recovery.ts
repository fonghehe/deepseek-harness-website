import text from '../i18n/recovery.json';
import { locales, type Locale } from '../i18n/locales';
import { escapeHtml } from './seo';

export const recoveryStyles = `:root{color-scheme:dark}body{margin:0;background:#0a0a0a;color:#f4f4f5;font:16px/1.6 system-ui,sans-serif}.recovery{max-width:680px;margin:12vh auto;padding:32px;display:block}.recovery h1{font-size:clamp(28px,5vw,44px);line-height:1.2}.recovery p{color:#c7c7cc}.recovery a,.recovery button{display:inline-block;margin:4px;padding:10px 16px;border:1px solid #73737d;border-radius:10px;color:inherit;background:transparent;text-decoration:none;font:inherit;min-height:44px;box-sizing:border-box}.recovery a:focus-visible,.recovery button:focus-visible{outline:3px solid #92b7ff;outline-offset:3px}.recovery nav{margin-block:24px}.recovery .recovery-languages a{font-size:14px}.recovery-brand{direction:ltr;unicode-bidi:isolate}`;

export function recoveryMarkup(locale: Locale, kind: 'missing' | 'error' = 'missing') {
  const labels = text[locale];
  const language = locales[locale];
  return `<div class="recovery-brand">DeepSeek Harness · Website</div><h1>${escapeHtml(labels[kind])}</h1><p>${escapeHtml(labels.detail)}</p><nav aria-label="${escapeHtml(labels.detail)}"><a href="${escapeHtml(language.path)}">${escapeHtml(labels.home)}</a><a href="${escapeHtml(language.docsPath)}">${escapeHtml(labels.docs)}</a></nav><nav class="recovery-languages" aria-label="${escapeHtml(labels.languages)}">${Object.entries(
    locales,
  )
    .map(
      ([key, entry]) =>
        `<a href="${escapeHtml(entry.path)}" lang="${entry.language}" dir="${entry.direction}"${key === locale ? ' aria-current="page"' : ''}>${escapeHtml(entry.label)}</a>`,
    )
    .join('')}</nav>`;
}

export function missingDocument(locale: Locale) {
  return new Response(
    `<!doctype html><html lang="${locales[locale].language}" dir="${locales[locale].direction}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(text[locale].missing)} | DeepSeek Harness</title><style>${recoveryStyles}</style></head><body><main class="recovery">${recoveryMarkup(locale)}</main></body></html>`,
    {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Language': locales[locale].language,
        'Cache-Control': 'no-store',
      },
    },
  );
}
