import { expect, test, type Locator } from '@playwright/test';

/** Scrub the real browser animations so GPU load cannot hide a missing staggered reveal. */
async function checkEntrance(cards: Locator) {
  await expect(cards.first()).toHaveAttribute('data-entrance', 'pending');
  await cards.first().evaluate((element) =>
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - window.innerHeight + 100,
      behavior: 'instant',
    }),
  );
  await expect
    .poll(() =>
      cards.evaluateAll((elements) =>
        elements.every((element) =>
          element.getAnimations().some((animation) => {
            if (!(animation.effect instanceof KeyframeEffect)) return false;
            const keyframes = animation.effect.getKeyframes();
            return 'opacity' in keyframes[0];
          }),
        ),
      ),
    )
    .toBe(true);
  const samples = await cards.evaluateAll((elements) =>
    elements.map((element) => {
      const animations = element.getAnimations();
      for (const animation of animations) {
        animation.pause();
        animation.currentTime = Number(animation.effect!.getTiming().delay) / 2;
      }
      const hidden = Number(getComputedStyle(element).opacity);
      for (const animation of animations) {
        const timing = animation.effect!.getTiming();
        animation.currentTime = Number(timing.delay) + Number(timing.duration) / 2;
      }
      const style = getComputedStyle(element);
      return {
        hidden,
        halfway: Number(style.opacity),
        y: new DOMMatrixReadOnly(style.transform).m42,
      };
    }),
  );
  for (const sample of samples) {
    expect(sample.hidden).toBe(0);
    expect(sample.halfway).toBeGreaterThan(0.3);
    expect(sample.halfway).toBeLessThan(0.7);
    expect(sample.y).toBeGreaterThan(0);
  }
  await cards.evaluateAll((elements) =>
    elements.forEach((element) =>
      element.getAnimations().forEach((animation) => animation.finish()),
    ),
  );
  for (const card of await cards.all()) {
    await expect(card).toHaveCSS('opacity', '1');
    await expect(card).toHaveCSS('transform', 'none');
    await expect(card).toHaveCSS('filter', 'none');
  }
}

test('both columns and every feature row fade and move, then reveal only once', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/harness/');
  for (const row of [0, 1]) {
    await checkEntrance(
      page.locator(`.capabilities-card:nth-child(n+${row * 2 + 1}):nth-child(-n+${row * 2 + 2})`),
    );
  }
  for (const row of [0, 1]) {
    await checkEntrance(
      page.locator(`.site-feature:nth-child(n+${row * 3 + 1}):nth-child(-n+${row * 3 + 3})`),
    );
  }
  await checkEntrance(page.locator('.developer-grid > div'));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const cards = page.locator('.capabilities-card');
  await cards.first().evaluate((element) => element.scrollIntoView({ behavior: 'instant' }));
  expect(
    await cards.evaluateAll(
      (elements) => elements.flatMap((element) => element.getAnimations()).length,
    ),
  ).toBe(0);
});

test('mobile RTL cards keep individual entrances as the page scrolls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/ar/harness/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  for (const card of await page.locator('.capabilities-card').all()) await checkEntrance(card);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});

test('keyboard focus makes a delayed card visible immediately', async ({ page }) => {
  await page.goto('/en/harness/');
  const card = page.locator('.site-feature').nth(2);
  await expect(card).toHaveAttribute('data-entrance', 'pending');
  await card.locator('summary').focus();
  await expect(card.locator('summary')).toBeFocused();
  await expect(card).toHaveCSS('opacity', '1');
  await expect(card).toHaveCSS('transform', 'none');
  await card.locator('summary').press('Enter');
  await expect(card).toHaveAttribute('open', '');
});

test('pointer focus preserves the first click on a command inside a pending card', async ({
  page,
}) => {
  await page.goto('/en/harness/');
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => {} },
    }),
  );
  const command = page.locator('.copy-command').first();
  await expect(command.locator('button')).toBeEnabled();
  await expect(page.locator('.developer-grid > div').first()).toHaveAttribute(
    'data-entrance',
    'pending',
  );
  await command.locator('button').click();
  await expect(command.locator('output')).not.toBeEmpty();
});

test('enabling reduced motion cancels active entrances and exposes offscreen content', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/en/harness/');
  const card = page.locator('.capabilities-card').nth(1);
  await expect(card).toHaveAttribute('data-entrance', 'pending');
  await card.evaluate((element) =>
    element.scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  await expect(card).toHaveAttribute('data-entrance', 'entered');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const entrance of await page.locator('[data-entrance]').all()) {
    await expect(entrance).toHaveCSS('opacity', '1');
    await expect(entrance).toHaveCSS('transform', 'none');
    expect(await entrance.evaluate((element) => element.getAnimations().length)).toBe(0);
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(card).toHaveCSS('opacity', '1');
  expect(await card.evaluate((element) => element.getAnimations().length)).toBe(0);
});
