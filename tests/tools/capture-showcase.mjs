import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { withSite } from './lib/server.mjs';

// Capture this repository's rendered interface; never use upstream screenshots as UI.
await mkdir('test-results/showcase', { recursive: true });
await withSite(async (origin) => {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1265, height: 760 },
      recordVideo: { dir: 'test-results/showcase', size: { width: 960, height: 576 } },
    });
    const page = await context.newPage();
    await page.goto(origin + '/en/harness/');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.particle-hero[data-status=ready]').waitFor();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'public/images/showcase-desktop.png' });
    for (const selector of [
      '.plugins-frame',
      '.deliverables-frame',
      '.workflow-frame',
      '.trace-frame',
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(4000);
    }
    const video = page.video();
    await context.close();
    await video.saveAs('public/images/showcase-demos.webm');
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto(origin + '/en/harness/');
    await mobile.evaluate(() => document.fonts.ready);
    await mobile.locator('.particle-hero[data-status=ready]').waitFor();
    await mobile.waitForTimeout(2000);
    await mobile.screenshot({ path: 'public/images/showcase-mobile.png' });
  } finally {
    await browser.close();
  }
});
console.log(
  'Captured source-owned desktop, mobile and demonstration recording. Review before updating the asset inventory.',
);
