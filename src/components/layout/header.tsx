'use client';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Summary must remain the native disclosure trigger; an explicit button role normalizes its accessibility semantics across browsers. */

import { useEffect, useRef, useState } from 'react';
import { animate, type AnimationPlaybackControls } from 'framer-motion/dom';
import type { Locale, Messages } from '@/i18n';
import { locales, isChineseLocale } from '@/i18n/locales';
import product from '@/config/product.json';
import { LocaleMenu } from '../controls/locale-menu';
import { DownloadMenu } from '../controls/download-menu';
import { HarnessWordmark } from './harness-wordmark';

export type HeaderLabels = Pick<
  Messages['Harness']['Index'],
  | 'harnessPreviewBadge'
  | 'harnessHeroTitlePre'
  | 'harnessCloseMenu'
  | 'harnessOpenMenu'
  | 'harnessNavDownload'
  | 'harnessHeroDownloadMac'
  | 'harnessHeroDownloadWindows'
  | 'harnessHeroGithub'
  | 'harnessCtaDocs'
  | 'harnessCtaPlugins'
  | 'harnessCtaPaper'
  | 'harnessHeaderDownload'
  | 'harnessHeroDownload'
  | 'harnessHeroDownloadForWindows'
  | 'harnessHeroDownloadDesktop'
  | 'harnessHeroDownloadOptions'
  | 'harnessHeroDownloadMacNote'
  | 'harnessHeroDownloadWindowsNote'
>;

export function Header({ locale, text }: { locale: Locale; text: HeaderLabels }) {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const [previewVisible, setPreviewVisible] = useState(true);
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const element = bar.current!;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let animation: AnimationPlaybackControls | undefined;
    let previousTarget = '';
    const update = () => {
      const active = window.scrollY > 80;
      setScrolled(active);
      const label = document.querySelector('[data-hero-preview-label]');
      if (label) {
        const bounds = label.getBoundingClientRect();
        setPreviewVisible(bounds.bottom > 0 && bounds.top < innerHeight);
      }
      const width = active ? (innerWidth >= 1560 ? 1180 : 980) : 1280;
      const immediate = motion.matches || innerWidth < 768;
      const targetKey = `${width}:${active}:${immediate}`;
      if (targetKey === previousTarget) return;
      const initial = previousTarget === '';
      previousTarget = targetKey;
      animation?.stop();
      const target = {
        maxWidth: `${width}px`,
        paddingInlineStart: active ? '16px' : '0px',
        paddingInlineEnd: active ? '6px' : '0px',
      };
      if (immediate || initial) Object.assign(element.style, target);
      else animation = animate(element, target, { type: 'spring', stiffness: 180, damping: 28 });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    motion.addEventListener('change', update);
    return () => {
      animation?.stop();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      motion.removeEventListener('change', update);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const background = Array.from(
      document.querySelectorAll<HTMLElement>('main, .harness-footer'),
    ).map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => {
      element.inert = true;
    });
    const close = () => {
      if (mobileMenu.current) mobileMenu.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.key !== 'Escape') return;
      close();
      mobileMenu.current?.querySelector<HTMLElement>('summary')?.focus();
    };
    const screen = matchMedia('(max-width: 767px)');
    const resize = () => {
      if (!screen.matches) close();
    };
    document.addEventListener('keydown', escape);
    screen.addEventListener('change', resize);
    return () => {
      document.documentElement.style.overflow = previous;
      background.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      document.removeEventListener('keydown', escape);
      screen.removeEventListener('change', resize);
    };
  }, [open]);
  const closeMenu = () => {
    if (mobileMenu.current) mobileMenu.current.open = false;
  };
  return (
    <header className={`harness-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ds-container header-inner" ref={bar}>
        <a className="brand" href={locales[locale].path} aria-label="DeepSeek Harness">
          <HarnessWordmark />
          <span
            className="header-preview-badge"
            data-visible={!previewVisible}
            aria-hidden={previewVisible}
          >
            <span>{text.harnessPreviewBadge}</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label={text.harnessHeroTitlePre}>
          <a href={product.links.repository} className="header-github">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.57 7.57 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
            </svg>
            GitHub
          </a>
          {!scrolled && <LocaleMenu locale={locale} />}
          <DownloadMenu text={text} compact />
        </nav>
        <details
          id="harness-mobile-menu"
          ref={mobileMenu}
          className="mobile-nav"
          onToggle={(event) => setOpen(event.currentTarget.open)}
        >
          <summary role="button" aria-label={open ? text.harnessCloseMenu : text.harnessOpenMenu}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </summary>
          <nav aria-label={text.harnessHeroTitlePre}>
            <details className="mobile-downloads">
              <summary role="button">
                {text.harnessNavDownload}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  aria-hidden="true"
                >
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </summary>
              <div id="harness-mobile-download-options">
                <a onClick={closeMenu} href={product.links.macDownload}>
                  {text.harnessHeroDownloadMac}
                </a>
                <a onClick={closeMenu} href={product.links.windowsDownload}>
                  {text.harnessHeroDownloadWindows}
                </a>
              </div>
            </details>
            <a onClick={closeMenu} href={product.links.repository}>
              {text.harnessHeroGithub}
            </a>
            <a
              onClick={closeMenu}
              href={isChineseLocale(locale) ? product.links.docsChinese : product.links.docsEnglish}
            >
              {text.harnessCtaDocs}
            </a>
            <a onClick={closeMenu} href={product.links.communityPlugins}>
              {text.harnessCtaPlugins}
            </a>
            <a onClick={closeMenu} href={product.links.paper}>
              {text.harnessCtaPaper}
            </a>
            {!scrolled && <LocaleMenu locale={locale} />}
          </nav>
        </details>
      </div>
    </header>
  );
}
