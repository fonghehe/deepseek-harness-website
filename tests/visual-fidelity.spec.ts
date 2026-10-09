import { locales } from '../src/i18n';
import { expect, test } from '@playwright/test';

// Reference geometry at 1265 CSS pixels; Ubuntu has different verified font advances.
test('desktop geometry follows the reference typography and window dimensions', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1265, height: 712 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/harness/');
  await page.evaluate(() => document.fonts.ready);
  const headingWidth = process.platform === 'linux' ? 472.875 : 478.648;
  const measurements = [
    ['h1', { x: (1265 - headingWidth) / 2, y: 204, width: headingWidth, height: 120 }],
    ['.desktop-window', { x: 122.5, y: 574.805, width: 1020, height: 612 }],
    ['.capabilities-card', { x: 72, y: 1614.805, width: 544.5, height: 517.578 }],
  ] as const;
  for (const [selector, expected] of measurements) {
    const rect = await page.locator(selector).first().boundingBox();
    expect(rect).not.toBeNull();
    for (const key of ['x', 'y', 'width', 'height'] as const)
      expect(Math.abs(rect![key] - expected[key]), `${selector}: ${key}`).toBeLessThan(1);
  }
});

test('language control keeps the chevron centered in LTR and RTL', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1265, height: 712 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const locale of ['en', 'ar']) {
    await page.goto(`/${locale}/harness/`);
    await page.evaluate(() => document.fonts.ready);
    const summary = page.locator('.site-locale:visible > summary').first();
    const bounds = await summary.boundingBox();
    const arrow = await summary.locator('.locale-chevron').boundingBox();
    expect(Math.abs(arrow!.y + arrow!.height / 2 - (bounds!.y + bounds!.height / 2))).toBeLessThan(
      0.5,
    );
    await summary.click();
    await expect(page.locator('.site-locale:visible li')).toHaveCount(Object.keys(locales).length);
    await page.screenshot({ path: testInfo.outputPath(`${locale}-language-menu.png`) });
  }
});

test('mobile geometry preserves reference spacing and container-scaled previews', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/harness/');
  await page.evaluate(() => document.fonts.ready);
  const measurements = [
    ['h1', { x: 24, y: 204, width: 327, height: 144 }],
    ['.desktop-window', { x: 24, y: 659.609, width: 327, height: 504 }],
    ['.capabilities-card', { x: 24, y: 1567.609, width: 327, height: 519.156 }],
  ] as const;
  for (const [selector, expected] of measurements) {
    const rect = await page.locator(selector).first().boundingBox();
    expect(rect).not.toBeNull();
    for (const key of ['x', 'y', 'width', 'height'] as const)
      expect(Math.abs(rect![key] - expected[key]), `${selector}: ${key}`).toBeLessThan(1);
  }
  await page.screenshot({ path: testInfo.outputPath('mobile-en.png') });
});
