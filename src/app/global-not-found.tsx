import type { Metadata } from 'next';
import { RecoveryPage } from '@/components/shared/recovery-page';

export const metadata: Metadata = {
  title: 'Page not found | DeepSeek Harness',
  robots: { index: false, follow: true },
};
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body>
        <RecoveryPage />
      </body>
    </html>
  );
}
