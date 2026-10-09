'use client';

import { useEffect, useRef, useState } from 'react';
import type { CanvasScene } from './three-renderer';
import { scheduleScene } from './schedule-scene';

declare global {
  interface Window {
    __HARNESS_GRAPHICS_PROFILE__?: boolean;
  }
}

/** Lazy Three.js scenes share visibility gating and a single capped render loop. */
export function ParticleField({ variant = 'hero' }: { variant?: 'hero' | 'cta' }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = matchMedia('(min-width: 768px)');
    const update = () => setEnabled(!motion.matches && (variant === 'hero' || desktop.matches));
    update();
    motion.addEventListener('change', update);
    desktop.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      desktop.removeEventListener('change', update);
    };
  }, [variant]);
  useEffect(() => {
    const element = canvas.current;
    if (!enabled || !element) return;
    let scene: CanvasScene | null = null;
    let loading = false,
      disposed = false,
      ready = false;
    let frame = 0,
      previous = 0,
      visible = false,
      time = 0,
      frames = 0;
    let contextLost = false;
    let cancelStart: (() => void) | undefined;
    const profiling = window.__HARNESS_GRAPHICS_PROFILE__ === true;
    const resize = () => {
      scene?.resize(
        Math.max(1, Math.round(element.clientWidth)),
        Math.max(1, Math.round(element.clientHeight)),
      );
    };
    const draw = (now: number) => {
      if (!visible || document.hidden || contextLost || !scene || !ready) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(draw);
      if (now - previous < 1000 / 30) return;
      time += Math.min(now - (previous || now), 100) / 1000;
      previous = now;
      scene.draw(time);
      if (profiling) element.dataset.frames = String(++frames);
    };
    const initialize = async () => {
      loading = true;
      try {
        const sceneModule =
          variant === 'hero' ? await import('./fluid-scene') : await import('./tile-scene');
        if (disposed) return;
        scene =
          'createFluidScene' in sceneModule
            ? sceneModule.createFluidScene(element)
            : sceneModule.createTileScene(element);
        if (!scene) {
          element.dataset.status = 'unavailable';
          return;
        }
        resize();
        await scene.ready;
        if (disposed) return;
        ready = true;
        element.dataset.status = 'ready';
        synchronize();
      } catch {
        // Loading/context failures leave the static CSS background intact.
        scene?.dispose();
        scene = null;
        element.dataset.status = 'unavailable';
      }
    };
    const synchronize = () => {
      if (visible && !document.hidden && !loading && !cancelStart) {
        cancelStart = scheduleScene(() => {
          cancelStart = undefined;
          void initialize();
        });
      } else if ((!visible || document.hidden) && cancelStart) {
        cancelStart();
        cancelStart = undefined;
      }
      if (visible && !document.hidden && !contextLost && ready && !frame) {
        previous = 0;
        frame = requestAnimationFrame(draw);
      } else if ((!visible || document.hidden || contextLost) && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const lost = () => {
      contextLost = true;
      element.dataset.status = 'lost';
      synchronize();
    };
    const restored = () => {
      contextLost = false;
      element.dataset.status = 'ready';
      // Three.js rebuilds its resources during the same restored event.
      queueMicrotask(synchronize);
    };
    element.addEventListener('webglcontextlost', lost);
    element.addEventListener('webglcontextrestored', restored);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      synchronize();
    });
    observer.observe(element);
    const dimensions = new ResizeObserver(resize);
    dimensions.observe(element);
    resize();
    document.addEventListener('visibilitychange', synchronize);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelStart?.();
      scene?.dispose();
      observer.disconnect();
      dimensions.disconnect();
      document.removeEventListener('visibilitychange', synchronize);
      element.removeEventListener('webglcontextlost', lost);
      element.removeEventListener('webglcontextrestored', restored);
    };
  }, [enabled, variant]);
  return enabled ? (
    <canvas
      ref={canvas}
      className={`particle-field particle-${variant}`}
      data-engine="three.js"
      data-scene={variant}
      aria-hidden="true"
    />
  ) : null;
}
