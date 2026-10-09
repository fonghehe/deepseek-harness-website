import { readFile } from 'node:fs/promises';
const product = JSON.parse(await readFile('src/config/product.json', 'utf8'));
const urls = [
  ...new Set([
    ...Object.values(product.links),
    ...product.featureSources.map((source) => source.url),
  ]),
];
const failures = [],
  uncertain = [];
for (const url of urls) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') throw new Error('Product links must use HTTPS: ' + url);
  try {
    let response;
    for (let attempt = 0; attempt < 2; attempt++) {
      response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(12000),
        headers: { 'User-Agent': 'ds-website-link-check/1.0' },
      });
      if (![405, 403, 429].includes(response.status)) break;
      if (response.status === 405)
        response = await fetch(url, {
          signal: AbortSignal.timeout(12000),
          headers: { Range: 'bytes=0-0' },
        });
      if (response.status !== 429) break;
      await response.body?.cancel();
    }
    await response.body?.cancel();
    if (response.status === 404 || response.status === 410)
      failures.push(`${response.status} ${url}`);
    else if (!response.ok) uncertain.push(`${response.status} ${url}`);
    console.log(`${response.status} ${url}`);
  } catch (error) {
    uncertain.push(`${url}: ${error.message}`);
  }
}
if (failures.length) throw new Error('Broken product links:\n' + failures.join('\n'));
if (uncertain.length) {
  console.warn('Could not verify these links:\n' + uncertain.join('\n'));
  if (process.argv.includes('--strict')) throw new Error('External link verification incomplete');
}
console.log(`Checked ${urls.length} URLs; ${uncertain.length} unverified.`);
