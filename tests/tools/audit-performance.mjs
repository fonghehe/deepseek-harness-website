import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { withSite, run } from './lib/server.mjs';
import { median, payloadFailures } from './lib/performance.mjs';

const targets = ['/en/harness/', '/ar/harness/', '/docs/en/architecture/'];
const pages = process.argv.includes('--pages');
const output = `test-results/performance${pages ? '/pages' : ''}`;
const repeats = Number(
  process.argv.find((value) => value.startsWith('--runs='))?.split('=')[1] || 1,
);
if (!Number.isInteger(repeats) || repeats < 1 || repeats > 5) throw new Error('Use --runs=1..5');
const chromeFlags =
  process.env.AUDIT_CHROME_FLAGS || '--headless --no-sandbox --use-angle=swiftshader';
await mkdir(output, { recursive: true });
await withSite(
  async (origin) => {
    const results = [];
    for (const [index, path] of targets.entries()) {
      const timings = [];
      let bytes = 0;
      for (let count = 0; count < 6; count++) {
        const start = performance.now();
        const response = await fetch(origin + path);
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        bytes = Buffer.byteLength(await response.text());
        timings.push(performance.now() - start);
      }
      const samples = [];
      for (let sample = 0; sample < repeats; sample++) {
        const name = `${output}/lighthouse-${index}-${sample}`;
        await run(
          process.execPath,
          [
            'node_modules/lighthouse/cli/index.js',
            origin + path,
            '--only-categories=performance,accessibility,seo',
            '--output=json',
            '--output=html',
            `--output-path=${name}`,
            `--chrome-flags=${chromeFlags}`,
            '--quiet',
          ],
          {
            env: {
              ...process.env,
              CHROME_PATH: process.env.CHROME_PATH || chromium.executablePath(),
            },
          },
        );
        const report = JSON.parse(await readFile(`${name}.report.json`, 'utf8'));
        if (report.runtimeError) throw new Error(JSON.stringify(report.runtimeError));
        const network = report.audits['network-requests'].details.items;
        const size = (kind) =>
          network
            .filter((entry) => entry.resourceType === kind)
            .reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
        samples.push({
          performance: report.categories.performance.score,
          accessibility: report.categories.accessibility.score,
          seo: report.categories.seo.score,
          lcpMs: report.audits['largest-contentful-paint'].numericValue,
          cls: report.audits['cumulative-layout-shift'].numericValue,
          tbtMs: report.audits['total-blocking-time'].numericValue,
          mainThreadMs: report.audits['mainthread-work-breakdown'].numericValue,
          transferBytes: report.audits['total-byte-weight'].numericValue,
          jsBytes: size('Script'),
          cssBytes: size('Stylesheet'),
          fontBytes: size('Font'),
        });
        await writeFile(
          `${name}.diagnostics.json`,
          JSON.stringify(
            {
              scripts: network
                .filter((entry) => entry.resourceType === 'Script')
                .map(({ url, transferSize }) => ({ url, transferSize }))
                .sort((a, b) => b.transferSize - a.transferSize),
              longTasks: report.audits['long-tasks']?.details?.items,
              mainThread: report.audits['mainthread-work-breakdown']?.details?.items,
              lcp: report.audits['lcp-breakdown-insight']?.details?.items,
            },
            null,
            2,
          ) + '\n',
        );
      }
      const item = {
        path,
        htmlBytes: bytes,
        warmResponseMedianMs: median(timings.slice(1)),
        ...Object.fromEntries(
          Object.keys(samples[0]).map((key) => [key, median(samples.map((sample) => sample[key]))]),
        ),
        samples,
      };
      results.push(item);
      console.log(JSON.stringify({ ...item, samples: undefined }));
    }
    const summary = {
      measuredAt: new Date().toISOString(),
      node: process.version,
      lighthouse: JSON.parse(await readFile('node_modules/lighthouse/package.json', 'utf8'))
        .version,
      mode: pages ? 'pages' : 'node',
      runs: repeats,
      chromeFlags,
      note: 'Local mobile lab medians. Scores/timings are observations; validate real hardware separately. Payloads are CI contracts.',
      results,
    };
    await writeFile(`${output}/summary.json`, JSON.stringify(summary, null, 2) + '\n');
    if (process.argv.includes('--update-baseline')) {
      if (pages)
        throw new Error('The historical Node baseline must not be replaced by a Pages result');
      await writeFile(
        'tests/fixtures/performance-baseline.json',
        JSON.stringify(summary, null, 2) + '\n',
      );
    }
    if (process.argv.includes('--check-budget')) {
      const baseline = JSON.parse(
        await readFile('tests/fixtures/performance-baseline.json', 'utf8'),
      );
      const budgets = JSON.parse(await readFile('tests/fixtures/performance-budgets.json', 'utf8'));
      const errors = results.flatMap((result) => {
        const previous = baseline.results.find((entry) => entry.path === result.path);
        if (!previous) throw new Error('No baseline for ' + result.path);
        return payloadFailures(result, previous, budgets);
      });
      if (errors.length) throw new Error(errors.join('\n'));
    }
  },
  { pages },
);
