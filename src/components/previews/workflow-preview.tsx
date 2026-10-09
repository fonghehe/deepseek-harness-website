'use client';

import { useState } from 'react';
import type { Messages } from '@/i18n';
import { useDemoPlayback } from '../sections/capability-demo';

export type ScheduledLabels = Record<'report' | 'sales' | 'tests', string>;

export function WorkflowPreview({
  text,
  scheduledLabels,
}: {
  text: Messages['Harness']['WorkflowPreview'];
  scheduledLabels: ScheduledLabels;
}) {
  const running = useDemoPlayback();
  const scenarios = ['report', 'sales', 'tests'] as const;
  const [position, setPosition] = useState(0);
  const scenarioKey = scenarios[position];
  const scenario = text.scenarios[scenarioKey];
  const schedule =
    scenarioKey === 'sales'
      ? { time: '09:00:00', time_zone: 'Asia/Shanghai' }
      : {
          time: scenarioKey === 'report' ? '17:00:00' : '10:00:00',
          time_zone: 'Asia/Shanghai',
          weekdays: scenarioKey === 'report' ? [5] : [1],
        };
  const scheduleKind = scenarioKey === 'sales' ? 'daily' : 'weekly';
  const scheduledLabel = scheduledLabels[scenarioKey];
  return (
    <figure
      className="workflow-frame"
      aria-label={text.accessibleLabel}
      data-scenario={scenarioKey}
      data-running={running}
      data-paused={!running}
    >
      <div className="workflow-canvas" aria-hidden="true">
        <div
          className="workflow-story"
          onAnimationIteration={(event) => {
            if (
              event.target === event.currentTarget &&
              event.animationName === 'workflow-story-cycle'
            )
              setPosition((value) => (value + 1) % scenarios.length);
          }}
        >
          <div className="workflow-user-message">{scenario.request}</div>
          <div className="workflow-process">
            <div className="workflow-process-heading">
              <span className="workflow-heading-labels">
                <span className="workflow-working-label">
                  <span className="workflow-status-text">{text.working}</span>
                  <span className="workflow-process-chevron">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      aria-hidden="true"
                    >
                      <path d="M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6"></path>
                    </svg>
                  </span>
                </span>
                <span className="workflow-finished-label">
                  <span className="workflow-status-text">{text.finished}</span>
                  <span className="workflow-process-chevron">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      aria-hidden="true"
                    >
                      <path d="M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6"></path>
                    </svg>
                  </span>
                </span>
              </span>
            </div>
            <div className="workflow-disclosure">
              <div className="workflow-disclosure-inner">
                <div className="workflow-tool" data-tool="schedule_create">
                  <div className="workflow-tool-row">
                    <span className="workflow-tool-icon">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        aria-hidden="true"
                      >
                        <path d="M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6"></path>
                      </svg>
                    </span>
                    <span>{text.toolTitle}</span>
                    <span className="workflow-separator"></span>
                    <span className="workflow-tool-summary">
                      <span className="workflow-pending-summary">{scenario.prompt}</span>
                      <span className="workflow-settled-summary">{scenario.title}</span>
                    </span>
                  </div>
                  <div className="workflow-tool-body">
                    <div className="workflow-input">
                      <div className="workflow-input-heading">
                        <span>{text.input}</span>
                        <code>{'schedule_create'}</code>
                      </div>
                      <pre className="workflow-arguments">
                        <code>
                          {'{\n'}
                          <span className="workflow-argument">
                            {'  '}
                            <span className="workflow-argument-key">{'"prompt"'}</span>
                            {': '}
                            <span>
                              {JSON.stringify(scenario.prompt)}
                              {','}
                            </span>
                            {'\n'}
                          </span>
                          <span className="workflow-argument">
                            {'  '}
                            <span className="workflow-argument-key">{'"title"'}</span>
                            {': '}
                            <span>
                              {JSON.stringify(scenario.title)}
                              {','}
                            </span>
                            {'\n'}
                          </span>
                          <span className="workflow-argument">
                            {'  '}
                            <span className="workflow-argument-key">
                              {JSON.stringify(scheduleKind)}
                            </span>
                            {': '}
                            <span>{JSON.stringify(schedule)}</span>
                            {'\n'}
                          </span>
                          {'}'}
                        </code>
                      </pre>
                    </div>
                    <div className="workflow-result">
                      <div className="workflow-result-title">{scenario.title}</div>
                      <dl className="workflow-result-fields">
                        <dt>{text.scheduledFor}</dt>
                        <dd>{scheduledLabel}</dd>
                        <dt>{text.repeat}</dt>
                        <dd>{scenario.repeat}</dd>
                        <dt>{text.status}</dt>
                        <dd>{text.scheduled}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="workflow-completion">
            <p className="workflow-confirmation">{scenario.confirmation}</p>
            <div className="workflow-task-card">
              <span className="workflow-clock-well">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"></path>
                  <path d="M8 4.31V8.46L11 10.08"></path>
                </svg>
              </span>
              <span className="workflow-task-copy">
                <span className="workflow-task-title">{scenario.title}</span>
                <span className="workflow-frequency">{scenario.frequency}</span>
              </span>
              <span className="workflow-open-label">{text.open}</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
