import { defineConfig } from 'vitepress';
import { locales as languages } from '../../src/i18n/locales';
import { sitePath } from '../../src/config/deployment';
import navigation from '../navigation.json';
import product from '../../src/config/product.json';
import descriptions from '../descriptions.json';
import { docsSeoElements } from '../../src/lib/docs-seo';
import type { IncomingMessage, ServerResponse } from 'node:http';

const pages = ['architecture', 'highlights', 'requirements', 'learning'] as const;
const docsBase = (process.env.PAGES_BASE_PATH || '') + '/docs/';

function englishEntry(request: IncomingMessage, response: ServerResponse, next: () => void) {
  const url = new URL(request.url || '/', 'http://vitepress.local');
  if ([docsBase.slice(0, -1), docsBase, `${docsBase}index.html`].includes(url.pathname)) {
    response.writeHead(302, { Location: `${docsBase}en/${url.search}` });
    response.end();
    return;
  }
  next();
}

export default defineConfig({
  title: 'DeepSeek Harness',
  lang: 'en-US',
  description: 'A frontend engineering case study of this Next.js and React product website.',
  base: docsBase,
  outDir: '../public/docs',
  cleanUrls: true,
  // Share locale configuration instead of repeating every language in each article's HTML.
  metaChunk: true,
  head: [['link', { rel: 'icon', href: sitePath('/brand/favicon.svg'), type: 'image/svg+xml' }]],
  vite: {
    define: {
      'process.env.NEXT_PUBLIC_BASE_PATH': JSON.stringify(process.env.NEXT_PUBLIC_BASE_PATH || ''),
      'process.env.GITHUB_PAGES': JSON.stringify(process.env.GITHUB_PAGES || ''),
    },
    plugins: [
      {
        name: 'english-docs-entry',
        configureServer(server) {
          server.middlewares.use(englishEntry);
        },
        configurePreviewServer(server) {
          server.middlewares.use(englishEntry);
        },
      },
    ],
  },
  locales: Object.fromEntries(
    Object.entries(languages).map(([key, language]) => {
      const text = navigation[key as keyof typeof navigation];
      return [
        key,
        {
          label: language.label,
          lang: language.language,
          dir: language.direction as 'ltr' | 'rtl',
          link: `/${key}/`,
          description: text.docs,
          themeConfig: {
            nav: [{ text: text.docs, link: `/${key}/` }],
            sidebar: [
              {
                text: text.menu,
                items: [
                  { text: text.overview, link: `/${key}/` },
                  ...pages.map((page) => ({ text: text[page], link: `/${key}/${page}/` })),
                ],
              },
            ],
            outline: { label: text.outline },
            docFooter: { prev: text.previous, next: text.next },
            sidebarMenuLabel: text.menu,
            returnToTopLabel: text.top,
            skipToContentLabel: text.skipToContent,
            darkModeSwitchLabel: text.appearance,
            darkModeSwitchTitle: text.darkTheme,
            lightModeSwitchTitle: text.lightTheme,
            langMenuLabel: text.languages,
          },
        },
      ];
    }),
  ),
  themeConfig: {
    logo: '/brand/favicon.svg',
    socialLinks: [{ icon: 'github', link: product.links.repository }],
    search: {
      provider: 'local',
      options: {
        locales: Object.fromEntries(
          Object.entries(navigation).map(([key, text]) => [
            key,
            {
              translations: {
                button: { buttonText: text.search, buttonAriaLabel: text.search },
                modal: {
                  displayDetails: text.details,
                  resetButtonTitle: text.reset,
                  backButtonTitle: text.back,
                  noResultsText: text.noResults,
                  footer: {
                    selectText: text.select,
                    navigateText: text.navigate,
                    closeText: text.close,
                  },
                },
              },
            },
          ]),
        ),
      },
    },
  },
  transformHtml(code, id) {
    if (process.env.GITHUB_PAGES !== 'true') return code;
    const key = id
      .replaceAll('\\', '/')
      .split('/')
      .find((part) => part in languages) as keyof typeof languages;
    return code.replace(
      '<html ',
      `<html dir="${languages[key]?.direction || 'ltr'}" data-site-origin="${process.env.SITE_URL}" `,
    );
  },
  transformHead({ pageData }) {
    if (pageData.relativePath === 'index.md') {
      const refresh = pageData.frontmatter.head?.find(
        (entry: [string, Record<string, string>]) => entry[1]['http-equiv'] === 'refresh',
      );
      if (refresh) refresh[1].content = `0;url=${docsBase}en/`;
      return [];
    }
    const key = pageData.relativePath.split('/')[0] as keyof typeof languages;
    const language = languages[key];
    if (!language) return [];
    const head: [string, Record<string, string>][] = [
      ['meta', { name: 'content-language', content: language.language }],
    ];
    if (process.env.GITHUB_PAGES === 'true') {
      const suffix = pageData.relativePath.split('/').slice(1, -1).join('/');
      const page = (suffix || 'overview') as keyof typeof descriptions.en;
      head.push(
        ...docsSeoElements(
          key,
          process.env.SITE_URL!,
          suffix ? suffix + '/' : '',
          navigation[key][page] + ' | DeepSeek Harness',
          descriptions[key][page],
        ).map(
          ({ tag, attributes }) =>
            [tag, { ...attributes, 'data-docs-seo': '' }] as [string, Record<string, string>],
        ),
      );
    }
    return head;
  },
});
