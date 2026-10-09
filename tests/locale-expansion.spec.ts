import { expect, test } from '@playwright/test';
import { locales, messages } from '../src/i18n';
import navigation from '../docs/navigation.json';

const rightToLeft = Object.entries(locales).filter(([, locale]) => locale.direction === 'rtl');

for (const [key, locale] of rightToLeft) {
  test(`${key}: narrow RTL controls and mixed-direction documents, including without JavaScript`, async ({
    page,
    browser,
    baseURL,
  }) => {
    const language = key as keyof typeof locales;
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 660 });
    await page.goto(locale.path);
    await page.locator('#harness-mobile-menu > summary').click();
    const menu = page.locator('.site-locale:visible').first();
    await menu.locator('summary').click();
    const last = menu.getByRole('link').last();
    await last.scrollIntoViewIfNeeded();
    const bounds = (await last.boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(660);
    await page.keyboard.press('Escape');
    await expect(menu.locator('summary')).toBeFocused();
    await expect(menu).not.toHaveAttribute('open', '');
    await page.locator('#harness-mobile-menu > summary').click();
    await expect(page.locator('pre').first()).toHaveCSS('direction', 'ltr');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.goto(locale.docsPath + 'architecture/');
    await expect(page.locator('.vp-doc')).toHaveCSS('direction', 'rtl');
    await expect(page.locator('.vp-doc pre').first()).toHaveCSS('direction', 'ltr');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );

    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 320, height: 660 },
    });
    try {
      const staticPage = await context.newPage();
      await staticPage.goto(baseURL + locale.path);
      await expect(staticPage.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(staticPage.locator('h1')).toContainText(
        messages[language].Harness.Index.harnessHeroTitlePost,
      );
      await staticPage.locator('.site-feature summary').first().click();
      await expect(staticPage.locator('.site-feature-body').first()).toBeVisible();
      await staticPage.goto(baseURL + locale.docsPath + 'learning/');
      await expect(staticPage.locator('.vp-doc h1')).toHaveText(navigation[language].learning);
      await expect(staticPage.locator('html')).toHaveAttribute('dir', 'rtl');
      expect(
        await staticPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBe(true);
    } finally {
      await context.close();
    }
  });
}

test('long language menus reach the final edition by keyboard and preserve URL state', async ({
  page,
}) => {
  const lastLocale = Object.values(locales).at(-1)!;
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 660 });
  await page.goto(locales.en.path + '?ref=languages#downloads');
  const menu = page.locator('.site-locale:visible').first();
  await menu.locator('summary').focus();
  await page.keyboard.press('Enter');
  for (let index = 0; index < Object.keys(locales).length; index++)
    await page.keyboard.press('Tab');
  const last = menu.getByRole('link').last();
  await expect(last).toBeFocused();
  const bounds = (await last.boundingBox())!;
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(660);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(
    (url) =>
      url.pathname === lastLocale.path &&
      url.search === '?ref=languages' &&
      url.hash === '#downloads',
  );
  await expect(page.locator('html')).toHaveAttribute('lang', lastLocale.language);
  await expect(page.locator('html')).toHaveAttribute('dir', lastLocale.direction);
});

test('docs retain the article and update SEO between all RTL editions and Traditional Chinese', async ({
  page,
  baseURL,
}) => {
  await page.setViewportSize({ width: 1440, height: 660 });
  await page.goto('/docs/en/architecture/');
  for (const key of [...rightToLeft.map(([language]) => language), 'zh-TW', 'en']) {
    const language = key as keyof typeof locales;
    const locale = locales[language];
    await page.locator('.VPNavBarTranslations button').click();
    const link = page.locator('.VPNavBarTranslations').getByRole('link', {
      name: locale.label,
      exact: true,
    });
    await link.scrollIntoViewIfNeeded();
    expect((await link.boundingBox())!.y + (await link.boundingBox())!.height).toBeLessThanOrEqual(
      660,
    );
    await link.click();
    await expect(page).toHaveURL(baseURL! + locale.docsPath + 'architecture/');
    await expect(page.locator('html')).toHaveAttribute('dir', locale.direction);
    await expect(page.locator('.vp-doc h1')).toHaveText(navigation[language].architecture);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      baseURL! + locale.docsPath + 'architecture/',
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      baseURL! + locale.docsPath + 'architecture/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      Object.keys(locales).length + 1,
    );
  }
});

for (const language of ['th', 'hi', 'bn', 'ur', 'zh-TW'] as const) {
  test(`${language}: mobile text and expanded capability cards stay inside the viewport`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 320, height: 660 });
    await page.goto(locales[language].path);
    await page.evaluate(() => document.fonts.ready);
    if (language === 'th' || language === 'hi' || language === 'bn') {
      // Separating dependent vowel signs from their bases produces dotted-circle glyphs.
      const detachedMarks = await page
        .locator('h1 .heading-latin')
        .evaluateAll((spans) =>
          spans
            .filter((span) => /^\p{M}/u.test(span.textContent || ''))
            .map((span) => span.textContent),
        );
      expect(detachedMarks).toEqual([]);
    }
    const heading = (await page.locator('h1').boundingBox())!;
    expect(heading.x).toBeGreaterThanOrEqual(0);
    expect(heading.x + heading.width).toBeLessThanOrEqual(320);
    for (const card of await page.locator('.site-feature').all())
      await card.locator('summary').click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}
