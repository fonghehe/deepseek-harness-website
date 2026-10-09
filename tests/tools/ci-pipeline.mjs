import { chownSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { run } from './lib/server.mjs';

const mode = process.argv[2] || 'all';
if (!['setup', 'node', 'pages', 'all'].includes(mode)) throw new Error('Unknown CI stage');
if (process.platform !== 'linux') throw new Error('Use pnpm verify:ci to run the Linux pipeline');

async function setup() {
  const nodeVersion = readFileSync('.node-version', 'utf8').trim();
  if (process.versions.node !== nodeVersion)
    throw new Error(`CI requires Node ${nodeVersion}, received ${process.versions.node}`);
  // GitHub mounts a home directory owned by pwuser while this job runs as root.
  // Firefox requires its existing home directory to belong to the process user.
  const browserHome = homedir();
  if (statSync(browserHome).uid !== process.getuid())
    chownSync(browserHome, process.getuid(), process.getgid());
  await run('pnpm', ['install', '--frozen-lockfile']);
  const sources = '/etc/apt/sources.list.d/ubuntu.sources';
  writeFileSync(
    sources,
    readFileSync(sources, 'utf8').replaceAll(
      'http://security.ubuntu.com/',
      'https://security.ubuntu.com/',
    ),
  );
  await run('apt-get', ['-o', 'Acquire::Retries=3', 'update']);
  await run('apt-get', [
    '-o',
    'Acquire::Retries=3',
    'install',
    '-y',
    '--no-install-recommends',
    'fonts-dejavu-core',
  ]);
  await run('pnpm', ['exec', 'playwright', 'install', 'chromium', 'firefox', 'webkit']);
}

async function verifyNode() {
  const env = { ...process.env, GITHUB_PAGES: 'false' };
  delete env.SITE_URL;
  await run('pnpm', ['verify:full'], { env });
}

async function verifyPages() {
  if (!process.env.SITE_URL) throw new Error('Pages verification requires SITE_URL');
  const env = { ...process.env, GITHUB_PAGES: 'true' };
  await run('pnpm', ['build:pages'], { env });
  await run('pnpm', ['check:pages'], { env });
  await run('pnpm', ['exec', 'playwright', 'test', '--project=chromium'], {
    env: { ...env, E2E_PAGES: '1', E2E_PORT: '3109' },
  });
  await run('pnpm', ['perf:pages'], { env });
}

if (mode === 'setup' || mode === 'all') await setup();
if (mode === 'node' || mode === 'all') await verifyNode();
if (mode === 'pages' || mode === 'all') await verifyPages();
