'use client';
import { RecoveryPage } from '@/components/shared/recovery-page';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <RecoveryPage reset={reset} />
      </body>
    </html>
  );
}
