import { expect, test } from '@playwright/test';
import { locales, messages } from '../src/i18n';

const site = new URL(process.env.SITE_URL || 'https://example.github.io/dsWebsite/');
const prefix = site.pathname.replace(/\/$/, '');

test('Pages root opens the Chinese website and supports language switching', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const response = await page.goto(prefix + '/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(new RegExp(`${prefix}/$`));
  await expect(page.locator('.hero h1')).toContainText(
    messages.zh.Harness.Index.harnessHeroTitlePost,
  );
  await expect(page.locator('.VPContent')).toHaveCount(0);
  const menu = page.locator('.site-locale:visible').first();
  await menu.locator('summary').click();
  await menu.getByRole('link', { name: locales.en.label, exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${prefix}/en/harness/$`));
  await expect(page.locator('.hero h1')).toContainText(
    messages.en.Harness.Index.harnessHeroTitlePost,
  );
});

test('Pages hydrates, loads static inputs and switches all languages within its prefix', async ({
  page,
}) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  const missing: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) missing.push(response.url());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [key, locale] of Object.entries(locales)) {
    await page.goto(prefix + locale.path + '?campaign=pages#downloads');
    await expect(page.locator('h1')).toContainText(
      messages[key as keyof typeof locales].Harness.Index.harnessHeroTitlePost,
    );
    await expect(page.locator('html')).toHaveAttribute('dir', locale.direction);
    await page.evaluate(() => document.fonts.ready);
    const menu = page.locator('.site-locale:visible').first();
    await menu.locator('summary').click();
    await expect(menu.getByRole('link')).toHaveCount(Object.keys(locales).length);
    await menu.getByRole('link', { name: locales.en.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/en/harness/\\?campaign=pages#downloads$`));
  }
  expect(missing).toEqual([]);
  expect(errors).toEqual([]);
  expect(
    await page
      .locator('img')
      .evaluateAll((images) =>
        images.every(
          (image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
        ),
      ),
  ).toBe(true);
});

test('Pages docs open English and retain prefix, article, SEO and RTL after navigation', async ({
  page,
}) => {
  const navigationLocales = Object.entries(locales).filter(
    ([key, locale]) => locale.direction === 'rtl' || key === 'zh-TW',
  );
  await page.goto(prefix + '/docs/');
  await expect(page).toHaveURL(new RegExp(`${prefix}/docs/en/$`));
  await page.goto(prefix + '/docs/en/architecture/');
  await page.getByRole('link', { name: 'Frontend highlights', exact: true }).first().click();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    site.origin + prefix + '/docs/en/highlights/',
  );
  for (const [key, locale] of navigationLocales) {
    await page.locator('.VPNavBarTranslations button').click();
    await page
      .locator('.VPNavBarTranslations')
      .getByRole('link', { name: locale.label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/docs/${key}/highlights/$`));
    await expect(page.locator('html')).toHaveAttribute('dir', locale.direction);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      site.origin + prefix + `/docs/${key}/highlights/`,
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      Object.keys(locales).length + 1,
    );
    await expect(page.locator('.docs-product-link')).toHaveAttribute('href', prefix + locale.path);
  }
  await page.locator('.docs-product-link').click();
  await expect(page).toHaveURL(new RegExp(`${prefix}${navigationLocales.at(-1)![1].path}$`));
});

test('Pages mobile language list stays within viewport and closes before header collapse', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 660 });
  await page.goto(prefix + '/ar/harness/');
  await page.locator('#harness-mobile-menu > summary').click();
  const menu = page.locator('.site-locale:visible').first();
  await menu.locator('summary').click();
  const list = menu.locator('ul');
  expect(
    (await page.locator('#harness-mobile-menu > nav').boundingBox())!.height,
  ).toBeLessThanOrEqual(602);
  const [lastKey, lastLocale] = Object.entries(locales).at(-1)!;
  const lastLanguage = list.getByRole('link', { name: lastLocale.label, exact: true });
  await lastLanguage.scrollIntoViewIfNeeded();
  const box = (await lastLanguage.boundingBox())!;
  expect(box.y + box.height).toBeLessThanOrEqual(660);
  await expect(lastLanguage).toBeVisible();
  await lastLanguage.click();
  await expect(page).toHaveURL(new RegExp(`${prefix}${lastLocale.path}$`));
  await expect(page.locator('h1')).toContainText(
    messages[lastKey as keyof typeof locales].Harness.Index.harnessHeroTitlePost,
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => scrollTo(0, 40));
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(40);
  await expect(page.locator('.site-locale')).toHaveCount(2);
  await page.locator('#harness-mobile-menu > summary').click();
  await expect(page.locator('.site-locale:visible')).toHaveCount(1);
  await page.locator('#harness-mobile-menu > summary').click();
  await page.evaluate(() => scrollTo(0, 120));
  await expect(page.locator('.site-locale:visible')).toHaveCount(0);
});

test('Pages static HTML and docs remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${process.env.E2E_PORT || '3109'}${prefix}/`);
  await expect(page.locator('.hero h1')).toContainText(
    messages.zh.Harness.Index.harnessHeroTitlePost,
  );
  await expect(page).toHaveURL(new RegExp(`${prefix}/$`));
  await page.goto(`http://127.0.0.1:${process.env.E2E_PORT || '3109'}${prefix}/es/harness/`);
  await expect(page.locator('h1')).toContainText(messages.es.Harness.Index.harnessHeroTitlePost);
  await page.locator('.site-locale:visible summary').click();
  await page.getByRole('link', { name: locales.pt.label, exact: true }).click();
  await expect(page.locator('h1')).toContainText(messages.pt.Harness.Index.harnessHeroTitlePost);
  await page.goto(`http://127.0.0.1:${process.env.E2E_PORT || '3109'}${prefix}/docs/`);
  await expect(page).toHaveURL(new RegExp(`${prefix}/docs/en/$`));
  await expect(page.locator('h1')).toBeVisible();
  await context.close();
});

test('Pages returns a localized 404 with prefixed recovery links', async ({ page }) => {
  const response = await page.goto(prefix + '/docs/ar/missing/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { name: 'الصفحة غير موجودة' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'الوثائق', exact: true })).toHaveAttribute(
    'href',
    prefix + '/docs/ar/',
  );
});
