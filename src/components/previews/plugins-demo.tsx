'use client';

import type { Messages } from '@/i18n';
import { useDemoPlayback } from '../sections/capability-demo';
import { PluginsPreview } from './plugins-preview';

/** Large repeated SVG trees stay in one client boundary to bound the initial RSC payload. */
export function PluginsDemo({ text }: { text: Messages['Harness']['PluginsPreview'] }) {
  const running = useDemoPlayback();
  return <PluginsPreview text={text} running={running} />;
}
