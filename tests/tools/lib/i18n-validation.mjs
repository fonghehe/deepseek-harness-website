export function leaves(value, prefix = '') {
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).flatMap(([key, child]) =>
        Object.entries(leaves(child, prefix ? `${prefix}.${key}` : key)),
      ),
    );
  return { [prefix]: value };
}
// Catch copied English prose, while allowing shared brands, filenames and short technical labels.
// This detects missing localization, not whether a translation is natural or accurate.
export function validateTranslatedProse(reference, candidate, label) {
  const expected = leaves(reference),
    actual = leaves(candidate);
  return Object.entries(expected)
    .filter(
      ([key, value]) =>
        /(?:Desc(?:Prefix|Suffix)?|description|detail|summary|accessibleLabel|conversationIntro|conversationItem\d(?:Compact)?|overlay)$/.test(
          key,
        ) &&
        typeof value === 'string' &&
        value.trim().length >= 40 &&
        actual[key] === value,
    )
    .map(([key]) => `${label}: untranslated English prose ${key}`);
}
export function validateMessages(reference, candidate, label, { optionalEmpty = [] } = {}) {
  const errors = [];
  const expected = leaves(reference),
    actual = leaves(candidate);
  for (const key of new Set([...Object.keys(expected), ...Object.keys(actual)])) {
    if (!(key in actual) || !(key in expected)) {
      errors.push(`${label}: unexpected/missing key ${key}`);
      continue;
    }
    if (typeof expected[key] !== typeof actual[key]) {
      errors.push(`${label}: type mismatch ${key}`);
      continue;
    }
    if (typeof actual[key] !== 'string') continue;
    if (!actual[key].trim() && expected[key].trim() && !optionalEmpty.includes(key))
      errors.push(`${label}: empty value ${key}`);
    const placeholders = (text) =>
      [...text.matchAll(/\{([\w]+)(?:,[^}]+)?\}/g)].map((match) => match[1]).sort();
    const tags = (text) =>
      [...text.matchAll(/<\/?([A-Za-z][\w-]*)\s*\/?\s*>/g)]
        .filter((match) => match[1].toLowerCase() !== 'br')
        .map((match) => match[0])
        .sort();
    for (const [name, extract] of [
      ['placeholders', placeholders],
      ['rich text tags', tags],
    ])
      if (JSON.stringify(extract(expected[key])) !== JSON.stringify(extract(actual[key])))
        errors.push(`${label}: ${name} mismatch ${key}`);
  }
  return errors;
}
