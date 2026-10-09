import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateMessages, validateTranslatedProse } from '../tools/lib/i18n-validation.mjs';

test('copied English descriptions are rejected without rejecting shared identifiers', () => {
  const english = {
    Index: { harnessFeat2Desc: 'Inspect the complete execution history and its tool calls.' },
    title: 'DeepSeek Harness',
    command: 'npx @deepseek-ai/dsh web',
    terminal: { name: 'Terminal' },
  };
  assert.deepEqual(validateTranslatedProse(english, english, 'fr'), [
    'fr: untranslated English prose Index.harnessFeat2Desc',
  ]);
  const french = {
    ...english,
    Index: { harnessFeat2Desc: 'Consultez l’historique complet et les appels d’outils.' },
  };
  assert.deepEqual(validateTranslatedProse(english, french, 'fr'), []);
});

test('translations retain parameters and rich markup while prose can change', () => {
  assert.deepEqual(
    validateMessages(
      { label: 'Hello {name}, <b>welcome</b>' },
      { label: 'こんにちは {name}、<b>ようこそ</b>' },
      'ja',
    ),
    [],
  );
  assert.match(
    validateMessages(
      { label: 'Hello {name}, <b>welcome</b>' },
      { label: 'مرحبا {user}' },
      'ar',
    ).join('\n'),
    /placeholders mismatch/,
  );
  assert.match(
    validateMessages({ label: 'Hello <b>welcome</b>' }, { label: 'Hello welcome' }, 'en').join(
      '\n',
    ),
    /rich text tags mismatch/,
  );
});
test('missing, extra, empty and mistyped values are rejected', () => {
  assert.equal(validateMessages({ a: 'a', b: 'b' }, { a: '', extra: 'x' }, 'x').length, 3);
  assert.match(validateMessages({ a: 'a' }, { a: 1 }, 'x')[0], /type mismatch/);
});
