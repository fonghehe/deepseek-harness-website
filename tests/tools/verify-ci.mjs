import { execFileSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deploymentUrl } from './lib/deployment.mjs';
import { run } from './lib/server.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const workflow = await readFile(join(root, '.github/workflows/quality.yml'), 'utf8');
const image = workflow.match(/^\s+image:\s+(mcr\.microsoft\.com\/playwright:\S+)\s*$/m)?.[1];
if (!image) throw new Error('Cannot find the CI Playwright container image');
execFileSync('docker', ['info'], { stdio: 'ignore' });

const nodeVersion = (await readFile(join(root, '.node-version'), 'utf8')).trim();
if (!/^\d+\.\d+\.\d+$/.test(nodeVersion)) throw new Error('Invalid Node version');
const { packageManager } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (!/^pnpm@\d+\.\d+\.\d+$/.test(packageManager)) throw new Error('Invalid pnpm version');
const siteUrl = deploymentUrl(process.env.SITE_URL || 'https://example.github.io/repository/').href;

const workspace = await mkdtemp(join(tmpdir(), 'harness-ci-'));
const source = join(workspace, 'source');
await mkdir(source);
const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  {
    cwd: root,
    encoding: 'utf8',
  },
)
  .split('\0')
  .filter(Boolean);
for (const file of new Set(files)) {
  await mkdir(dirname(join(source, file)), { recursive: true });
  try {
    await cp(join(root, file), join(source, file), { dereference: false });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

const archive = join(workspace, 'node.tar.gz');
if (process.env.CI_NODE_ARCHIVE) await cp(process.env.CI_NODE_ARCHIVE, archive);
else {
  const response = await fetch(
    `https://nodejs.org/dist/v${nodeVersion}/node-v${nodeVersion}-linux-x64.tar.gz`,
  );
  if (!response.ok) throw new Error(`Node download failed: ${response.status}`);
  await writeFile(archive, Buffer.from(await response.arrayBuffer()));
}

const reports = join(root, 'test-results/ci');
await mkdir(reports, { recursive: true });
console.log(`Local CI: ${image}, linux/amd64, Node ${nodeVersion}, ${packageManager}`);
console.log(`Isolated source: ${source}`);
let passed = false;
let reportError;
try {
  await run('docker', [
    'run',
    '--rm',
    '--platform=linux/amd64',
    '--ipc=host',
    '--cpus=4',
    '--mount',
    `type=bind,source=${source},target=/work`,
    '--mount',
    `type=bind,source=${archive},target=/tmp/project-node.tar.gz,readonly`,
    '--mount',
    'type=volume,source=harness-website-ci-pnpm,target=/pnpm/store',
    '--workdir',
    '/work',
    '--env',
    'CI=true',
    '--env',
    'E2E_PORT=3101',
    '--env',
    `SITE_URL=${siteUrl}`,
    '--env',
    'pnpm_config_store_dir=/pnpm/store',
    image,
    'bash',
    '-euc',
    `tar -xzf /tmp/project-node.tar.gz -C /usr/local --strip-components=1
corepack enable
corepack prepare ${packageManager} --activate
# Reproduce the home ownership of a GitHub container before the shared setup repairs it.
node -e "require('node:fs').chownSync(require('node:os').homedir(), 1001, 1001)"
node tests/tools/ci-pipeline.mjs all`,
  ]);
  passed = true;
} finally {
  for (const directory of ['test-results', 'playwright-report']) {
    try {
      await rm(join(reports, directory), { recursive: true, force: true });
      await cp(join(source, directory), join(reports, directory), { recursive: true, force: true });
    } catch (error) {
      if (error.code !== 'ENOENT') {
        reportError ||= error;
        console.error(`Cannot copy ${directory} report: ${error.message}`);
      }
    }
  }
  if (passed && !reportError) await rm(workspace, { recursive: true, force: true });
  else console.error(`Failed CI workspace retained: ${source}`);
  console.log(`CI reports: ${reports}`);
}
if (reportError) throw reportError;
