'use client';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Native details preserves a usable download menu before hydration. */
import { useEffect, useRef, useSyncExternalStore, useId } from 'react';
import type { Messages } from '@/i18n';
import product from '@/config/product.json';

export type DownloadLabels = Pick<
  Messages['Harness']['Index'],
  | 'harnessHeaderDownload'
  | 'harnessHeroDownload'
  | 'harnessHeroDownloadForWindows'
  | 'harnessHeroDownloadDesktop'
  | 'harnessHeroDownloadOptions'
  | 'harnessHeroDownloadMac'
  | 'harnessHeroDownloadMacNote'
  | 'harnessHeroDownloadWindows'
  | 'harnessHeroDownloadWindowsNote'
>;

export function DownloadMenu({
  text,
  compact = false,
}: {
  text: DownloadLabels;
  compact?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const disclosure = useRef<HTMLDetailsElement>(null);
  const system = useSyncExternalStore(subscribeSystem, getSystem, () => null);
  const id = useId();
  useEffect(() => {
    const close = (event: KeyboardEvent | PointerEvent | UIEvent) => {
      const menu = disclosure.current;
      if (!menu?.open) return;
      if (event instanceof KeyboardEvent) {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        menu.open = false;
        menu.querySelector('summary')?.focus();
      } else if (event.type === 'resize' || !root.current?.contains(event.target as Node))
        menu.open = false;
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
      window.removeEventListener('resize', close);
    };
  }, []);
  const label = compact
    ? text.harnessHeaderDownload
    : system === 'mac'
      ? text.harnessHeroDownload
      : system === 'windows'
        ? text.harnessHeroDownloadForWindows
        : text.harnessHeroDownloadDesktop;
  return (
    <div
      className={`download-menu ${compact ? 'download-compact' : ''}`}
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget) && disclosure.current)
          disclosure.current.open = false;
      }}
    >
      <a
        className="download-action"
        href={
          system === 'mac'
            ? product.links.macDownload
            : system === 'windows'
              ? product.links.windowsDownload
              : 'https://www.deepseek.com/download/'
        }
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (disclosure.current) disclosure.current.open = false;
        }}
      >
        <DownloadIcon />
        {label}
      </a>
      <details className="download-options" ref={disclosure}>
        <summary
          role="button"
          aria-label={text.harnessHeroDownloadOptions}
          aria-haspopup="menu"
          aria-controls={id}
          onKeyDown={(event) => {
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
            event.preventDefault();
            event.currentTarget.parentElement!.setAttribute('open', '');
            const entries = root.current!.querySelectorAll<HTMLElement>('[role="menuitem"]');
            entries[event.key === 'ArrowUp' ? entries.length - 1 : 0]?.focus();
          }}
        >
          <span className="download-mobile-label">
            <DownloadIcon />
            {text.harnessHeroDownloadDesktop}
          </span>
          <svg
            className="download-chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <path d="m4 6 4 4 4-4" />
          </svg>
        </summary>
        <div
          id={id}
          role="menu"
          tabIndex={-1}
          aria-label={text.harnessHeroDownloadOptions}
          onKeyDown={(event) => {
            if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const entries = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'),
            );
            const current = entries.indexOf(document.activeElement as HTMLElement);
            const next =
              event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? entries.length - 1
                  : (current + (event.key === 'ArrowDown' ? 1 : -1) + entries.length) %
                    entries.length;
            entries[next]?.focus();
          }}
        >
          {[
            [
              product.links.macDownload,
              text.harnessHeroDownloadMac,
              text.harnessHeroDownloadMacNote,
            ],
            [
              product.links.windowsDownload,
              text.harnessHeroDownloadWindows,
              text.harnessHeroDownloadWindowsNote,
            ],
          ].map(([href, title, note]) => (
            <a
              key={href}
              href={href}
              role="menuitem"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                window.open(href, '_blank', 'noopener,noreferrer');
                if (disclosure.current) disclosure.current.open = false;
              }}
            >
              <span>{title}</span>
              <small>{note}</small>
            </a>
          ))}
        </div>
      </details>
    </div>
  );
}
function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v8m-3-3 3 3 3-3M3 10v3h10v-3" />
    </svg>
  );
}

function subscribeSystem() {
  return () => {};
}
function getSystem(): 'mac' | 'windows' | null {
  const agent = navigator.userAgent;
  return /Macintosh|Mac OS X/.test(agent) ? 'mac' : /Windows/.test(agent) ? 'windows' : null;
}
