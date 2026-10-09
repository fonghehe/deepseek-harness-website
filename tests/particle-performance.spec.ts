import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 900 } });

test('source-owned particles draw only when visible and stop offscreen', async ({ page }) => {
  await page.addInitScript(() => {
    window.__HARNESS_GRAPHICS_PROFILE__ = true;
    const draw = WebGL2RenderingContext.prototype.drawArrays;
    WebGL2RenderingContext.prototype.drawArrays = function (...args) {
      draw.apply(this, args);
      const pixel = new Uint8Array(4);
      this.readPixels(
        Math.floor(this.drawingBufferWidth / 2),
        Math.floor(this.drawingBufferHeight / 2),
        1,
        1,
        this.RGBA,
        this.UNSIGNED_BYTE,
        pixel,
      );
      (this.canvas as HTMLCanvasElement).dataset.centerRgb = String(pixel[0] + pixel[1] + pixel[2]);
    };
  });
  await page.goto('/harness/');
  const hero = page.locator('canvas[data-scene="hero"]');
  await expect
    .poll(async () => Number(await hero.getAttribute('data-center-rgb')))
    .toBeGreaterThan(0);
  await page.getByRole('heading', { name: '加入 DSH 插件生态' }).scrollIntoViewIfNeeded();
  const canvas = page.locator('canvas[data-scene="cta"]');
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveAttribute('data-engine', /^three\.js(?: r\d+)?$/);
  const frames = async () => Number((await canvas.getAttribute('data-frames')) || 0);
  await expect.poll(frames).toBeGreaterThan(5);
  expect(
    await canvas.evaluate((element: HTMLCanvasElement) => ({
      width: element.width,
      height: element.height,
    })),
  ).toEqual(
    await canvas.evaluate((element: HTMLCanvasElement) => ({
      width: Math.round(element.clientWidth),
      height: Math.round(element.clientHeight),
    })),
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(200);
  const stopped = await frames();
  await page.waitForTimeout(400);
  expect(await frames()).toBe(stopped);
  await page.getByRole('heading', { name: '加入 DSH 插件生态' }).scrollIntoViewIfNeeded();
  await expect.poll(frames).toBeGreaterThan(stopped + 5);
});

test('content and native controls survive an unavailable WebGL context', async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: function (this: HTMLCanvasElement, kind: string, ...options: unknown[]) {
        return kind.startsWith('webgl')
          ? null
          : Reflect.apply(getContext, this, [kind, ...options]);
      },
    });
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/en/harness/');
  await expect(page.locator('h1')).toContainText('Ready to use');
  const canvas = page.locator('.particle-hero');
  await expect(canvas).toBeAttached();
  await expect(canvas).toHaveAttribute('data-status', 'unavailable');
  await expect(canvas).not.toHaveAttribute('data-frames');
  await expect(page.locator('.hero .download-action')).toBeVisible();
  await page.locator('.desktop-nav .site-locale summary').click();
  await expect(page.getByRole('link', { name: '日本語', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('mobile and reduced motion skip decorative allocations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/harness/');
  await expect(page.locator('canvas[data-scene="cta"]')).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('canvas[data-scene="cta"]')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('WebGL context recovery pauses and resumes the existing scene', async ({ page }) => {
  await page.addInitScript(() => {
    window.__HARNESS_GRAPHICS_PROFILE__ = true;
  });
  await page.goto('/en/harness/');
  const canvas = page.locator('.particle-hero');
  await expect(canvas).toHaveAttribute('data-status', 'ready');
  const supported = await canvas.evaluate((node: HTMLCanvasElement) => {
    const context = node.getContext('webgl2');
    const extension = context?.getExtension('WEBGL_lose_context');
    (node as HTMLCanvasElement & { restoreContext?: () => void }).restoreContext = () =>
      extension?.restoreContext();
    extension?.loseContext();
    return !!extension;
  });
  expect(supported).toBe(true);
  await expect(canvas).toHaveAttribute('data-status', 'lost');
  const frames = await canvas.getAttribute('data-frames');
  await page.waitForTimeout(200);
  expect(await canvas.getAttribute('data-frames')).toBe(frames);
  await canvas.evaluate((node) =>
    (node as HTMLCanvasElement & { restoreContext?: () => void }).restoreContext?.(),
  );
  await expect(canvas).toHaveAttribute('data-status', 'ready');
  await expect
    .poll(async () => Number(await canvas.getAttribute('data-frames')))
    .toBeGreaterThan(Number(frames));
});

test('normal production playback avoids per-frame DOM debug counters', async ({ page }) => {
  await page.goto('/en/harness/');
  const canvas = page.locator('.particle-hero');
  await expect(canvas).toHaveAttribute('data-status', 'ready');
  await expect(canvas).not.toHaveAttribute('data-frames');
});
