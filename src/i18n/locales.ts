import registry from './locales.json';
import { sitePath } from '../config/deployment';

export type Locale = keyof typeof registry;
export const locales = Object.fromEntries(
  Object.entries(registry).map(([key, value]) => [
    key,
    { ...value, path: sitePath(value.path), docsPath: sitePath(value.docsPath) },
  ]),
) as typeof registry;
export function isLocale(value: string): value is Locale {
  return Object.hasOwn(locales, value);
}

export function isChineseLocale(locale: Locale): boolean {
  return locales[locale].language.split('-')[0] === 'zh';
}
