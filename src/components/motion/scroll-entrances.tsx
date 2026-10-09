'use client';

import { useEffect } from 'react';
import { inView, type AnimationPlaybackControls } from 'framer-motion/dom';
import { animate } from 'framer-motion/dom/mini';

/** Once-only Motion reveals preserve distances, staggering and the CTA viewport inset. */
export function ScrollEntrances() {
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-entrance]'));
    const animations = new Map<HTMLElement, AnimationPlaybackControls>();
    const observers: (() => void)[] = [];
    const clearStyles = (element: HTMLElement) => {
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
      element.style.removeProperty('filter');
    };
    const track = (element: HTMLElement, animation: ReturnType<typeof animate>) => {
      animations.set(element, animation);
      void animation.finished.then(() => {
        if (animations.get(element) !== animation) return;
        // Identity matrices / blur(0) still create stacking contexts; restore authored CSS.
        clearStyles(element);
        animations.delete(element);
      });
    };
    const reset = () => {
      observers.splice(0).forEach((stop) => stop());
      animations.forEach((animation, element) => {
        animation.stop();
        clearStyles(element);
      });
      animations.clear();
    };
    const update = () => {
      reset();
      for (const element of elements) {
        if (preference.matches) element.dataset.entrance = 'entered';
        else if (element.dataset.entrance !== 'entered') {
          element.dataset.entrance = 'pending';
          const backdrop = element.classList.contains('cta-backdrop');
          const style = getComputedStyle(element);
          const from = {
            opacity: style.opacity,
            transform: style.transform,
            filter: style.filter,
          };
          observers.push(
            inView(
              element,
              () => {
                element.dataset.entrance = 'entered';
                track(
                  element,
                  animate(
                    element,
                    {
                      opacity: [Number(from.opacity), 1],
                      transform: [from.transform, 'matrix(1, 0, 0, 1, 0, 0)'],
                      filter: [from.filter, 'blur(0px)'],
                    },
                    {
                      duration: backdrop ? 1.2 : 0.6,
                      delay: parseFloat(style.transitionDelay) || 0,
                      ease: backdrop ? 'easeOut' : [0.44, 0, 0.56, 1],
                    },
                  ),
                );
              },
              { margin: backdrop || element.dataset.reveal === 'cta' ? '-100px 0px' : '0px' },
            ),
          );
        }
      }
    };
    update();
    if (!preference.matches) {
      for (const [selector, duration, delay, y, blur] of [
        ['.ds-hero-enter', 0.9, 0, 24, 10],
        ['.hero-description', 0.8, 0.15, 20, 8],
        ['.hero-actions', 0.7, 0.3, 16, 0],
        ['.ds-hero-preview-enter', 0.8, 0.4, 20, 0],
      ] as const) {
        const element = document.querySelector<HTMLElement>(selector);
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
    preference.addEventListener('change', update);
    return () => {
      reset();
      preference.removeEventListener('change', update);
    };
  }, []);
  return null;
}
