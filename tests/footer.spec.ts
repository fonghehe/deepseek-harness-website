import { expect, test } from '@playwright/test';
import { locales, messages, isChineseLocale } from '../src/i18n';
import product from '../src/config/product.json';

for (const [key, locale] of Object.entries(locales)) {
  test(`${key}: footer contact and generated component runtime`, async ({ page }) => {
    const response = await page.goto(locale.path);
    expect(await response!.text()).not.toContain('/harness-source/');
    await page.locator('footer').scrollIntoViewIfNeeded();
    if (isChineseLocale(key as keyof typeof locales)) {
      await page.locator('.wechat-contact button').click();
      await expect(page.locator('.wechat-popup img')).toBeVisible();
      await expect(page.locator('footer .x-contact')).toHaveCount(0);
    } else {
      await expect(page.locator('.wechat-contact')).toHaveCount(0);
      await expect(
        page.getByRole('link', {
          name: messages[key as keyof typeof locales].Harness.Index.harnessFooterTwitter,
          exact: true,
        }),
      ).toHaveAttribute('href', product.links.twitter);
    }
  });
}
