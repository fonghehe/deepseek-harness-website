import { locales, messages, isChineseLocale, type Locale } from '@/i18n';
import product from '@/config/product.json';
import { scriptJson } from '@/lib/seo';
import { Header } from './layout/header';
import { HeadingText } from './shared/heading-text';
import { DownloadMenu } from './controls/download-menu';
import { DesktopPreview } from './previews/desktop-preview';
import { PreviewSurface } from './motion/preview-surface';
import { CapabilityDemos } from './sections/capability-demos';
import { FeatureSection } from './sections/feature-section';
import { CopyCommand } from './controls/copy-command';
import { ParticleField } from './graphics/particle-field';
import { Footer } from './layout/footer';
import { CtaBackdrop } from './motion/cta-backdrop';
import { ScrollEntrances } from './motion/scroll-entrances';
import { websiteStructuredData } from '@/lib/website-metadata';

export async function LandingPage({ locale }: { locale: Locale }) {
  const text = messages[locale].Harness;
  const index = text.Index;
  const structuredData = await websiteStructuredData(locale);
  // Format once on the server: ICU versions differ between Node, Chromium and WebKit.
  const scheduleFormat = new Intl.DateTimeFormat(locales[locale].language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    timeZone: 'Asia/Shanghai',
  });
  const scheduledLabels = {
    report: scheduleFormat.format(new Date('2026-09-04T09:00:00.000Z')),
    sales: scheduleFormat.format(new Date('2026-09-01T01:00:00.000Z')),
    tests: scheduleFormat.format(new Date('2026-09-07T02:00:00.000Z')),
  };
  const downloadLabels = {
    harnessHeaderDownload: index.harnessHeaderDownload,
    harnessHeroDownload: index.harnessHeroDownload,
    harnessHeroDownloadForWindows: index.harnessHeroDownloadForWindows,
    harnessHeroDownloadDesktop: index.harnessHeroDownloadDesktop,
    harnessHeroDownloadOptions: index.harnessHeroDownloadOptions,
    harnessHeroDownloadMac: index.harnessHeroDownloadMac,
    harnessHeroDownloadMacNote: index.harnessHeroDownloadMacNote,
    harnessHeroDownloadWindows: index.harnessHeroDownloadWindows,
    harnessHeroDownloadWindowsNote: index.harnessHeroDownloadWindowsNote,
  };
  const headerLabels = {
    ...downloadLabels,
    harnessPreviewBadge: index.harnessPreviewBadge,
    harnessHeroTitlePre: index.harnessHeroTitlePre,
    harnessCloseMenu: index.harnessCloseMenu,
    harnessOpenMenu: index.harnessOpenMenu,
    harnessNavDownload: index.harnessNavDownload,
    harnessHeroGithub: index.harnessHeroGithub,
    harnessCtaDocs: index.harnessCtaDocs,
    harnessCtaPlugins: index.harnessCtaPlugins,
    harnessCtaPaper: index.harnessCtaPaper,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: scriptJson(structuredData) }}
      />
      <Header locale={locale} text={headerLabels} />
      <ScrollEntrances />
      <main>
        <section className="hero" id="downloads">
          <ParticleField />
          <div className="hero-glow" aria-hidden="true" />
          <div className="ds-container hero-content">
            <div className="hero-title ds-hero-enter">
              <p className="hero-badge" data-hero-preview-label>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="hero-badge-sparkle"
                >
                  <defs>
                    <linearGradient
                      id="hero-badge-sparkle"
                      x1="2"
                      y1="22"
                      x2="22"
                      y2="2"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#D2E0FF" stopOpacity=".6" />
                      <stop offset="1" stopColor="#A6C2FF" stopOpacity=".38" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M9 6C10.53 9.82 13.68 12.97 17.5 14.5C13.68 16.03 10.53 19.18 9 23C7.47 19.18 4.32 16.03 .5 14.5C4.32 12.97 7.47 9.82 9 6ZM19.5 1C20.22 2.8 21.7 4.28 23.5 5C21.7 5.72 20.22 7.2 19.5 9C18.78 7.2 17.3 5.72 15.5 5C17.3 4.28 18.78 2.8 19.5 1Z"
                    fill="url(#hero-badge-sparkle)"
                  />
                </svg>
                <span>{index.harnessPreviewBadge}</span>
              </p>
              <h1>
                <span>
                  <HeadingText text={index.harnessHeroTitlePre} />
                </span>
                <br />
                <span>
                  <HeadingText text={index.harnessHeroTitlePost} />
                </span>
              </h1>
            </div>
            <div className="hero-description">
              <p>{index.harnessHeroDesc}</p>
              <p>{index.harnessHeroDesc2}</p>
            </div>
            <div className="hero-actions">
              <DownloadMenu text={downloadLabels} />
            </div>
            <div className="ds-hero-preview-enter">
              <PreviewSurface>
                <DesktopPreview text={text.DesktopPreview} />
              </PreviewSurface>
            </div>
          </div>
        </section>
        <CapabilityDemos text={text} scheduledLabels={scheduledLabels} />
        <FeatureSection locale={locale} />
        <section className="ds-container developer" id="developer">
          <div className="section-heading" data-entrance="initial" data-reveal="heading">
            <h2>
              <HeadingText text={index.harnessUseTitle} />
            </h2>
          </div>
          <div className="developer-grid">
            <div data-entrance="initial" data-reveal="card">
              <h3>
                <HeadingText text={index.harnessUse1Label} />
              </h3>
              <p>{index.harnessUse1Desc}</p>
              <CopyCommand
                command="npx @deepseek-ai/dsh web"
                label={index.harnessHeroCopy}
                copiedLabel={index.harnessHeroCopied}
              />
            </div>
            <div data-entrance="initial" data-reveal="card" style={{ transitionDelay: '0.1s' }}>
              <h3>
                <HeadingText text={index.harnessUse2Label} />
              </h3>
              <p>{index.harnessUse2Desc}</p>
              <CopyCommand
                command={`git clone ${product.links.repository}`}
                label={index.harnessHeroCopy}
                copiedLabel={index.harnessHeroCopied}
              />
            </div>
          </div>
        </section>
        <section className="ecosystem" id="products">
          <ParticleField variant="cta" />
          <CtaBackdrop />
          <div className="ds-container ecosystem-content" data-entrance="initial" data-reveal="cta">
            <h2>
              <HeadingText text={index.harnessCtaTitle} />
            </h2>
            <p>{index.harnessCtaDesc}</p>
            <div className="ecosystem-links">
              <a className="primary-button" href={product.links.repository}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.57 7.57 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
                </svg>
                {index.harnessHeroGithub}
              </a>
              <a
                className="secondary-button"
                href={
                  isChineseLocale(locale) ? product.links.docsChinese : product.links.docsEnglish
                }
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  aria-hidden="true"
                >
                  <path d="M3 1.5h6l4 4v9H3zM9 1.5v4h4M5.5 8h5M5.5 10.5h5" />
                </svg>
                {index.harnessCtaDocs}
              </a>
              <a href={product.links.communityPlugins}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  aria-hidden="true"
                >
                  <path d="M8 1.5 13.5 4.5v7L8 14.5l-5.5-3v-7ZM2.8 4.7 8 7.6l5.2-2.9M8 7.6v6.5" />
                </svg>
                {index.harnessCtaPlugins}
              </a>
              <a href={product.links.paper}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 3.25C6.75 2.25 4.8 1.95 2.25 2.25v10.5C4.8 12.45 6.75 12.75 8 13.75c1.25-1 3.2-1.3 5.75-1V2.25C11.2 1.95 9.25 2.25 8 3.25Zm0 0v10.5" />
                </svg>
                {index.harnessCtaPaper}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} text={index} />
    </>
  );
}
