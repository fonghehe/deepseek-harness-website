import DefaultTheme from 'vitepress/theme';
import { useData, useRoute, type Theme } from 'vitepress';
import { locales as languages } from '../../../src/i18n/locales';
import navigation from '../../navigation.json';
import { defineComponent, h, nextTick, watchEffect } from 'vue';
import './style.css';
import { docsSeoElements } from '../../../src/lib/docs-seo';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component(
      'WebsiteLink',
      defineComponent({
        props: { locale: { type: String, required: true } },
        setup(props, { slots }) {
          return () =>
            h(
              'a',
              {
                href: languages[props.locale as keyof typeof languages]?.path || languages.en.path,
              },
              slots.default?.(),
            );
        },
      }),
    );
  },
  Layout() {
    const { lang } = useData();
    const key =
      (Object.entries(languages).find(
        ([, locale]) => locale.language === lang.value,
      )?.[0] as keyof typeof languages) || 'en';
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () =>
        h('a', { href: languages[key].path, class: 'docs-product-link' }, navigation[key].product),
    });
  },
  setup() {
    const { lang, page } = useData();
    const route = useRoute();
    watchEffect((onCleanup) => {
      let cancelled = false;
      onCleanup(() => {
        cancelled = true;
      });
      const title = page.value.title + ' | DeepSeek Harness';
      const description = page.value.description;
      const currentPath = route.path;
      const currentLang = lang.value;
      if (typeof document === 'undefined') return;
      document.documentElement.dir =
        Object.values(languages).find((locale) => locale.language === currentLang)?.direction ||
        'ltr';
      void nextTick(() => {
        if (cancelled) return;
        const origin = document.documentElement.dataset.siteOrigin || location.origin;
        const relativePath = currentPath.slice(import.meta.env.BASE_URL.length);
        const match = /^([A-Za-z0-9-]+)\/(.*)$/.exec(relativePath);
        if (!match || !(match[1] in languages)) return;
        document.querySelectorAll('[data-docs-seo]').forEach((node) => node.remove());
        for (const { tag, attributes } of docsSeoElements(
          match[1] as keyof typeof languages,
          origin,
          match[2],
          title,
          description,
        )) {
          const node = document.createElement(tag);
          node.dataset.docsSeo = '';
          for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
          document.head.append(node);
        }
      });
    });
  },
} satisfies Theme;
