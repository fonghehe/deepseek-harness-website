'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { inView, type AnimationPlaybackControls } from 'framer-motion/dom';
import { animate } from 'framer-motion/dom/mini';

function clearStyles(element: HTMLElement): void {
  // Even identity transforms and blur(0) create stacking contexts.
  element.style.removeProperty('opacity');
  element.style.removeProperty('transform');
  element.style.removeProperty('filter');
}

/** Enhance server-rendered content without moving its markup into the client bundle. */
export function ScrollEntrances({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(scope.querySelectorAll<HTMLElement>('[data-entrance]'));
    const animations = new Map<HTMLElement, AnimationPlaybackControls>();
    const observers: (() => void)[] = [];
    function stopAnimation(element: HTMLElement) {
      animations.get(element)?.stop();
      animations.delete(element);
      clearStyles(element);
    }
    function track(element: HTMLElement, animation: AnimationPlaybackControls) {
      animations.set(element, animation);
      void animation.finished.then(() => {
        if (animations.get(element) !== animation) return;
        clearStyles(element);
        animations.delete(element);
      });
    }
    function reset() {
      observers.splice(0).forEach((stop) => stop());
      for (const element of animations.keys()) stopAnimation(element);
    }
    function update() {
      reset();
      if (preference.matches) {
        elements.forEach((element) => (element.dataset.entrance = 'entered'));
        return;
      }
      const pending = elements.filter((element) => element.dataset.entrance !== 'entered');
      // Batch writes before reads. Delays belong to Motion, never to CSS transitions:
      // a transition-delay also delays hiding, causing later cards to be sampled at opacity 1.
      pending.forEach((element) => (element.dataset.entrance = 'pending'));
      const frames = new Map(
        pending.map((element) => {
          const style = getComputedStyle(element);
          return [
            element,
            { opacity: Number(style.opacity), transform: style.transform, filter: style.filter },
          ] as const;
        }),
      );
      function reveal(target: Element) {
        if (!(target instanceof HTMLElement) || target.dataset.entrance === 'entered') return;
        const from = frames.get(target);
        if (!from) return;
        const backdrop = target.classList.contains('cta-backdrop');
        target.dataset.entrance = 'entered';
        track(
          target,
          animate(
            target,
            {
              opacity: [from.opacity, 1],
              transform: [from.transform, 'none'],
              // Ordinary cards only need opacity and transform.
              ...(from.filter !== 'none' && from.filter !== 'blur(0px)'
                ? { filter: [from.filter, 'blur(0px)'] }
                : {}),
            },
            {
              duration: backdrop ? 1.2 : 0.6,
              delay: Number(target.dataset.entranceDelay) || 0,
              ease: backdrop ? 'easeOut' : [0.44, 0, 0.56, 1],
            },
          ),
        );
      }
      function observe(group: HTMLElement[], margin: '0px' | '-100px 0px') {
        if (group.length) observers.push(inView(group, reveal, { margin }));
      }
      const regular: HTMLElement[] = [];
      const inset: HTMLElement[] = [];
      for (const element of pending) {
        const group =
          element.classList.contains('cta-backdrop') || element.dataset.reveal === 'cta'
            ? inset
            : regular;
        group.push(element);
      }
      observe(regular, '0px');
      observe(inset, '-100px 0px');
    }
    update();
    if (!preference.matches) {
      for (const [selector, duration, delay, y, blur] of [
        ['.ds-hero-enter', 0.9, 0, 24, 10],
        ['.hero-description', 0.8, 0.15, 20, 8],
        ['.hero-actions', 0.7, 0.3, 16, 0],
        ['.ds-hero-preview-enter', 0.8, 0.4, 20, 0],
      ] as const) {
        const element = scope.querySelector<HTMLElement>(selector);
        if (!element) continue;
        track(
          element,
          animate(
            element,
            {
              opacity: [0, 1],
              transform: [`translateY(${y}px)`, 'translateY(0px)'],
              filter: [`blur(${blur}px)`, 'blur(0px)'],
            },
            { duration, delay, ease: 'easeOut' },
          ),
        );
      }
    }
    const revealFocused = (event: FocusEvent) => {
      // Pointer focus happens between mousedown and mouseup. Moving the card there
      // can move its button away from the pointer and swallow the resulting click.
      if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return;
      const element = event.target.closest<HTMLElement>('[data-entrance]');
      if (!element || !scope.contains(element)) return;
      element.dataset.entrance = 'entered';
      stopAnimation(element);
    };
    scope.addEventListener('focusin', revealFocused);
    preference.addEventListener('change', update);
    return () => {
      reset();
      // Content remains readable after enhancement is removed, including effect replay.
      elements.forEach((element) => {
        if (element.dataset.entrance === 'pending') element.dataset.entrance = 'initial';
      });
      scope.removeEventListener('focusin', revealFocused);
      preference.removeEventListener('change', update);
    };
  }, []);
  return <main ref={root}>{children}</main>;
}
