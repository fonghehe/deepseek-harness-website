import type { Messages } from '@/i18n';
import { HeadingText } from '../shared/heading-text';
import { PluginsDemo } from '../previews/plugins-demo';
import { DeliverablesPreview } from '../previews/deliverables-preview';
import { WorkflowPreview, type ScheduledLabels } from '../previews/workflow-preview';
import { TracePreview } from '../previews/trace-preview';
import { CapabilityDemo } from './capability-demo';

export function CapabilityDemos({
  text,
  scheduledLabels,
}: {
  text: Messages['Harness'];
  scheduledLabels: ScheduledLabels;
}) {
  const previews = {
    plugins: <PluginsDemo text={text.PluginsPreview} />,
    deliverables: <DeliverablesPreview text={text.DeliverablesPreview} running={false} />,
    workflow: <WorkflowPreview text={text.WorkflowPreview} scheduledLabels={scheduledLabels} />,
    trace: <TracePreview text={text.TracePreview} running={false} />,
  };
  return (
    <section className="ds-container capabilities" aria-labelledby="harness-capabilities-title">
      <h2 id="harness-capabilities-title" data-entrance="initial" data-reveal="heading">
        <HeadingText text={text.Index.harnessWhyTitle} />
      </h2>
      <div className="capabilities-grid">
        {(['plugins', 'deliverables', 'workflow', 'trace'] as const).map((kind, order) => (
          <CapabilityDemo
            key={kind}
            kind={kind}
            order={order}
            pauseLabel={text.Capabilities.pauseAnimation}
            playLabel={text.Capabilities.playAnimation}
            heading={
              <div className="capabilities-copy">
                <h3>
                  <HeadingText text={text.Capabilities[kind].title} />
                </h3>
                <p>{text.Capabilities[kind].description}</p>
              </div>
            }
          >
            {previews[kind]}
          </CapabilityDemo>
        ))}
      </div>
    </section>
  );
}
