import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const root = path.resolve('out');
const prefix = new URL(
  process.env.SITE_URL || 'https://example.github.io/dsWebsite/',
).pathname.replace(/\/$/, '');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://localhost');
    if (url.pathname === prefix && prefix) {
      response.writeHead(308, { Location: prefix + '/' + url.search });
      response.end();
      return;
    }
    if (prefix && !url.pathname.startsWith(prefix + '/')) throw new Error('Not found');
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname.slice(prefix.length)));
    if (!file.startsWith(root + path.sep) && file !== root) throw new Error('Not found');
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let data = await readFile(file);
    const type = types[path.extname(file)] || 'application/octet-stream';
    const compressible = /^(?:text\/|application\/(?:json|xml)|image\/svg\+xml)/.test(type);
    const acceptsGzip = (request.headers['accept-encoding'] || '').split(',').some((value) => {
      const [encoding, quality] = value.trim().split(';');
      return (
        encoding.toLowerCase() === 'gzip' &&
        (!quality || Number(quality.trim().replace(/^q=/i, '')) > 0)
      );
    });
    const compressed = compressible && acceptsGzip;
    if (compressed) data = gzipSync(data);
    response.writeHead(200, {
      'Content-Type': type,
      'Content-Length': data.length,
      ...(compressible ? { Vary: 'Accept-Encoding' } : {}),
      ...(compressed ? { 'Content-Encoding': 'gzip' } : {}),
    });
    response.end(data);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    try {
      response.end(await readFile(path.join(root, '404.html')));
    } catch {
      response.end('<h1>Page not found</h1>');
    }
  }
});
server.listen(Number(process.env.E2E_PORT || 3109), '127.0.0.1', () =>
  console.log(`Serving out/ at ${prefix || '/'}`),
);
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close());
