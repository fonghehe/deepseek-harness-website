import { expect, test } from '@playwright/test';
import { locales, messages } from '../src/i18n';
import content from '../src/i18n/site-content.json';
import navigation from '../docs/navigation.json';

function leaves(value: unknown, prefix = ''): string[] {
  return value && typeof value === 'object'
    ? Object.entries(value).flatMap(([key, child]) => leaves(child, `${prefix}.${key}`))
    : [prefix];
}

for (const [key, locale] of Object.entries(locales)) {
  const language = key as keyof typeof locales;
  const text = messages[language].Harness;
  test(`${key}: dictionary, SSR, hydration, dropdown and added capabilities`, async ({
    page,
    request,
    baseURL,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    expect(leaves(text).sort()).toEqual(leaves(messages.en.Harness).sort());
    const errors: string[] = [];
    const missing: string[] = [];
    page.on('response', (response) => {
      if (response.status() === 404 && response.url().startsWith(baseURL!))
        missing.push(response.url());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await request.get(locale.path);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-language']).toBe(locale.language);
    const responseHtml = await response.text();
    const serverHeading = await page.evaluate(
      (html) => new DOMParser().parseFromString(html, 'text/html').querySelector('h1')?.textContent,
      responseHtml,
    );
    expect(serverHeading).toContain(text.Index.harnessHeroTitlePost);
    await page.goto(locale.path);
    await expect(page.locator('html')).toHaveAttribute('lang', locale.language);
    await expect(page.locator('html')).toHaveAttribute('dir', locale.direction);
    await expect(page.locator('h1')).toContainText(text.Index.harnessHeroTitlePost);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      baseURL! + locale.path,
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      Object.keys(locales).length + 1,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      baseURL! + '/opengraph-image/',
    );
    expect(
      JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)
        .inLanguage,
    ).toBe(locale.language);
    await expect(
      page.getByText(text.DesktopPreview.conversationQuestion, { exact: true }),
    ).toBeVisible();
    const reply = page.locator('.desktop-assistant-message');
    const plain = (value: string) => value.replace(/<\/?(?:strong|cordis)>/g, '');
    await expect(reply.locator('p').first()).toHaveText(
      plain(text.DesktopPreview.conversationIntro),
    );
    await expect(reply.locator('.desktop-reply-full').first()).toHaveText(
      plain(text.DesktopPreview.conversationItem1),
    );
    await page
      .getByRole('button', { name: text.Index.harnessHeroCopy, exact: true })
      .first()
      .click();
    await page.evaluate(() => scrollTo(0, 0));
    const menu = page.locator('.site-locale:visible').first();
    await menu.locator('summary').click();
    await expect(menu.getByRole('link')).toHaveCount(Object.keys(locales).length);
    await expect(menu.getByRole('link', { name: locale.label, exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveAttribute('open', '');
    const feature = page.locator('.site-feature').first();
    await feature.locator('summary').click();
    await expect(feature.locator('.site-feature-body')).toContainText(
      content[language].features[0].detail,
    );
    await expect(page.locator('.site-extension-footer a')).toHaveAttribute('href', locale.docsPath);
    await expect(page.locator('article')).toHaveCount(4);
    expect(errors).toEqual([]);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(reply.locator('.desktop-reply-compact').first()).toHaveText(
      plain(text.DesktopPreview.conversationItem1Compact),
    );
    await page.evaluate(() => scrollTo(0, 0));
    await Promise.all([
      page.waitForEvent('domcontentloaded'),
      page.getByRole('link', { name: 'DeepSeek Harness', exact: true }).click(),
    ]);
    await expect(page).toHaveURL(baseURL! + locale.path);
    await expect(page.locator('h1')).toContainText(text.Index.harnessHeroTitlePost);
    expect(missing).toEqual([]);
  });

  test(`${key}: localized VitePress pages and links`, async ({ page, request, baseURL }) => {
    for (const suffix of ['', 'architecture/', 'highlights/', 'requirements/', 'learning/']) {
      const response = await request.get(locale.docsPath + suffix);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain(`dir="${locale.direction}"`);
      expect(html).toContain(`href="${baseURL}${locale.docsPath}${suffix}"`);
      expect(html.match(/rel="alternate"/g)).toHaveLength(Object.keys(locales).length + 1);
    }
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(locale.docsPath);
    await expect(page.locator('html')).toHaveAttribute('lang', locale.language);
    await expect(page.locator('html')).toHaveAttribute('dir', locale.direction);
    await expect(page.locator('.vp-doc h1')).toHaveText(navigation[language].overview);
    await page
      .locator('.vp-doc')
      .getByRole('link', { name: navigation[language].architecture, exact: true })
      .first()
      .click();
    await expect(page).toHaveURL(baseURL! + locale.docsPath + 'architecture/');
    await expect(page.locator('.vp-doc h1')).toHaveText(navigation[language].architecture);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      baseURL! + locale.docsPath + 'architecture/',
    );
    await expect(page.locator('.docs-product-link')).toHaveAttribute('href', locale.path);
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await expect(page.locator('.VPNavBarHamburger')).toBeVisible();
      const menuBounds = await page.locator('.VPNavBarHamburger').boundingBox();
      expect(menuBounds!.x).toBeGreaterThanOrEqual(0);
      expect(menuBounds!.x + menuBounds!.width).toBeLessThanOrEqual(width);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    expect(errors).toEqual([]);
  });
}

test('documentation entry opens English with or without JavaScript', async ({
  browser,
  baseURL,
}) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled });
    try {
      const page = await context.newPage();
      await page.goto(baseURL + '/docs/');
      await expect(page).toHaveURL(baseURL + '/docs/en/');
      await expect(page.locator('html')).toHaveAttribute('lang', locales.en.language);
      await expect(page.locator('.vp-doc h1')).toHaveText(navigation.en.overview);
    } finally {
      await context.close();
    }
  }
});

test('dropdown switches locale while preserving query and fragment', async ({ page }) => {
  await page.goto('/en/harness/?ref=local#products');
  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('.site-locale:visible').first().locator('summary').click();
  await page.getByRole('link', { name: '日本語', exact: true }).first().click();
  await expect(page).toHaveURL(/\/ja\/harness\/\?ref=local#products$/);
  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('.site-locale:visible').first().locator('summary').click();
  await page.getByRole('link', { name: 'العربية', exact: true }).first().click();
  await expect(page).toHaveURL(/\/ar\/harness\/\?ref=local#products$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('Arabic mobile dropdown, reading direction and code isolation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ar/harness/');
  await page
    .getByRole('button', { name: messages.ar.Harness.Index.harnessOpenMenu, exact: true })
    .click();
  const menu = page.locator('#harness-mobile-menu');
  await menu.locator('.site-locale summary').click();
  await expect(menu.getByRole('link', { name: 'Русский', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', { name: messages.ar.Harness.Index.harnessCloseMenu, exact: true })
    .click();
  await expect(page.locator('pre').first()).toHaveCSS('direction', 'ltr');
  await page.locator('.site-feature summary').first().scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/docs/ar/architecture/');
  await expect(page.locator('.vp-doc')).toHaveCSS('direction', 'rtl');
  await expect(page.locator('.vp-doc pre').first()).toHaveCSS('direction', 'ltr');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('sitemap, robots, favicon, redirects and share image', async ({ request, baseURL }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  expect(xml.match(/<loc>/g)).toHaveLength(Object.keys(locales).length * 6);
  expect(xml).toContain(`${baseURL}/docs/ar/learning/`);
  expect(xml).toContain('hreflang="ar"');
  expect(await (await request.get('/robots.txt')).text()).toContain(
    `Sitemap: ${baseURL}/sitemap.xml`,
  );
  const icon = await (await request.get('/brand/favicon.svg')).text();
  expect(icon).toContain('fill="#000"');
  expect(icon).not.toContain('#4D6BFE');
  const image = await request.get('/opengraph-image/');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/png');
  const buffer = await image.body();
  expect(buffer.readUInt32BE(16)).toBe(1200);
  expect(buffer.readUInt32BE(20)).toBe(630);
  expect((await request.get('/xx/harness/')).status()).toBe(404);
  expect((await request.get('/docs/en/missing/')).status()).toBe(404);
  const duplicate = await request.get('/docs/ar/architecture/index.html', { maxRedirects: 0 });
  expect(duplicate.status()).toBe(308);
  expect(duplicate.headers().location).toBe('/docs/ar/architecture/');
  const alias = await request.get('/zh/harness/', { maxRedirects: 0 });
  expect(alias.status()).toBe(308);
  expect(new URL(alias.headers().location, baseURL).href).toBe(baseURL + '/harness/');
  expect((await request.get('/harness-source/en.html')).status()).toBe(404);
  expect((await request.get('/docs/', { maxRedirects: 0 })).headers().location).toContain(
    '/docs/en/',
  );
});

test('dropdown, extension and Arabic docs work without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL + '/ja/harness/');
  await expect(page.locator('h1')).toContainText(messages.ja.Harness.Index.harnessHeroTitlePost);
  await page.locator('.site-locale:visible').first().locator('summary').click();
  await page.getByRole('link', { name: 'العربية', exact: true }).first().click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.locator('.site-feature summary').first().click();
  await expect(page.locator('.site-feature-body').first()).toBeVisible();
  await page.locator('.site-extension-footer a').click();
  await expect(page).toHaveURL(/\/docs\/ar\/$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await context.close();
});

test('VitePress language dropdown retains the article and updates direction', async ({
  page,
  baseURL,
}) => {
  await page.goto('/docs/de/architecture/');
  await page.locator('.VPNavBarTranslations button').click();
  await page.getByRole('link', { name: 'العربية', exact: true }).click();
  await expect(page).toHaveURL(baseURL! + '/docs/ar/architecture/');
  await expect(page.locator('.vp-doc h1')).toContainText(navigation.ar.architecture);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    baseURL! + '/docs/ar/architecture/',
  );
  await page.locator('.VPNavBarTranslations button').click();
  await page
    .locator('.VPNavBarTranslations')
    .getByRole('link', { name: 'English', exact: true })
    .click();
  await expect(page).toHaveURL(baseURL! + '/docs/en/architecture/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('.vp-doc h1')).toContainText(navigation.en.architecture);
});
