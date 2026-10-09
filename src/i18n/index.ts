import english from './en.json';
import chinese from './zh.json';
import japanese from './ja.json';
import french from './fr.json';
import german from './de.json';
import korean from './ko.json';
import russian from './ru.json';
import arabic from './ar.json';
import spanish from './es.json';
import portuguese from './pt.json';
import indonesian from './id.json';
import turkish from './tr.json';
import polish from './pl.json';
import italian from './it.json';
import ukrainian from './uk.json';
import vietnamese from './vi.json';
import dutch from './nl.json';
import czech from './cs.json';
import romanian from './ro.json';
import hebrew from './he.json';
import persian from './fa.json';
import thai from './th.json';
import hindi from './hi.json';
import bengali from './bn.json';
import urdu from './ur.json';
import traditionalChinese from './zh-TW.json';
import type { Locale } from './locales';
export { locales, isLocale, isChineseLocale, type Locale } from './locales';
export type Messages = typeof english;

export const messages: Record<Locale, Messages> = {
  en: english,
  zh: chinese,
  ja: japanese,
  fr: french,
  de: german,
  ko: korean,
  ru: russian,
  ar: arabic,
  es: spanish,
  pt: portuguese,
  id: indonesian,
  tr: turkish,
  pl: polish,
  it: italian,
  uk: ukrainian,
  vi: vietnamese,
  nl: dutch,
  cs: czech,
  ro: romanian,
  he: hebrew,
  fa: persian,
  th: thai,
  hi: hindi,
  bn: bengali,
  ur: urdu,
  'zh-TW': traditionalChinese,
};
