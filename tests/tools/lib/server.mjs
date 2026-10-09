import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

export async function withSite(callback, { pages = false } = {}) {
  if (process.env.SITE_AUDIT_URL) {
    const url = new URL(process.env.SITE_AUDIT_URL);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid SITE_AUDIT_URL');
    return callback(url.href.replace(/\/$/, ''));
  }
  const socket = createServer();
  await new Promise((resolve, reject) => {
    socket.once('error', reject);
    socket.listen(0, '127.0.0.1', resolve);
  });
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  const origin = `http://127.0.0.1:${port}`;
  const prefix = pages
    ? new URL(process.env.SITE_URL || 'https://example.github.io/dsWebsite/').pathname.replace(
        /\/$/,
        '',
      )
    : '';
  const server = spawn(
    process.execPath,
    pages
      ? ['tests/tools/serve-pages.mjs']
      : [
          'node_modules/next/dist/bin/next',
          'start',
          '--hostname',
          '127.0.0.1',
          '--port',
          String(port),
        ],
    { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, E2E_PORT: String(port) } },
  );
  let output = '';
  for (const stream of [server.stdout, server.stderr])
    stream.on('data', (chunk) => {
      output = (output + chunk).slice(-4000);
    });
  try {
    let ready = false;
    for (let attempt = 0; attempt < 150; attempt++) {
      if (server.exitCode !== null) throw new Error(output);
      try {
        if (
          (await fetch(origin + prefix + '/en/harness/', { signal: AbortSignal.timeout(1000) })).ok
        ) {
          ready = true;
          break;
        }
      } catch {
        /* Wait for this owned server to start. */
      }
      await delay(200);
    }
    if (!ready) throw new Error('Site startup timed out: ' + output);
    return await callback(origin + prefix);
  } finally {
    server.kill('SIGTERM');
    if (server.exitCode === null) {
      await Promise.race([new Promise((resolve) => server.once('exit', resolve)), delay(5000)]);
      if (server.exitCode === null) server.kill('SIGKILL');
    }
  }
}

export async function run(command, args, options = {}) {
  const child = spawn(command, args, { stdio: 'inherit', ...options });
  await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code, signal) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited ${code ?? signal}`)),
    );
  });
}
