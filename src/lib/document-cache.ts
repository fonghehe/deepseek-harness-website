import { createHash } from 'node:crypto';

type Document = { html: string; etag: string };
const documents = new Map<string, { expires: number; value: Promise<Document> }>();
const lifetime = 5 * 60_000;
const capacity = 128;

/** Bounded, deployment-local cache. Failed reads are retried; development stays live. */
export async function cachedDocument(
  key: string,
  render: () => Promise<string>,
): Promise<Document> {
  const now = Date.now();
  const previous = documents.get(key);
  if (process.env.NODE_ENV === 'production' && previous && previous.expires > now) {
    documents.delete(key);
    documents.set(key, previous);
    return previous.value;
  }
  const value = render().then((html) => ({
    html,
    etag: `W/"${createHash('sha256').update(html).digest('base64url')}"`,
  }));
  if (process.env.NODE_ENV === 'production') {
    const entry = { expires: now + lifetime, value };
    documents.delete(key);
    documents.set(key, entry);
    if (documents.size > capacity) documents.delete(documents.keys().next().value!);
    void value.catch(() => {
      if (documents.get(key) === entry) documents.delete(key);
    });
  }
  return value;
}

export function documentResponse(request: Request, document: Document, language: string) {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Language': language,
    'Cache-Control':
      process.env.NODE_ENV !== 'production'
        ? 'no-store'
        : process.env.SITE_URL
          ? 'public, max-age=0, s-maxage=300, stale-while-revalidate=60'
          : 'public, max-age=0, must-revalidate',
    ETag: document.etag,
  };
  const candidates = (request.headers.get('if-none-match') || '')
    .split(',')
    .map((value) => value.trim().replace(/^W\//, ''));
  const matches =
    candidates.includes('*') || candidates.includes(document.etag.replace(/^W\//, ''));
  return new Response(matches ? null : document.html, { status: matches ? 304 : 200, headers });
}
