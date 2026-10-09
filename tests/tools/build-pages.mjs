import { cp, mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { deploymentUrl } from './lib/deployment.mjs';

// Select routes structurally in an isolated checkout; maintained source is never rewritten.
const root = process.cwd();
const input = path.join(root, '.pages-build');
const output = path.join(root, 'out');
const url = deploymentUrl(process.env.SITE_URL);
const base = url.pathname.replace(/\/$/, '');
const env = {
  ...process.env,
  GITHUB_PAGES: 'true',
  NEXT_PUBLIC_BASE_PATH: base,
  PAGES_BASE_PATH: base,
  SITE_URL: url.origin,
};
const write = async (file, content) => {
  const target = path.join(input, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
};
let ownsInput = false;
try {
  await mkdir(input);
  ownsInput = true;
  for (const file of ['src', 'docs', 'public', 'package.json', 'tsconfig.json', 'next-env.d.ts']) {
    await cp(path.join(root, file), path.join(input, file), {
      recursive: true,
      filter: (entry) =>
        !/\/(?:public\/docs|\.vitepress\/(?:cache|dist|\.temp))(?:\/|$)/.test(entry),
    });
  }
  await symlink(path.join(root, 'node_modules'), path.join(input, 'node_modules'), 'dir');
  await write(
    'next.config.mjs',
    `export default ${JSON.stringify({
      output: 'export',
      trailingSlash: true,
      poweredByHeader: false,
      basePath: base,
      images: { unoptimized: true },
      experimental: { globalNotFound: true },
    })};\n`,
  );
  await rm(path.join(input, 'src/app/docs'), { recursive: true });
  await write(
    'src/app/(chinese)/harness/page.tsx',
    `import { LandingPage } from '@/components/landing-page';
import { websiteMetadata } from '@/lib/website-metadata';
export const generateMetadata = () => websiteMetadata('zh');
export default function Page() { return <LandingPage locale="zh" />; }
`,
  );
  await write(
    'src/app/(localized)/[locale]/harness/page.tsx',
    `import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/i18n/locales';
import { LandingPage } from '@/components/landing-page';
import { websiteMetadata } from '@/lib/website-metadata';
export function generateStaticParams() { return Object.keys(locales).filter(locale => locale !== 'zh').map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); return websiteMetadata(locale);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); return <LandingPage locale={locale} />;
}
`,
  );
  await write(
    'src/app/(chinese)/page.tsx',
    "export { default, generateMetadata } from './harness/page';\n",
  );
  for (const [route, handler] of [
    ['robots.txt', 'robots'],
    ['sitemap.xml', 'sitemap'],
  ])
    await write(
      `src/app/${route}/route.ts`,
      `export const dynamic = 'force-static';\nexport { GET } from '@/lib/${handler}';\n`,
    );
  await cp(
    path.join(input, 'src/app/opengraph-image'),
    path.join(input, 'src/app/opengraph-image.png'),
    { recursive: true },
  );
  await rm(path.join(input, 'src/app/opengraph-image'), { recursive: true });
  for (const args of [['docs:build'], ['exec', 'next', 'build', '--webpack']]) {
    const result = spawnSync('pnpm', args, { cwd: input, env, stdio: 'inherit' });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`pnpm ${args.join(' ')} failed (${result.status})`);
  }
  await rm(output, { recursive: true, force: true });
  await cp(path.join(input, 'out'), output, { recursive: true });
  await writeFile(path.join(output, '.nojekyll'), '');
  console.log(`Pages site exported to out/ for ${url.href}`);
} finally {
  if (ownsInput) await rm(input, { recursive: true, force: true });
}
