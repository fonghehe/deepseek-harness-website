export function siteOrigin(request: Request) {
  const url = new URL(process.env.SITE_URL || request.url);
  if (!process.env.SITE_URL && request.headers.get('host')) {
    url.port = '';
    url.host = request.headers.get('host')!;
  }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('SITE_URL must use HTTP(S)');
  return url.origin;
}

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
      })[character]!,
  );

export const scriptJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
