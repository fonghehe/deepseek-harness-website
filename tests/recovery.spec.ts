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

test('batched viewport transitions keep graphics and demonstrations in sync', async ({ page }) => {
  await page.addInitScript(() => {
    const Observer = window.IntersectionObserver;
    window.IntersectionObserver = class extends Observer {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        super((entries, observer) => {
          const transitions = entries.flatMap((entry) => {
            if (!['CANVAS', 'FIGURE'].includes(entry.target.tagName)) return [entry];
            // A quick scroll can queue the previous and current state in one delivery.
            const previous = new Proxy(entry, {
              get(record, property) {
                if (property === 'isIntersecting') return !record.isIntersecting;
                if (property === 'time') return record.time - 1;
                return Reflect.get(record, property, record);
              },
            });
            return [previous, entry];
          });
          callback(transitions, observer);
        }, options);
      }
    };
  });
  await page.goto('/harness/');
  await expect(page.locator('.particle-hero')).toHaveAttribute('data-status', 'ready');
  const demo = page.locator('.plugins-frame');
  await demo.evaluate((element) =>
    element.scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  await expect(demo).toHaveAttribute('data-running', 'true');
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await expect(demo).toHaveAttribute('data-running', 'false');
  await page.locator('.ecosystem').scrollIntoViewIfNeeded();
  await expect(page.locator('.particle-cta')).toHaveAttribute('data-status', 'ready');
});
