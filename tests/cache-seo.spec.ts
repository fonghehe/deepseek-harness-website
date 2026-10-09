import { expect, test } from '@playwright/test';

test('document cache revalidates without crossing language or domain boundaries', async ({
  request,
  baseURL,
}) => {
  const response = await request.get('/docs/en/architecture/');
  expect(response.status()).toBe(200);
  const etag = response.headers().etag;
  expect(etag).toMatch(/^W\/".+"$/);
  const cached = await request.get('/docs/en/architecture/', {
    headers: { 'If-None-Match': etag },
  });
  expect(cached.status()).toBe(304);
  expect(await cached.body()).toHaveLength(0);
  expect(cached.headers().etag).toBe(etag);
  const different = await request.get('/docs/ja/architecture/', {
    headers: { 'If-None-Match': etag },
  });
  expect(different.status()).toBe(200);
  const preview = await request.get('/docs/en/architecture/', {
    headers: { host: 'preview.example' },
  });
  expect(await preview.text()).toContain('href="http://preview.example/docs/en/architecture/"');
  expect(preview.headers().etag).not.toBe(etag);
  expect((await request.get('/docs/en/architecture/')).headers().etag).toBe(etag);
  for (const path of ['/en/harness/', '/ar/harness/']) {
    expect(await (await request.get(path)).text()).toContain(`href="${baseURL}${path}"`);
    expect(
      await (await request.get(path, { headers: { host: 'preview.example' } })).text(),
    ).toContain(`href="http://preview.example${path}"`);
  }
});

test('document sharing metadata follows client navigation and Arabic OG remains generic', async ({
  page,
}) => {
  await page.goto('/docs/en/architecture/');
  const title = page.locator('meta[property="og:title"]');
  await expect(title).toHaveAttribute('content', /Architecture/);
  await page
    .locator('.VPSidebar')
    .getByRole('link', { name: 'Learning path', exact: true })
    .click();
  await expect(page).toHaveURL(/\/docs\/en\/learning\/$/);
  await expect(title).toHaveAttribute('content', /Learning path/);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    /\/docs\/en\/learning\/$/,
  );
  await page.goto('/ar/harness/');
  await expect(page.locator('meta[property="og:locale"]')).toHaveCount(0);
  await expect(page.locator('link[hreflang="ar"]')).toHaveCount(1);
});
