'use client';
import { RecoveryPage } from '@/components/shared/recovery-page';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <RecoveryPage reset={reset} />;
}
