import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });
for (const path of ['/en/harness/', '/ar/harness/', '/docs/en/learning/', '/docs/ar/learning/']) {
  test(`${path}: WCAG automated checks`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1').first()).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}

test('language disclosure works with keyboard and returns focus on Escape', async ({ page }) => {
  await page.goto('/en/harness/');
  const menu = page.locator('.site-locale:visible').first();
  const summary = menu.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(menu.getByRole('link', { name: 'English', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open', '');
  await expect(summary).toBeFocused();
});

test('reduced motion pauses all demonstrations and avoids the decorative particle GPU', async ({
  page,
}) => {
  await page.goto('/en/harness/');
  for (const entrance of await page.locator('.ds-hero-enter, .ds-hero-preview-enter').all()) {
    await expect(entrance).toHaveCSS('opacity', '1');
    await expect(entrance).toHaveCSS('animation-name', 'none');
  }
  for (const card of await page.locator('article').all()) {
    await card.evaluate((node) => node.scrollIntoView({ block: 'center' }));
    await expect(card.locator('figure:visible').first()).toHaveAttribute('data-running', 'false');
    expect(
      await card.evaluate(
        (node) =>
          node
            .getAnimations({ subtree: true })
            .filter((animation) => animation.playState === 'running').length,
      ),
    ).toBe(0);
  }
  await page.locator('.site-extension-footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);
  await expect(page.locator('canvas[data-engine]')).toHaveCount(0);
});
