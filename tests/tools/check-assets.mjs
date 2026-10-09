import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(await readFile('tests/fixtures/assets.json', 'utf8'));
for (const asset of manifest.assets) {
  if (!asset.source || !asset.license || !asset.review)
    throw new Error('Missing provenance: ' + asset.path);
  if (!asset.path.startsWith('/') || asset.path.includes('..'))
    throw new Error('Invalid asset path');
  const bytes = await readFile('public' + asset.path);
  if (createHash('sha256').update(bytes).digest('hex') !== asset.sha256)
    throw new Error('Static input changed: ' + asset.path);
}
for (const path of ['public/harness-source', 'src/content/en.html', 'src/content/zh.html']) {
  let exists = true;
  try {
    await access(path);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    exists = false;
  }
  if (exists) throw new Error('Captured runtime must not return: ' + path);
}
console.log(
  `Verified ${manifest.assets.length} static inputs; website runtime is built from React source.`,
);
