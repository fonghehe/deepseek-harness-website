import type { CSSProperties } from 'react';
import type { Messages } from '@/i18n';

export function TracePreview({
  text,
  running,
}: {
  text: Messages['Harness']['TracePreview'];
  running: boolean;
}) {
  return (
    <figure
      className="trace-frame"
      aria-label={text.accessibleLabel}
      data-running={running}
      data-paused={!running}
    >
      <span className="trace-floor" aria-hidden="true"></span>
      <div className="trace-canvas" aria-hidden="true">
        <div className="trace-toolbar">
          <span className="trace-toggle trace-toggle-on">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"></path>
              <path d="M8 4.31V8.46L11 10.08"></path>
            </svg>
            {text.duration}
          </span>
          <span className="trace-toggle">
            {text.turns}
            <span className="trace-toggle-glyph">{'⊟'}</span>
          </span>
          <span className="trace-toggle">
            {text.calls}
            <span className="trace-toggle-glyph">{'⊟'}</span>
          </span>
          <span className="trace-search">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d="M6.58727 11.8586C9.55061 11.8586 11.9529 9.45637 11.9529 6.49304C11.9529 3.5297 9.55061 1.12744 6.58727 1.12744C3.62394 1.12744 1.22168 3.5297 1.22168 6.49304C1.22168 9.45637 3.62394 11.8586 6.58727 11.8586Z"></path>
              <path d="M10.2991 10.3933L14.7783 14.8725"></path>
            </svg>
            {text.search}
          </span>
        </div>
        <div className="trace-timeline">
          <div className="trace-lane-labels">
            <span>{text.lane.input}</span>
            <span>{text.lane.model}</span>
            <span>{text.lane.tools}</span>
          </div>
          <div className="trace-track">
            <span
              data-lane="0"
              className="trace-span undefined"
              style={{ '--span-left': '0.5%', '--span-width': '2.6%' } as CSSProperties}
            ></span>
            <span
              data-lane="0"
              className="trace-span trace-span-user"
              style={{ '--span-left': '4.6%', '--span-width': '3.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="0"
              className="trace-span trace-span-context"
              style={{ '--span-left': '9.4%', '--span-width': '2.2%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '3.2%', '--span-width': '3%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '8.6%', '--span-width': '4.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '1.8%', '--span-width': '2.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '5.2%', '--span-width': '3.6%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '10%', '--span-width': '2%' } as CSSProperties}
            ></span>
            <span
              data-lane="0"
              className="trace-span trace-span-context"
              style={{ '--span-left': '14.2%', '--span-width': '3.8%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '15.4%', '--span-width': '2.8%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '14%', '--span-width': '5.2%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '21%', '--span-width': '3.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '21.4%', '--span-width': '2.6%' } as CSSProperties}
            ></span>
            <span
              data-lane="0"
              className="trace-span trace-span-user"
              style={{ '--span-left': '27.2%', '--span-width': '2.2%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '26.6%', '--span-width': '4%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '32%', '--span-width': '3.6%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '32.4%', '--span-width': '2.2%' } as CSSProperties}
            ></span>
            <span
              data-lane="0"
              className="trace-span trace-span-context"
              style={{ '--span-left': '37.4%', '--span-width': '2.8%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '39.2%', '--span-width': '3.2%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '37.8%', '--span-width': '3.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '43%', '--span-width': '1.8%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '46.4%', '--span-width': '3.8%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '46%', '--span-width': '2.6%' } as CSSProperties}
            ></span>
            <span
              data-lane="0"
              className="trace-span trace-span-user"
              style={{ '--span-left': '52%', '--span-width': '3%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '51.4%', '--span-width': '4.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '57.6%', '--span-width': '2.8%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '57%', '--span-width': '3.2%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '62.2%', '--span-width': '2.2%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '66%', '--span-width': '3.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="0"
              className="trace-span trace-span-context"
              style={{ '--span-left': '71%', '--span-width': '2.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '71.2%', '--span-width': '3.8%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '77.2%', '--span-width': '3%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '77.6%', '--span-width': '2.4%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '82.4%', '--span-width': '3.6%' } as CSSProperties}
            ></span>
            <span
              data-lane="1"
              className="trace-span trace-span-message"
              style={{ '--span-left': '87.4%', '--span-width': '3.2%' } as CSSProperties}
            ></span>
            <span
              data-lane="0"
              className="trace-span trace-span-user"
              style={{ '--span-left': '92.4%', '--span-width': '2.6%' } as CSSProperties}
            ></span>
            <span
              data-lane="2"
              className="trace-span trace-span-tool"
              style={{ '--span-left': '92%', '--span-width': '4.2%' } as CSSProperties}
            ></span>
          </div>
        </div>
        <div className="trace-body">
          <div className="trace-list-viewport">
            <div className="trace-list-track">
              <div className="trace-row" data-row="system">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-system">{text.kind.system}</span>
                </span>
                <span className="trace-content">{text.systemPrompt}</span>
              </div>
              <div className="trace-row" data-row="user">
                <span className="trace-turn-label">{text.turnLabel.replace('{turn}', '1')}</span>
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-user">{text.kind.user}</span>
                </span>
                <span className="trace-content">{text.userTask}</span>
              </div>
              <div className="trace-row" data-row="context">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-context">{text.kind.context}</span>
                </span>
                <span className="trace-content">{text.runtimeContext}</span>
              </div>
              <div className="trace-row" data-row="assistant">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-assistant">{text.kind.assistant}</span>
                </span>
                <span className="trace-content">{text.assistantPlan}</span>
              </div>
              <div className="trace-row" data-row="tool" data-tool="bash">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-tool">{text.kind.tool}</span>
                </span>
                <span className="trace-content">
                  <span className="trace-tool-name">{'bash'}</span>
                  <span className="trace-tool-args">
                    {JSON.stringify({
                      command: 'echo NAVIGATION_OK',
                      description: text.printCommandDescription,
                    })}
                  </span>
                  <span className="trace-arrow">{'→'}</span>
                  <span className="trace-tool-result">{'NAVIGATION_OK'}</span>
                </span>
              </div>
              <div className="trace-row" data-row="tool" data-tool="read">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-tool">{text.kind.tool}</span>
                </span>
                <span className="trace-content">
                  <span className="trace-tool-name">{'read'}</span>
                  <span className="trace-tool-args">{'{"file_path": "nav-a.md"}'}</span>
                  <span className="trace-arrow">{'→'}</span>
                  <span className="trace-tool-result">{'nav-a.md'}</span>
                </span>
              </div>
              <div className="trace-row" data-row="tool" data-tool="read">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-tool">{text.kind.tool}</span>
                </span>
                <span className="trace-content">
                  <span className="trace-tool-name">{'read'}</span>
                  <span className="trace-tool-args">{'{"file_path": "nav-b.md"}'}</span>
                  <span className="trace-arrow">{'→'}</span>
                  <span className="trace-tool-result">{'nav-b.md'}</span>
                </span>
              </div>
              <div className="trace-row" data-row="assistant">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-assistant">{text.kind.assistant}</span>
                </span>
                <span className="trace-content">{text.firstDone}</span>
              </div>
              <div className="trace-row" data-row="user">
                <span className="trace-turn-label">{text.turnLabel.replace('{turn}', '2')}</span>
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-user">{text.kind.user}</span>
                </span>
                <span className="trace-content">{text.userFollowUp}</span>
              </div>
              <div className="trace-row" data-row="assistant">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-assistant">{text.kind.assistant}</span>
                </span>
                <span className="trace-content">{text.assistantSummary}</span>
              </div>
              <div className="trace-row" data-row="tool" data-tool="bash">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-tool">{text.kind.tool}</span>
                </span>
                <span className="trace-content">
                  <span className="trace-tool-name">{'bash'}</span>
                  <span className="trace-tool-args">
                    {JSON.stringify({
                      command: 'ls -la',
                      description: text.listFilesDescription,
                    })}
                  </span>
                  <span className="trace-arrow">{'→'}</span>
                  <span className="trace-tool-result">{'nav-a.md  nav-b.md  README.md'}</span>
                </span>
              </div>
              <div className="trace-row" data-row="tool" data-tool="grep">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-tool">{text.kind.tool}</span>
                </span>
                <span className="trace-content">
                  <span className="trace-tool-name">{'grep'}</span>
                  <span className="trace-tool-args">
                    {'{"pattern": "NAVIGATION", "path": "."}'}
                  </span>
                  <span className="trace-arrow">{'→'}</span>
                  <span className="trace-tool-result">{text.searchResult}</span>
                </span>
              </div>
              <div className="trace-row" data-row="tool" data-tool="read">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-tool">{text.kind.tool}</span>
                </span>
                <span className="trace-content">
                  <span className="trace-tool-name">{'read'}</span>
                  <span className="trace-tool-args">{'{"file_path": "README.md"}'}</span>
                  <span className="trace-arrow">{'→'}</span>
                  <span className="trace-tool-result">{'README.md'}</span>
                </span>
              </div>
              <div className="trace-row" data-row="assistant">
                <span className="trace-kind-slot">
                  <span className="trace-kind-tag trace-kind-assistant">{text.kind.assistant}</span>
                </span>
                <span className="trace-content">{text.assistantWrapUp}</span>
              </div>
            </div>
          </div>
          <div className="trace-details" data-panel="true">
            <div className="trace-details-head">
              <span className="trace-kind-tag trace-kind-tool">{text.kind.tool}</span>
              <span className="trace-details-title">
                {text.turnLabel.replace('{turn}', '1')}
                {' · '}
                {text.stepLabel.replace('{step}', '1')}
              </span>
              <span className="trace-details-close">{'×'}</span>
            </div>
            <div className="trace-details-tabs">
              <span className="trace-details-tab" data-tab="summary">
                {text.tab.summary}
              </span>
              <span className="trace-details-tab" data-tab="payload">
                {text.tab.payload}
              </span>
              <span className="trace-details-tab" data-tab="result">
                {text.tab.result}
              </span>
              <span className="trace-details-tab" data-tab="schema">
                {text.tab.schema}
              </span>
              <span className="trace-details-tab" data-tab="timing">
                {text.tab.timing}
              </span>
            </div>
            <div className="trace-details-body trace-tab-result">
              <span className="trace-result-value">{'NAVIGATION_OK'}</span>
            </div>
            <div className="trace-details-body trace-tab-timing">
              <dl className="trace-timing-fields">
                <dt>{text.started}</dt>
                <dd>{'2026-08-12 17:30:52.637'}</dd>
                <dt>{text.duration}</dt>
                <dd>{text.unitMilliseconds.replace('{value}', '34')}</dd>
                <dt>{text.source}</dt>
                <dd>{text.sessionTimestamps}</dd>
                <dt>{text.hierarchy}</dt>
                <dd>{text.assistantMessage}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
