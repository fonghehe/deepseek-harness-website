# Contributing

You can help with page fixes, accessibility, documentation and translations. This repository maintains an independent recreation of the DeepSeek Harness website. Report agent or desktop-app issues in the [upstream repository](https://github.com/deepseek-ai/deepseek-harness).

For setup, commands and publishing, read [DEVELOPMENT.md](DEVELOPMENT.md). Coding agents use [AGENTS.md](AGENTS.md).

## Prepare a pull request

Describe the problem and the resulting behavior. Keep changes small; discuss large design or architecture changes in an issue first. Preserve working sections and use maintained source rather than captured HTML or compiled upstream code.

For visual changes, include before/after screenshots or a recording showing desktop, mobile and relevant RTL states. List the checks you ran and anything still unverified.

| Change                        | Checks                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------- |
| Any maintained source or docs | `pnpm verify`                                                                |
| UI or runtime behavior        | Relevant browser tests after a production build                              |
| Payload or GPU rendering      | `pnpm perf:check`                                                            |
| Product destinations          | `pnpm check:links --strict`                                                  |
| GitHub Pages export           | `pnpm build:pages` and `pnpm check:pages`, with the same complete `SITE_URL` |

Use Node from `.node-version`, pnpm from `package.json` and the committed lockfile. Browser tests use Playwright Chromium, Firefox and WebKit; check a real phone separately. Older Node and browser versions are not covered by the project's compatibility checks.

## Add or review a translation

`src/i18n/locales.json` lists supported languages. A new language needs a Harness dictionary, capability cards, accessible labels, navigation, metadata descriptions and all five articles. Preserve placeholders, rich-text tags, commands and filenames. Keep code LTR inside Arabic, Hebrew, Persian and Urdu pages.

Check long text, line wrapping, keyboard focus and mobile menus. `docs/glossary.json` records shared terminology. `docs/translation-reviews.json` records native-language review status; all editions currently need review. Add reviewer and evidence only after a review of the website, labels and articles.

A translation issue should name the language, page or key, and proposed wording. Include a narrow-screen example when the problem is wrapping or overflow.

## Record manual checks

Include the browser/version, device/OS, locale, viewport and motion preference. Check keyboard order, Escape, focus recovery and clipboard announcements. Chinese footers use WeChat QR; other languages link to DeepSeek on X.

Use a screen reader to check long labels and mixed-direction commands, and a real phone to check scrolling and animation. Automated axe and screenshot checks cover selected cases; document what you checked manually.

## Releases and issue reports

Dependency updates should use focused pull requests. Before a versioned release, run the complete pipeline and record remaining limitations. Maintainers handle publishing and repository settings. The project supports both Next.js server and GitHub Pages delivery.

Good first contributions include a translation review, reproducible keyboard issue, mobile wrapping fix or documentation example with source references. Maintainers use labels such as `good first issue`, `translation`, `accessibility`, `performance`, `documentation` and `needs reproduction`.

## Conduct and licensing

Keep feedback specific and respectful. Do not post credentials, private records, harassment or discriminatory content. Maintainers may remove harmful content or close abusive discussions. Report sensitive issues privately through [SECURITY.md](SECURITY.md).

Contributions to original source are [MIT licensed](LICENSE). Review [NOTICE.md](NOTICE.md) before redistributing third-party assets and attribute DeepSeek branding and upstream material to their source.
