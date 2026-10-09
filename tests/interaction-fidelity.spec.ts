import { expect, test, type Page } from '@playwright/test';

async function stage(page: Page, selector: string, time: number) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await expect(page.locator(selector)).toHaveAttribute('data-running', 'true');
  await page.locator(selector).evaluate((element, milliseconds) => {
    for (const animation of element.getAnimations({ subtree: true })) {
      animation.pause();
      // Delays belong to the shared timeline, including the timer's staggered digits.
      animation.currentTime = milliseconds;
    }
  }, time);
}

test('WeChat caption fits one line and QR supports hover, keyboard and outside dismissal', async ({
  page,
}) => {
  await page.goto('/harness/');
  const trigger = page.getByRole('button', { name: '微信公众号', exact: true });
  await trigger.scrollIntoViewIfNeeded();
  await expect(trigger).toHaveCSS('white-space', 'nowrap');
  const bounds = await trigger.boundingBox();
  expect(bounds!.width).toBeGreaterThan(90);
  expect(bounds!.height).toBeLessThan(25);
  await trigger.hover();
  const popup = page.getByRole('tooltip');
  await expect(popup).toBeVisible();
  const image = await popup.locator('img').boundingBox();
  const panel = await popup.boundingBox();
  expect(image!.width).toBeLessThan(panel!.width);
  await page.mouse.move(800, 400);
  await expect(popup).toBeHidden();
  await trigger.focus();
  await expect(popup).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(popup).toBeHidden();
  await trigger.click();
  await expect(popup).toBeVisible();
  await page.locator('.ecosystem h2').click();
  await expect(popup).toBeHidden();
});

test('download split control keeps primary action and keyboard platform menu separate', async ({
  page,
}) => {
  await page.goto('/harness/');
  const root = page.locator('.hero-actions .download-menu');
  await expect(root.locator('.download-action')).toHaveAttribute('target', '_blank');
  const toggle = root.getByRole('button', { name: '桌面端下载选项' });
  await toggle.press('ArrowDown');
  await expect(root.getByRole('menuitem').first()).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(root.getByRole('menuitem').last()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(root.getByRole('menu')).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('h1').click();
  await expect(root.getByRole('menu')).toBeHidden();
});

test('scroll entrances reveal independent cards without a completed page-load animation overriding them', async ({
  page,
}) => {
  await page.goto('/harness/');
  const card = page.locator('.capabilities-card').first();
  await expect(card).toHaveAttribute('data-entrance', 'pending');
  await expect(card).toHaveCSS('opacity', '0');
  await expect(card).toHaveCSS('animation-name', 'none');
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute('data-entrance', 'entered');
  await expect(card).toHaveCSS('opacity', '1');
  await expect(page.locator('.header-preview-badge')).toHaveAttribute('data-visible', 'true');
  await expect
    .poll(() =>
      page.locator('.header-inner').evaluate((e) => Math.round(e.getBoundingClientRect().width)),
    )
    .toBe(980);
});

test('plugin timeline shows prompt, tool creation, floating widget and installed plugin in order', async ({
  page,
}) => {
  await page.goto('/harness/');
  await stage(page, '.plugins-frame', 2000);
  await expect(page.locator('.plugins-conversation')).toHaveCSS('opacity', '1');
  await expect(page.locator('.plugins-manager')).toHaveCSS('opacity', '0');
  await stage(page, '.plugins-frame', 6000);
  await expect(page.locator('.plugins-chat-view')).toHaveCSS('opacity', '1');
  await expect(page.locator('.plugins-process')).toHaveCSS('opacity', '1');
  await stage(page, '.plugins-frame', 10000);
  await expect(page.locator('.plugins-timer-widget')).toHaveCSS('opacity', '1');
  await expect(page.locator('.plugins-widget-expanded')).toHaveCSS('opacity', '1');
  await stage(page, '.plugins-frame', 19000);
  await expect(page.locator('.plugins-manager')).toHaveCSS('opacity', '1');
  await expect(page.locator('.plugins-widget-compact')).toHaveCSS('opacity', '1');
});

test('trace timeline has real flex layout, reveals rows and switches result to timing details', async ({
  page,
}) => {
  await page.goto('/harness/');
  await stage(page, '.trace-frame', 7000);
  await expect(page.locator('.trace-canvas')).toHaveCSS('display', 'flex');
  await expect(page.locator('.trace-toolbar')).toHaveCSS('opacity', '1');
  const ledger = await page.locator('.trace-list-viewport').boundingBox();
  expect(ledger!.height).toBeGreaterThan(100);
  await stage(page, '.trace-frame', 13000);
  await expect(page.locator('.trace-details')).toHaveCSS('opacity', '1');
  await expect(page.locator('.trace-tab-result')).toHaveCSS('opacity', '1');
  await stage(page, '.trace-frame', 14000);
  await expect(page.locator('.trace-tab-timing')).toHaveCSS('opacity', '1');
  await expect(page.locator('.trace-tab-result')).toHaveCSS('opacity', '0');
});

test('Chinese CTA retains four desktop links in one row; English retains its two-row layout', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/harness/');
  const links = page.locator('.ecosystem-links > a');
  const rows = await links.evaluateAll((elements) =>
    elements.map((e) => e.getBoundingClientRect().y),
  );
  expect(new Set(rows).size).toBe(1);
  await expect(page.locator('.ecosystem-content > p')).toHaveCSS('font-size', '16px');
  await page.goto('/en/harness/');
  const englishRows = await links.evaluateAll((elements) =>
    elements.map((e) => e.getBoundingClientRect().y),
  );
  expect(new Set(englishRows).size).toBe(2);
});

test('CTA shader links and actually paints translucent tiles', async ({ page }) => {
  await page.addInitScript(() => {
    const original = WebGL2RenderingContext.prototype.drawArraysInstanced;
    WebGL2RenderingContext.prototype.drawArraysInstanced = function (...args) {
      original.apply(this, args);
      const pixels = new Uint8Array(this.drawingBufferWidth * this.drawingBufferHeight * 4);
      this.readPixels(
        0,
        0,
        this.drawingBufferWidth,
        this.drawingBufferHeight,
        this.RGBA,
        this.UNSIGNED_BYTE,
        pixels,
      );
      let painted = 0;
      for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0) painted++;
      (this.canvas as HTMLCanvasElement).dataset.paintedPixels = String(painted);
      (this.canvas as HTMLCanvasElement).dataset.glError = String(this.getError());
    };
  });
  await page.goto('/harness/');
  await page.locator('.ecosystem').scrollIntoViewIfNeeded();
  const canvas = page.locator('.particle-cta');
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveAttribute('data-gl-error', '0');
  await expect
    .poll(async () => Number(await canvas.getAttribute('data-painted-pixels')))
    .toBeGreaterThan(0);
});

test('file carousel advances while the diff panel remains stationary', async ({ page }) => {
  await page.goto('/harness/');
  await stage(page, '.deliverables-frame', 1000);
  const before = await page.locator('.deliverables-file-track').boundingBox();
  const diffBefore = await page.locator('.deliverables-diff-panel').boundingBox();
  const frameBefore = await page.locator('.deliverables-frame').boundingBox();
  await stage(page, '.deliverables-frame', 5500);
  const after = await page.locator('.deliverables-file-track').boundingBox();
  const diffAfter = await page.locator('.deliverables-diff-panel').boundingBox();
  const frameAfter = await page.locator('.deliverables-frame').boundingBox();
  expect(after!.y).toBeLessThan(before!.y - 50);
  // The card's scroll entrance can still move the entire frame between samples.
  expect(diffAfter!.y - frameAfter!.y).toBeCloseTo(diffBefore!.y - frameBefore!.y, 0);
});

test('workflow reveals arguments, completion and all three scheduled scenarios', async ({
  page,
}) => {
  await page.goto('/harness/');
  await stage(page, '.workflow-frame', 3500);
  await expect(page.locator('.workflow-input')).toHaveCSS('opacity', '1');
  await expect(page.locator('.workflow-result')).toHaveCSS('opacity', '0');
  await stage(page, '.workflow-frame', 9000);
  await expect(page.locator('.workflow-completion')).toHaveCSS('opacity', '1');
  await expect(page.locator('.workflow-result')).toHaveCSS('opacity', '1');
  for (const scenario of ['sales', 'tests', 'report']) {
    await page.locator('.workflow-frame').evaluate((element) => {
      const story = element.querySelector('.workflow-story')!;
      const animation = story
        .getAnimations()
        .find((item) => (item as CSSAnimation).animationName === 'workflow-story-cycle')!;
      // Cross the next boundary monotonically; seeking backwards can emit another iteration.
      animation.currentTime = (Math.floor(Number(animation.currentTime) / 11000) + 1) * 11000 - 50;
      animation.play();
    });
    await expect(page.locator('.workflow-frame')).toHaveAttribute('data-scenario', scenario);
  }
});
