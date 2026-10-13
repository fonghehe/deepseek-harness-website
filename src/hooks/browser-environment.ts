'use client';

import { useSyncExternalStore } from 'react';

/** Browser signals attach once and release their native listener with the last subscriber. */
function createBrowserSignal(
  getSnapshot: () => boolean,
  listen: (notify: () => void) => () => void,
  serverValue: boolean,
) {
  const subscribers = new Set<() => void>();
  let stop: (() => void) | undefined;
  return {
    getSnapshot,
    getServerSnapshot: () => serverValue,
    subscribe(notify: () => void) {
      subscribers.add(notify);
      if (subscribers.size === 1) {
        stop = listen(() => subscribers.forEach((subscriber) => subscriber()));
      }
      return () => {
        subscribers.delete(notify);
        if (subscribers.size === 0) {
          stop?.();
          stop = undefined;
        }
      };
    },
  };
}

function createMediaSignal(query: string, serverValue: boolean) {
  let media: MediaQueryList | undefined;
  const getMedia = () => (media ??= window.matchMedia(query));
  return createBrowserSignal(
    () => getMedia().matches,
    (notify) => {
      const preference = getMedia();
      preference.addEventListener('change', notify);
      return () => preference.removeEventListener('change', notify);
    },
    serverValue,
  );
}

// Conservative server snapshots keep hydration deterministic and decoration inactive.
const reducedMotion = createMediaSignal('(prefers-reduced-motion: reduce)', true);
const desktopViewport = createMediaSignal('(min-width: 768px)', false);
const pageVisibility = createBrowserSignal(
  () => !document.hidden,
  (notify) => {
    document.addEventListener('visibilitychange', notify);
    return () => document.removeEventListener('visibilitychange', notify);
  },
  false,
);

export const subscribePageVisibility = pageVisibility.subscribe;

export function useReducedMotion() {
  return useSyncExternalStore(
    reducedMotion.subscribe,
    reducedMotion.getSnapshot,
    reducedMotion.getServerSnapshot,
  );
}

export function useDesktopViewport() {
  return useSyncExternalStore(
    desktopViewport.subscribe,
    desktopViewport.getSnapshot,
    desktopViewport.getServerSnapshot,
  );
}

export function usePageForeground() {
  return useSyncExternalStore(
    pageVisibility.subscribe,
    pageVisibility.getSnapshot,
    pageVisibility.getServerSnapshot,
  );
}
