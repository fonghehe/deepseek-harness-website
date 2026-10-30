# Contributing

Contributions to website behavior, accessibility, documentation and translations are welcome. This repository recreates the DeepSeek Harness website; report product runtime or desktop-app issues in the [upstream repository](https://github.com/deepseek-ai/deepseek-harness).

For setup and publishing, see [DEVELOPMENT.md](DEVELOPMENT.md).

## Prepare a change

Keep changes focused and describe the problem, resulting behavior and checks run. Discuss large design or architecture changes in an issue first. Preserve the current sections and maintain React/CSS/WebGL source instead of captured HTML or compiled upstream code.

Run `pnpm verify` for source and documentation changes. Add these checks when relevant:

| Change         | Additional checks                                                           |
| -------------- | --------------------------------------------------------------------------- |
| UI or runtime  | Browser regressions after a production build                                |
| Visual layout  | Desktop, mobile and RTL screenshots or a recording                          |
| Payload or GPU | `pnpm perf:check`                                                           |
| Product URLs   | `pnpm check:links --strict`                                                 |
| Static export  | `pnpm build:pages` and `pnpm check:pages` with the same complete `SITE_URL` |

Use the declared Node/pnpm versions and committed lockfile. Review screenshot and performance baseline changes; do not update them only to clear a failure. Separate local results from remote CI, deployment and real-device checks. List anything still unverified.

## Translate or review

`src/i18n/locales.json` lists supported languages. A new language needs website messages, capability cards, accessible labels, metadata, navigation and all five articles. Keep placeholders, source IDs, technical commands and filenames intact. Code stays LTR inside RTL pages.

Check wrapping, long labels, mobile menus, keyboard focus and mixed-direction text. Use `docs/glossary.json` for terminology. Record a native-language review in `docs/translation-reviews.json` only after checking the website and articles, with reviewer and evidence. An issue should name the language, page or key, and proposed wording.

## Report a problem

Include reproduction steps, browser/version, device/OS, locale, viewport and motion preference. Attach a narrow-screen example for wrapping or overflow. Check keyboard order, Escape, focus recovery, clipboard feedback and animation pause when relevant. Screen readers and real phones need manual checks.

Report sensitive issues privately through [SECURITY.md](SECURITY.md). Do not post credentials or private records. Keep feedback specific and respectful.

## License and releases

Original contributions use the [MIT license](LICENSE). Check [NOTICE.md](NOTICE.md) before redistributing third-party branding and assets.

Maintainers handle dependency releases, repository settings and publication. Before a release, run the complete verification pipeline and record remaining limitations. Both Next.js server and GitHub Pages delivery are supported.
