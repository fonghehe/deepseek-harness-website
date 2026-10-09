import { expect, test } from '@playwright/test';
import { locales } from '../src/i18n/locales';

test.use({ locale: 'zh-CN' });

test('official Chinese content, local assets and no invented product UI', async ({ page }) => {
  const failures: string[] = [];
  const errors: string[] = [];
  page.on('requestfailed', (request) => failures.push(request.url()));
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveURL(/\/harness\/$/);
  await expect(page.locator('h1')).toHaveText('DeepSeek Harness现在，开箱即用');
  await page.locator('.site-locale').first().locator('summary').click();
  await expect(
    page.getByRole('link', { name: locales.zh.label, exact: true }).first(),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'English', exact: true }).first()).toBeVisible();
  await expect(page.getByText('可以介绍一下自己吗？', { exact: true })).toBeVisible();
  await expect(page.locator('body')).not.toContainText('DS Agent');
  await page.getByRole('heading', { name: '加入 DSH 插件生态' }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: '加入 DSH 插件生态' })).toBeVisible();
  await expect.poll(() => page.locator('canvas').count()).toBeGreaterThanOrEqual(2);
  await expect
    .poll(() =>
      page.evaluate(
        () => Array.from(document.images).filter((i) => i.complete && !i.naturalWidth).length,
      ),
    )
    .toBe(0);
  expect(failures).toEqual([]);
  expect(errors).toEqual([]);
});

test('top language switch changes the entire page in both directions', async ({ page }) => {
  await page.goto('/harness/');
  await page.locator('.site-locale').first().locator('summary').click();
  await page.getByRole('link', { name: 'English', exact: true }).first().click();
  await expect(page).toHaveURL(/\/en\/harness\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.locator('h1')).toHaveText('DeepSeek HarnessReady to use. Right now.');
  await expect(page.getByRole('heading', { name: 'Everything is a plugin' })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Join the DSH plugin ecosystem' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Developer docs' })).toHaveAttribute(
    'href',
    'https://deepseek-harness.github.io/deepseek-harness/en/guide/quickstart',
  );
  await page.locator('.site-locale').first().locator('summary').click();
  await page.getByRole('link', { name: locales.zh.label, exact: true }).first().click();
  await expect(page).toHaveURL(/(?<!en)\/harness\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('h1')).toContainText('现在，开箱即用');
});

test('desktop downloads and floating scroll navigation retain official destinations', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      document.documentElement.dataset.downloadTarget = String(url);
      return null;
    };
  });
  await page.goto('/harness/');
  await page.getByRole('button', { name: '桌面端下载选项' }).last().click();
  await page.getByRole('menuitem', { name: /Windows/ }).click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-download-target',
    'https://download.deepseek.com/desktop/dsh-latest-windows-x64.exe',
  );
  await page.getByRole('button', { name: '桌面端下载选项' }).last().click();
  await page.getByRole('menuitem', { name: /macOS/ }).click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-download-target',
    'https://download.deepseek.com/desktop/dsh-latest-macos-arm64.dmg',
  );
  await page.getByRole('heading', { name: '开发者体验', exact: true }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '桌面端下载选项' }).first()).toBeVisible();
});

test('both developer commands can be copied', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => (releaseScripts = resolve));
  await page.route('**/_next/static/chunks/*.js', async (route) => {
    await scriptsReady;
    await route.continue();
  });
  try {
    await page.goto('/harness/', { waitUntil: 'commit' });
    // Server-rendered commands remain readable while interaction waits for hydration.
    await expect(page.locator('.copy-command').first().locator('code')).toHaveText(
      'npx @deepseek-ai/dsh web',
    );
    await expect(page.getByRole('button', { name: '复制', exact: true }).first()).toBeDisabled();
  } finally {
    releaseScripts();
  }
  await expect(page.getByRole('button', { name: '复制', exact: true }).first()).toBeEnabled();
  await page.getByRole('button', { name: '复制', exact: true }).first().click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe('npx @deepseek-ai/dsh web');
  await page.getByRole('button', { name: '复制', exact: true }).last().click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe('git clone https://github.com/deepseek-ai/deepseek-harness');
});

for (const title of ['一切皆插件', '完成各类任务', '适应你的工作方式', '开发者工具']) {
  test(`${title}: original motion progresses, pauses and resumes`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/harness/');
    const card = page
      .locator('article')
      .filter({ has: page.getByRole('heading', { name: title, exact: true }) });
    const figure = card.locator('figure:visible').first();
    await card.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await expect(card).toHaveCSS('transform', 'none');
    await card.hover();
    await expect(figure).toHaveAttribute('data-running', 'true');
    await expect
      .poll(() =>
        figure.evaluate(
          (e) => e.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length,
        ),
      )
      .toBeGreaterThan(0);
    const initial = await figure.evaluate((e) =>
      Number(e.getAnimations({ subtree: true })[0].currentTime),
    );
    await expect
      .poll(() => figure.evaluate((e) => Number(e.getAnimations({ subtree: true })[0].currentTime)))
      .toBeGreaterThan(initial + 100);
    await card.getByRole('button', { name: '暂停演示' }).click();
    await expect(figure).toHaveAttribute('data-running', 'false');
    await expect
      .poll(() => figure.evaluate((e) => e.getAnimations({ subtree: true })[0].playState))
      .toBe('paused');
    const paused = await figure.evaluate((e) =>
      Number(e.getAnimations({ subtree: true })[0].currentTime),
    );
    await page.waitForTimeout(150);
    expect(
      await figure.evaluate((e) => Number(e.getAnimations({ subtree: true })[0].currentTime)),
    ).toBeCloseTo(paused, 0);
    await page.mouse.move(0, 0);
    await expect(card.getByRole('button', { name: '继续演示' })).toHaveCSS(
      'pointer-events',
      'auto',
    );
    await card.getByRole('button', { name: '继续演示' }).click();
    // The upstream renderer also pauses offscreen; keep its figure in view after button auto-scroll.
    await card.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await expect(figure).toHaveAttribute('data-running', 'true');
    await expect
      .poll(() => figure.evaluate((e) => Number(e.getAnimations({ subtree: true })[0].currentTime)))
      .toBeGreaterThan(paused + 100);
  });
}

test('mobile menu, language switching and downloads match original controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/harness/');
  await page.getByRole('button', { name: '打开菜单', exact: true }).click();
  await expect(page.getByRole('button', { name: '关闭菜单', exact: true })).toBeVisible();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: '打开菜单', exact: true })).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  await page.getByRole('button', { name: '打开菜单', exact: true }).click();
  await page
    .locator('#harness-mobile-menu')
    .getByRole('button', { name: '下载桌面端', exact: true })
    .click();
  await expect(
    page
      .locator('#harness-mobile-download-options')
      .getByRole('link', { name: 'Windows（64 位）', exact: true }),
  ).toBeVisible();
  await page.locator('#harness-mobile-menu .site-locale summary').click();
  await page
    .locator('#harness-mobile-menu')
    .getByRole('link', { name: 'English', exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/harness\/$/);
  await expect(page.locator('h1')).toContainText('Ready to use');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
