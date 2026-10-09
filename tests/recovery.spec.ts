import { expect, test } from '@playwright/test';

test('missing website and documentation recover in Arabic with a real 404', async ({ page }) => {
  const response = await page.goto('/ar/missing/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { name: 'الصفحة غير موجودة' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'الوثائق', exact: true })).toHaveAttribute(
    'href',
    '/docs/ar/',
  );
  const docs = await page.goto('/docs/ar/missing/');
  expect(docs?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex');
});

test('fallback clipboard keeps focus and announces a successful copy', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Unavailable')) },
    });
    document.execCommand = () => true;
  });
  await page.goto('/en/harness/');
  const command = page.locator('.copy-command').first();
  const button = command.locator('button');
  await button.click();
  await expect(button).toBeFocused();
  await expect(command.locator('output')).not.toBeEmpty();
  await expect(command.locator('output')).toHaveAttribute('aria-live', 'polite');
});
