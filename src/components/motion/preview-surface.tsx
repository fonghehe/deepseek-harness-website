'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { scroll, springValue } from 'framer-motion/dom';

/** Motion shares scroll measurements and owns the spring without React frame renders. */
export function PreviewSurface({ children }: { children: ReactNode }) {
  const surface = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = surface.current;
    if (!node) return;
    const hero = node.closest<HTMLElement>('.hero')!;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const progress = springValue<number>(0, { stiffness: 160, damping: 28, mass: 0.6 });
    const unsubscribe = progress.on('change', (value) => {
      const amount = Math.min(1, Math.max(0, value));
      node.style.transform =
        amount < 0.001
          ? 'none'
          : `perspective(1600px) rotateX(${5 * amount}deg) scale(${1 - 0.015 * amount})`;
    });
    let stopScroll: (() => void) | undefined;
    const update = () => {
      stopScroll?.();
      if (preference.matches) {
        progress.jump(0);
        node.style.transform = 'none';
        hero.style.removeProperty('--hero-blur');
      } else {
        stopScroll = scroll(
          (value) => {
            progress.set(Math.min(1, value / 0.65));
            hero.style.setProperty('--hero-blur', `${20 * Math.min(1, value / 0.6)}px`);
          },
          { target: hero, offset: ['start start', 'end start'] },
        );
      }
    };
    update();
    preference.addEventListener('change', update);
    return () => {
      stopScroll?.();
      unsubscribe();
      progress.destroy();
      preference.removeEventListener('change', update);
      hero.style.removeProperty('--hero-blur');
    };
  }, []);
  return (
    <div className="hero-preview-surface" ref={surface}>
      {children}
    </div>
  );
}
