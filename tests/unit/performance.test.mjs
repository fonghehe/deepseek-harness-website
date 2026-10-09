import { test } from 'node:test';
import assert from 'node:assert/strict';
import { payloadFailures, median } from '../tools/lib/performance.mjs';
import { deploymentUrl } from '../tools/lib/deployment.mjs';

test('absolute budgets detect regressions hidden by a larger historical payload', () => {
  const previous = { htmlBytes: 1000, transferBytes: 2000 };
  const budgets = {
    htmlGrowth: 1.2,
    transferGrowth: 1.25,
    absolute: { jsBytes: 300, transferBytes: 700 },
    pages: {},
  };
  const result = { path: '/en/', htmlBytes: 500, transferBytes: 800, jsBytes: 350 };
  assert.equal(payloadFailures(result, previous, budgets).length, 2);
  assert.equal(
    payloadFailures({ ...result, transferBytes: 650, jsBytes: 290 }, previous, budgets).length,
    0,
  );
});

test('repeated measurements report a median without changing the samples', () => {
  const values = [900, 1, 3];
  assert.equal(median(values), 3);
  assert.deepEqual(values, [900, 1, 3]);
  assert.equal(median([10, 2]), 6);
});

test('a documented article HTML ceiling retains independent JavaScript limits', () => {
  const previous = { htmlBytes: 100, transferBytes: 1000 };
  const budgets = {
    htmlGrowth: 1.2,
    transferGrowth: 1.25,
    absolute: { jsBytes: 50 },
    pages: { '/docs/': { htmlBytes: 200 } },
  };
  assert.deepEqual(
    payloadFailures(
      { path: '/docs/', htmlBytes: 180, transferBytes: 500, jsBytes: 40 },
      previous,
      budgets,
    ),
    [],
  );
  assert.equal(
    payloadFailures(
      { path: '/docs/', htmlBytes: 180, transferBytes: 500, jsBytes: 60 },
      previous,
      budgets,
    ).length,
    1,
  );
});

test('publication paths support roots and subpaths while rejecting credentials and fragments', () => {
  assert.equal(deploymentUrl('https://owner.github.io/project').pathname, '/project/');
  assert.equal(deploymentUrl('https://example.com/').pathname, '/');
  for (const url of [
    'https://user:secret@example.com/',
    'https://example.com/#section',
    'https://example.com/?q=1',
    'file:///tmp/out',
  ])
    assert.throws(() => deploymentUrl(url));
});
