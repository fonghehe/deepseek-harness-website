'use client';

import { useEffect, useRef, useState } from 'react';

/** Static 90px connections and three diffuse lights, maintained as vector/CSS source. */
export function CtaBackdrop() {
  const grid = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: -20 });
  useEffect(() => {
    const node = grid.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setOffset({
        x: (width - Math.ceil(width / 90) * 90) / 2,
        y: (height - Math.ceil(height / 90) * 90) / 2,
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="cta-backdrop" aria-hidden="true" data-entrance="initial">
      <svg ref={grid} className="cta-grid" width="100%" height="100%">
        <defs>
          <pattern
            id="cta-connections"
            patternUnits="userSpaceOnUse"
            width="90"
            height="90"
            x={offset.x}
            y={offset.y}
          >
            <path
              d="M10 0H80M0 10V80"
              fill="none"
              stroke="#fff"
              strokeOpacity=".05"
              strokeWidth=".5"
            />
            <rect x="-1.8" y="-1.8" width="3.6" height="3.6" fill="#fff" fillOpacity=".0144" />
            <rect x="88.2" y="-1.8" width="3.6" height="3.6" fill="#fff" fillOpacity=".0144" />
            <rect x="-1.8" y="88.2" width="3.6" height="3.6" fill="#fff" fillOpacity=".0144" />
            <rect x="88.2" y="88.2" width="3.6" height="3.6" fill="#fff" fillOpacity=".0144" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-connections)" />
      </svg>
      <div className="cta-light cta-light-left" />
      <div className="cta-light cta-light-center" />
      <div className="cta-light cta-light-right" />
    </div>
  );
}
