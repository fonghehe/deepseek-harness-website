'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useDemoScene } from '@/hooks/use-demo-scene';

const Playback = createContext(false);
export const useDemoPlayback = () => useContext(Playback);

/** Only playback is hydrated; static illustration markup stays on the server. */
export function CapabilityDemo({
  kind,
  order,
  heading,
  pauseLabel,
  playLabel,
  children,
}: {
  kind: 'plugins' | 'deliverables' | 'workflow' | 'trace';
  order: number;
  heading: ReactNode;
  pauseLabel: string;
  playLabel: string;
  children: ReactNode;
}) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const scene = useDemoScene(element, kind === 'plugins' || kind === 'trace' ? 0.15 : 0.1);
  useEffect(() => {
    const figure = element?.querySelector('figure');
    if (!figure) return;
    figure.dataset.running = String(scene.running);
    figure.dataset.paused = String(!scene.running);
  }, [element, scene.running]);
  return (
    <article
      className="capabilities-card"
      ref={setElement}
      data-entrance="initial"
      data-reveal="card"
      style={{ transitionDelay: `${order * 0.1}s` }}
    >
      {heading}
      <div
        className={`capabilities-media capabilities-element-media ${kind === 'trace' ? 'capabilities-media-grow' : ''}`}
      >
        <button
          className="capabilities-pause-control"
          type="button"
          onClick={scene.toggle}
          aria-pressed={scene.paused}
          aria-label={scene.paused ? playLabel : pauseLabel}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {scene.paused ? (
              <path fill="currentColor" d="m5 3 8 5-8 5Z" />
            ) : (
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                d="M5.5 3.5V12.5M10.5 3.5V12.5"
              />
            )}
          </svg>
        </button>
        <Playback.Provider value={scene.running}>{children}</Playback.Provider>
      </div>
    </article>
  );
}
