import { defineConfig, devices } from '@playwright/test';
const port = process.env.E2E_PORT || '3101';
const pages = process.env.E2E_PAGES === '1';
const crossBrowser = '**/cross-browser.spec.ts';
export default defineConfig({
  testDir: './tests',
  testMatch: pages ? '**/pages.spec.ts' : '**/*.spec.ts',
  testIgnore: pages ? [] : '**/pages.spec.ts',
  outputDir: pages ? './test-results/pages' : './test-results/e2e',
  snapshotPathTemplate: '{testDir}/fixtures/visual/{platform}/{arg}{ext}',
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.015, threshold: 0.2, scale: 'css' } },
  workers: process.env.CI ? 1 : 2,
  timeout: 30_000,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: pages ? [] : ['**/particle-performance.spec.ts', '**/pages.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        ...(process.env.E2E_CHANNEL ? { channel: process.env.E2E_CHANNEL } : {}),
      },
    },
    { name: 'firefox', testMatch: crossBrowser, use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', testMatch: crossBrowser, use: { ...devices['Desktop Safari'] } },
    {
      name: 'chromium-particles',
      testMatch: '**/particle-performance.spec.ts',
      dependencies: ['chromium', 'firefox', 'webkit'],
      use: {
        ...devices['Desktop Chrome'],
        ...(process.env.E2E_CHANNEL ? { channel: process.env.E2E_CHANNEL } : {}),
      },
    },
  ].filter((project) => !pages || project.name === 'chromium'),
  webServer: {
    command: pages
      ? 'node tests/tools/serve-pages.mjs'
      : `pnpm start --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}${pages ? new URL(process.env.SITE_URL || 'https://example.github.io/dsWebsite/').pathname : ''}`,
    reuseExistingServer: process.env.E2E_REUSE_SERVER === '1',
  },
});
