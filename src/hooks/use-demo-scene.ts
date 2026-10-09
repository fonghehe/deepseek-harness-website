'use client';

import { useEffect, useState } from 'react';

/** Visibility, foreground state, user pause and reduced motion share one clock. */
export function useDemoScene(element: HTMLElement | null, threshold = 0.1) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(preference.matches);
    const updateVisibility = () => setForeground(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(
      (entries) => {
        // Use the current state when initial observation and scrolling share a delivery.
        const entry = entries.at(-1);
        if (entry) setVisible(entry.isIntersecting);
      },
      { threshold },
    );
    if (element) observer.observe(element.querySelector('figure') || element);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [element, threshold]);
  const running = visible && foreground && !reduced && !paused;
  return { running, paused, reduced, toggle: () => setPaused((value) => !value) };
}
