import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { deploymentUrl } from './lib/deployment.mjs';

const site = deploymentUrl(process.env.SITE_URL);
const base = site.pathname.replace(/\/$/, '');
const root = path.resolve('out');
const locales = JSON.parse(await readFile('src/i18n/locales.json', 'utf8'));
const errors = [];
const exists = async (file) => {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
};
const entry = await readFile(path.join(root, 'index.html'), 'utf8');
if (
  !/<section\b[^>]*class="hero"[^>]*id="downloads"/.test(entry) ||
  !entry.includes('lang="zh-CN"') ||
  /<meta\b[^>]*http-equiv="refresh"/i.test(entry)
)
  errors.push('Pages root must render the Chinese website directly, without a redirect');
const docsEntry = await readFile(path.join(root, 'docs/index.html'), 'utf8');
if (!docsEntry.includes(`0;url=${base}/docs/en/`))
  errors.push('Documentation entry must remain under /docs/ and open English');
async function checkUrl(raw, from) {
  const value = raw.replaceAll('&amp;', '&');
  if (!value || value.startsWith('#') || /^(?:data:|mailto:|tel:|javascript:)/.test(value)) return;
  const url = new URL(value, from);
  if (url.origin !== site.origin) return;
  if (base && !url.pathname.startsWith(base + '/') && url.pathname !== base) {
    errors.push(`${from.pathname}: missing deployment prefix ${value}`);
    return;
  }
  const relative = decodeURIComponent(url.pathname.slice(base.length)).replace(/^\//, '');
  const target = path.resolve(root, relative);
  if (!target.startsWith(root + path.sep) && target !== root) throw new Error('Unsafe output path');
  if (!(await exists(target)) && !(await exists(path.join(target, 'index.html'))))
    errors.push(`${from.pathname}: missing local target ${value}`);
}
for (const file of await readdir(root, { recursive: true })) {
  if (!/\.(?:html|css)$/.test(file)) continue;
  const text = await readFile(path.join(root, file), 'utf8');
  const from = new URL(base + '/' + file.replace(/index\.html$/, ''), site.origin);
  const matches = file.endsWith('.html')
    ? text.matchAll(/(?:href|src|poster)="([^"]+)"/g)
    : text.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g);
  for (const match of matches) await checkUrl(match[1], from);
}
for (const [key, locale] of Object.entries(locales)) {
  for (const route of [
    locale.path,
    ...['', 'architecture/', 'highlights/', 'requirements/', 'learning/'].map(
      (page) => locale.docsPath + page,
    ),
  ]) {
    const html = await readFile(path.join(root, route, 'index.html'), 'utf8');
    if (!html.includes(`lang="${locale.language}"`) || !html.includes(`dir="${locale.direction}"`))
      errors.push(`Invalid language/direction ${route}`);
    if (!html.includes(`href="${site.origin}${base}${route}"`))
      errors.push(`Missing canonical ${route}`);
    const count = [...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*hrefLang="/gi)].length;
    if (count !== Object.keys(locales).length + 1)
      errors.push(`Invalid hreflang count ${key}/${route}: ${count}`);
  }
}
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${site.origin}${base}/sitemap.xml`))
  errors.push('Invalid robots sitemap URL');
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
if ([...sitemap.matchAll(/<loc>/g)].length !== Object.keys(locales).length * 6)
  errors.push('Invalid sitemap route count');
if (!(await exists(path.join(root, 'opengraph-image.png')))) errors.push('Missing sharing image');
if (!(await exists(path.join(root, '.nojekyll')))) errors.push('Missing .nojekyll');
if (errors.length) throw new Error([...new Set(errors)].join('\n'));
console.log(
  `Verified website root and nested docs at Pages prefix ${base || '/'}: ${Object.keys(locales).length} locales, all local HTML/CSS targets, SEO and sitemap.`,
);
