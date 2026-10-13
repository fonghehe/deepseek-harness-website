'use client';

import { useEffect, useState } from 'react';
import { usePageForeground, useReducedMotion } from './browser-environment';

/** Visibility, foreground state, user pause and reduced motion share one clock. */
export function useDemoScene(element: HTMLElement | null, threshold = 0.1) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const foreground = usePageForeground();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Use the current state when initial observation and scrolling share a delivery.
        const entry = entries.at(-1);
        if (entry) setVisible(entry.isIntersecting);
      },
      { threshold },
    );
    observer.observe(element.querySelector('figure') || element);
    return () => {
      observer.disconnect();
    };
  }, [element, threshold]);
  const running = visible && foreground && !reduced && !paused;
  return { running, paused, reduced, toggle: () => setPaused((value) => !value) };
}
