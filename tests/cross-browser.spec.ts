import { expect, test } from '@playwright/test';
import { messages } from '../src/i18n';

test('language selection remains until header collapse and matches scrolled control heights', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const locale of ['en', 'ar'] as const) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${locale}/harness/`);
    const language = page.locator('.desktop-nav .site-locale');
    const toggle = language.locator('summary');
    await expect(toggle).toBeVisible();
    const topHeight = (await toggle.boundingBox())!.height;
    await toggle.click();
    await expect(language.locator('ul')).toBeVisible();
    await page.mouse.wheel(0, 1);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(1);
    await expect(toggle).toBeVisible();
    await expect(language.locator('ul')).toBeVisible();
    await page.evaluate(() => scrollTo(0, 80));
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(80);
    await expect(toggle).toBeVisible();
    await expect(page.locator('.harness-header')).not.toHaveClass(/is-scrolled/);
    await page.evaluate(() => scrollTo(0, 81));
    await expect(page.locator('.site-locale')).toHaveCount(0);
    await expect(page.locator('.harness-header')).toHaveClass(/is-scrolled/);
    await page.evaluate(() => scrollTo(0, 320));
    const github = page.locator('.header-github');
    const download = page.locator('.download-compact');
    await expect(github).toBeVisible();
    await expect(download).toBeVisible();
    expect((await github.boundingBox())!.height).toBe(topHeight);
    expect((await download.boundingBox())!.height).toBe(topHeight);
    await page.evaluate(() => scrollTo(0, 0));
    await expect(toggle).toBeVisible();
    await expect(language).not.toHaveAttribute('open', '');
    await expect(github).toBeHidden();

    await page.setViewportSize({ width: 390, height: 844 });
    const menu = page.locator('#harness-mobile-menu');
    const menuToggle = menu.locator(':scope > summary');
    await menuToggle.click();
    const mobileLanguage = menu.locator('.site-locale');
    await expect(mobileLanguage.locator('summary')).toBeVisible();
    expect((await mobileLanguage.locator('summary').boundingBox())!.height).toBeGreaterThanOrEqual(
      44,
    );
    await mobileLanguage.locator('summary').click();
    await expect(mobileLanguage.locator('ul')).toBeVisible();
    await menuToggle.click();
    await page.evaluate(() => scrollTo(0, 80));
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(80);
    await menuToggle.click();
    await expect(mobileLanguage.locator('summary')).toBeVisible();
    await menuToggle.click();
    await page.evaluate(() => scrollTo(0, 81));
    await expect(page.locator('.site-locale')).toHaveCount(0);
    await page.evaluate(() => scrollTo(0, 320));
    await expect(page.locator('.site-locale')).toHaveCount(0);
    await menuToggle.click();
    await expect(menu.locator('.site-locale')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await menuToggle.click();
    await page.evaluate(() => scrollTo(0, 0));
    await menuToggle.click();
    await expect(mobileLanguage.locator('summary')).toBeVisible();
    await expect(mobileLanguage).not.toHaveAttribute('open', '');
    await menuToggle.click();
  }
});

test('locale navigation, native disclosures and animation controls', async ({ page }) => {
  // This journey hydrates two complete animated pages while other GPU tests run.
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en/harness/');
  await expect(page.locator('h1')).toContainText('Ready to use');
  const card = page.locator('article').first();
  await card.evaluate((element) => element.scrollIntoView({ block: 'center' }));
  await expect(card).toHaveCSS('transform', 'none');
  await card.hover();
  const figure = card.locator('figure:visible').first();
  await expect(figure).toHaveAttribute('data-running', 'true');
  await card.getByRole('button', { name: messages.en.Harness.Capabilities.pauseAnimation }).click();
  await expect(figure).toHaveAttribute('data-running', 'false');
  await card.getByRole('button', { name: messages.en.Harness.Capabilities.playAnimation }).click();
  await card.evaluate((element) => element.scrollIntoView({ block: 'center' }));
  await expect(figure).toHaveAttribute('data-running', 'true');
  await page.evaluate(() => scrollTo(0, 0));
  const language = page.locator('.site-locale:visible').first();
  await language.locator('summary').click();
  await language.getByRole('link', { name: '日本語', exact: true }).click();
  await expect(page).toHaveURL(/\/ja\/harness\/$/);
  const feature = page.locator('.site-feature').first();
  await feature.locator('summary').click();
  await expect(feature.locator('.site-feature-body')).toBeVisible();
  await page.evaluate(() => scrollTo(0, 0));
  await Promise.all([
    page.waitForEvent('domcontentloaded'),
    page.getByRole('link', { name: 'DeepSeek Harness', exact: true }).click(),
  ]);
  await expect(page).toHaveURL(/\/ja\/harness\/$/);
  expect(errors).toEqual([]);
});

test('Arabic mobile menu and documentation retain reading direction', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ar/harness/');
  await page
    .getByRole('button', { name: messages.ar.Harness.Index.harnessOpenMenu, exact: true })
    .click();
  const menu = page.locator('#harness-mobile-menu');
  await menu.locator('.site-locale summary').click();
  await expect(menu.getByRole('link', { name: 'Deutsch', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/docs/ar/learning/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('.vp-doc pre').first()).toHaveCSS('direction', 'ltr');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('Arabic product and docs remain readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/ar/harness/');
    await expect(page.locator('h1')).toContainText(messages.ar.Harness.Index.harnessHeroTitlePost);
    await page.locator('.site-feature summary').first().click();
    await expect(page.locator('.site-feature-body').first()).toBeVisible();
    await page.goto(baseURL + '/docs/ar/learning/');
    await expect(page.locator('.vp-doc h1')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  } finally {
    await context.close();
  }
});
