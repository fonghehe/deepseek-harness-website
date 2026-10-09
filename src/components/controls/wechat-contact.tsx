'use client';

import { sitePath } from '@/config/deployment';
import Image from 'next/image';
import { useEffect, useRef, useState, useId } from 'react';

/** Hover on desktop; click/focus on touch and keyboard. The QR is never a squeezed inline row. */
export function WeChatContact({ label, tooltip }: { label: string; tooltip: string }) {
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const [active, setActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key !== 'Escape') return;
        setDismissed(true);
        setActive(false);
      } else if (!root.current?.contains(event.target as Node)) {
        setActive(false);
        setDismissed(true);
      }
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
    };
  }, []);
  return (
    <div
      className="wechat-contact"
      ref={root}
      data-active={active}
      data-dismissed={dismissed}
      onMouseEnter={() => setDismissed(false)}
      onMouseLeave={() => {
        setActive(false);
        setDismissed(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(false);
      }}
    >
      <button
        type="button"
        aria-label={label}
        aria-describedby={id}
        onFocus={() => setDismissed(false)}
        onClick={() => {
          setDismissed(active);
          setActive(!active);
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <path
            d="M6 1.6001C2.688 1.6001 0 3.7521 0 6.4001C0 7.9121 0.864 9.2481 2.224 10.1281L1.6 12.0001L3.6 10.8001C4.312 11.0481 5.096 11.2001 5.928 11.2001C5.71442 10.6936 5.60296 10.1498 5.6 9.6001C5.6 6.9521 8.104 4.8001 11.2 4.8001C11.352 4.8001 11.504 4.8001 11.648 4.8241C10.832 2.9521 8.624 1.6001 6 1.6001ZM3.6 3.6001C3.81217 3.6001 4.01566 3.68438 4.16569 3.83441C4.31571 3.98444 4.4 4.18792 4.4 4.4001C4.4 4.61227 4.31571 4.81575 4.16569 4.96578C4.01566 5.11581 3.81217 5.2001 3.6 5.2001C3.38783 5.2001 3.18434 5.11581 3.03431 4.96578C2.88429 4.81575 2.8 4.61227 2.8 4.4001C2.8 4.18792 2.88429 3.98444 3.03431 3.83441C3.18434 3.68438 3.38783 3.6001 3.6 3.6001ZM7.6 3.6001C7.81217 3.6001 8.01566 3.68438 8.16569 3.83441C8.31571 3.98444 8.4 4.18792 8.4 4.4001C8.4 4.61227 8.31571 4.81575 8.16569 4.96578C8.01566 5.11581 7.81217 5.2001 7.6 5.2001C7.38783 5.2001 7.18434 5.11581 7.03431 4.96578C6.88429 4.81575 6.8 4.61227 6.8 4.4001C6.8 4.18792 6.88429 3.98444 7.03431 3.83441C7.18434 3.68438 7.38783 3.6001 7.6 3.6001ZM11.2 5.6001C8.552 5.6001 6.4 7.3921 6.4 9.6001C6.4 11.8081 8.552 13.6001 11.2 13.6001C11.736 13.6001 12.248 13.5361 12.728 13.4001L14.4 14.4001L13.904 12.9041C15.16 12.1761 16 10.9681 16 9.6001C16 7.3921 13.848 5.6001 11.2 5.6001ZM9.6 7.6001C9.81217 7.6001 10.0157 7.68438 10.1657 7.83441C10.3157 7.98444 10.4 8.18792 10.4 8.4001C10.4 8.61227 10.3157 8.81575 10.1657 8.96578C10.0157 9.11581 9.81217 9.2001 9.6 9.2001C9.38783 9.2001 9.18434 9.11581 9.03431 8.96578C8.88429 8.81575 8.8 8.61227 8.8 8.4001C8.8 8.18792 8.88429 7.98444 9.03431 7.83441C9.18434 7.68438 9.38783 7.6001 9.6 7.6001ZM12.8 7.6001C13.0122 7.6001 13.2157 7.68438 13.3657 7.83441C13.5157 7.98444 13.6 8.18792 13.6 8.4001C13.6 8.61227 13.5157 8.81575 13.3657 8.96578C13.2157 9.11581 13.0122 9.2001 12.8 9.2001C12.5878 9.2001 12.3843 9.11581 12.2343 8.96578C12.0843 8.81575 12 8.61227 12 8.4001C12 8.18792 12.0843 7.98444 12.2343 7.83441C12.3843 7.68438 12.5878 7.6001 12.8 7.6001Z"
            fillRule="evenodd"
          />
        </svg>
        <span>{label}</span>
      </button>
      <div className="wechat-popup" id={id} role="tooltip">
        <div className="wechat-panel">
          <Image src={sitePath('/images/qr-wechat.png')} width="154" height="154" alt={tooltip} />
          <p>{tooltip}</p>
        </div>
      </div>
    </div>
  );
}
