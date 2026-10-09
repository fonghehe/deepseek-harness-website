import { expect, test, type Page } from '@playwright/test';

async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('h1')).toBeVisible();
}
async function stage(page: Page, selector: string, time: number) {
  const figure = page.locator(selector);
  await figure.scrollIntoViewIfNeeded();
  await expect(figure).toHaveAttribute('data-running', 'true');
  await expect(page.locator('.capabilities-card').filter({ has: figure })).toHaveCSS(
    'opacity',
    '1',
  );
  await page.evaluate(() => document.fonts.ready);
  await figure.evaluate((node, milliseconds) => {
    for (const animation of node.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = milliseconds;
    }
  }, time);
  return figure;
}

test('desktop hero and collapsed header preserve their visual contract', async ({ page }) => {
  await page.setViewportSize({ width: 1265, height: 712 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/harness/');
  await settle(page);
  await expect(page).toHaveScreenshot('desktop-hero.png');
  await page.evaluate(() => scrollTo(0, 160));
  await expect(page.locator('.desktop-nav .site-locale')).toHaveCount(0);
  await expect(page.locator('.harness-header')).toHaveScreenshot('collapsed-header.png');
});
for (const locale of ['en', 'ar']) {
  test(`${locale}: mobile hero and language menu`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/${locale}/harness/`);
    await settle(page);
    await expect(page).toHaveScreenshot(`mobile-${locale}.png`);
    await page.locator('.mobile-nav > summary').click();
    await page.locator('.mobile-nav .site-locale > summary').click();
    await expect(page).toHaveScreenshot(`mobile-${locale}-menu.png`);
  });
}
for (const [selector, name, times] of [
  ['.plugins-frame', 'plugins', [2000, 19000]],
  ['.deliverables-frame', 'files', [1500, 10000]],
  ['.workflow-frame', 'workflow', [2000, 8000]],
  ['.trace-frame', 'trace', [3000, 12500]],
] as const) {
  test(`${name}: fixed animation stages`, async ({ page }) => {
    await page.setViewportSize({ width: 1265, height: 900 });
    await page.goto('/en/harness/');
    await settle(page);
    for (const time of times) {
      const figure = await stage(page, selector, time);
      await expect(figure).toHaveScreenshot(`${name}-${time}.png`, { animations: 'allow' });
    }
  });
}
