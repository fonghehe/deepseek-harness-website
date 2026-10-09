import { readFile, readdir } from 'node:fs/promises';
import { validateMessages, validateTranslatedProse } from './lib/i18n-validation.mjs';
const json = async (file) => JSON.parse(await readFile(file, 'utf8'));
const locales = await json('src/i18n/locales.json');
const content = await json('src/i18n/site-content.json');
const navigation = await json('docs/navigation.json');
const product = await json('src/config/product.json');
const english = await json('src/i18n/en.json');
const descriptions = await json('docs/descriptions.json');
const recovery = await json('src/i18n/recovery.json');
const glossary = await json('docs/glossary.json');
const reviews = await json('docs/translation-reviews.json');
const pages = ['', 'architecture', 'highlights', 'requirements', 'learning'];
// Chinese intentionally folds the second paragraph into the first; heading line breaks are typography.
const errors = [],
  paths = new Set();
for (const [key, locale] of Object.entries(locales)) {
  if (!['ltr', 'rtl'].includes(locale.direction) || !locale.label || !locale.language)
    errors.push(`Invalid locale ${key}`);
  if (locale.ogLocale !== null && !/^[a-z]{2}_[A-Z]{2}$/.test(locale.ogLocale))
    errors.push(`Invalid OG locale ${key}`);
  for (const p of [locale.path, locale.docsPath]) {
    if (!p.startsWith('/') || !p.endsWith('/') || paths.has(p))
      errors.push(`Invalid/duplicate route ${p}`);
    paths.add(p);
  }
  errors.push(
    ...validateMessages(
      english.Harness,
      (await json(`src/i18n/${key}.json`)).Harness,
      `${key}.Harness`,
      { optionalEmpty: locale.language.startsWith('zh-') ? ['Index.harnessWhyP2'] : [] },
    ),
  );
  errors.push(...validateMessages(content.en, content[key], `${key}.capabilities`));
  errors.push(...validateMessages(navigation.en, navigation[key], `${key}.navigation`));
  errors.push(...validateMessages(descriptions.en, descriptions[key], `${key}.descriptions`));
  errors.push(...validateMessages(recovery.en, recovery[key], `${key}.recovery`));
  errors.push(...validateMessages(glossary.en, glossary[key], `${key}.glossary`));
  if (key !== 'en') {
    errors.push(
      ...validateTranslatedProse(
        english.Harness,
        (await json(`src/i18n/${key}.json`)).Harness,
        `${key}.Harness`,
      ),
      ...validateTranslatedProse(content.en, content[key], `${key}.capabilities`),
    );
  }
  if (!['needs-native-review', 'reviewed'].includes(reviews[key]?.status))
    errors.push(`Invalid review status ${key}`);
  if (reviews[key]?.status === 'reviewed' && (!reviews[key].reviewer || !reviews[key].evidence))
    errors.push(`Missing native review evidence ${key}`);
  const ids = content[key].features.map((feature) => feature.id);
  if (
    new Set(ids).size !== ids.length ||
    JSON.stringify(ids) !== JSON.stringify(product.featureSources.map((source) => source.id))
  )
    errors.push(`Feature source IDs do not match ${key}`);
  const files = await readdir(`docs/${key}`, { recursive: true });
  const actual = files.filter((file) => file.endsWith('.md')).sort();
  const expected = pages.map((page) => (page ? `${page}/index.md` : 'index.md')).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected))
    errors.push(`Document parity mismatch ${key}`);
  for (const page of pages) {
    const text = await readFile(`docs/${key}/${page ? page + '/' : ''}index.md`, 'utf8');
    if (!/^---\n[\s\S]*?title:\s*.+\n[\s\S]*?description:\s*.+\n[\s\S]*?---\n/.test(text))
      errors.push(`Missing metadata ${key}/${page}`);
    const description = descriptions[key][page || 'overview'];
    if (!description) errors.push(`Missing description ${key}/${page}`);
    else if (!text.includes("description: '" + description.replaceAll("'", "''") + "'"))
      errors.push(`Description mismatch ${key}/${page}`);
  }
}
for (const data of [content, navigation, descriptions, recovery, glossary, reviews])
  if (JSON.stringify(Object.keys(data).sort()) !== JSON.stringify(Object.keys(locales).sort()))
    errors.push('Locale registry parity mismatch');
if (errors.length) throw new Error(errors.join('\n'));
console.log(
  `Verified ${Object.keys(locales).length} languages, placeholders, rich text, source IDs and ${Object.keys(locales).length * pages.length} documents.`,
);
