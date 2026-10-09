export function deploymentUrl(value = 'https://example.github.io/dsWebsite/') {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password)
    throw new Error('SITE_URL must use HTTP(S) without credentials');
  if (url.search || url.hash || /[^/a-zA-Z0-9._-]/.test(url.pathname))
    throw new Error('SITE_URL must be a clean deployment URL');
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url;
}
