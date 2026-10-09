import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { withSite } from './lib/server.mjs';

await mkdir('test-results/performance/profile', { recursive: true });
await withSite(async (origin) => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const session = await page.context().newCDPSession(page);
    await session.send('Profiler.enable');
    await session.send('Profiler.start');
    await page.goto(origin + '/en/harness/');
    await page.locator('.particle-hero[data-status=ready]').waitFor();
    await page.waitForTimeout(3000);
    const { profile } = await session.send('Profiler.stop');
    await writeFile('test-results/performance/profile/startup.cpuprofile', JSON.stringify(profile));
    const frames = new Map(profile.nodes.map((node) => [node.id, node.callFrame]));
    const costs = new Map();
    profile.samples?.forEach((id, index) => {
      const frame = frames.get(id);
      const key = `${frame.functionName || '(anonymous)'} ${frame.url}:${frame.lineNumber + 1}`;
      costs.set(key, (costs.get(key) || 0) + (profile.timeDeltas?.[index] || 0) / 1000);
    });
    const summary = [...costs]
      .map(([frame, selfMs]) => ({ frame, selfMs }))
      .sort((a, b) => b.selfMs - a.selfMs)
      .slice(0, 30);
    await writeFile(
      'test-results/performance/profile/top-frames.json',
      JSON.stringify(summary, null, 2) + '\n',
    );
    console.log(JSON.stringify(summary.slice(0, 10), null, 2));
  } finally {
    await browser.close();
  }
});
