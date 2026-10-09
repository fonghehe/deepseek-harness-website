'use client';

import { useEffect, useRef, useState } from 'react';

export function CopyCommand({
  command,
  label,
  copiedLabel,
}: {
  command: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    let success = false;
    try {
      await navigator.clipboard.writeText(command);
      success = true;
    } catch {
      const field = document.createElement('textarea');
      field.value = command;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      try {
        success = document.execCommand('copy');
      } finally {
        field.remove();
        button.current?.focus({ preventScroll: true });
      }
    }
    if (success) {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    }
  }
  return (
    <div className="copy-command">
      <pre dir="ltr">
        <code>{command}</code>
      </pre>
      <button ref={button} onClick={copy} aria-label={copied ? copiedLabel : label}>
        {copied ? copiedLabel : label}
      </button>
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? copiedLabel : ''}
      </output>
    </div>
  );
}
