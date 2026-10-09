/** One build-time path contract for Node, Pages and the docs client. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const isPages = process.env.GITHUB_PAGES === 'true';
export const sitePath = (path: string) => basePath + path;
export const sharingImagePath = sitePath(isPages ? '/opengraph-image.png' : '/opengraph-image/');
