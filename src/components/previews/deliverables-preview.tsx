import type { CSSProperties } from 'react';
import { sitePath } from '@/config/deployment';
import Image from 'next/image';
import type { Messages } from '@/i18n';

export function DeliverablesPreview({
  text,
  running,
}: {
  text: Messages['Harness']['DeliverablesPreview'];
  running: boolean;
}) {
  return (
    <figure
      className="deliverables-frame"
      aria-label={text.accessibleLabel}
      data-running={running}
      data-paused={!running}
    >
      <div className="deliverables-composition" aria-hidden="true">
        <div className="deliverables-file-carousel">
          <div className="deliverables-file-track">
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '0' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/word.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.wordName}</span>
                <span className="deliverables-file-meta">{text.wordType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '1' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/excel.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.excelName}</span>
                <span className="deliverables-file-meta">{text.excelType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '2' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/html.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.htmlName}</span>
                <span className="deliverables-file-meta">{text.htmlType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '3' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/typescript.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.typescriptName}</span>
                <span className="deliverables-file-meta">{text.typescriptType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '4' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/python.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.pythonName}</span>
                <span className="deliverables-file-meta">{text.pythonType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '5' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/pdf.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.pdfName}</span>
                <span className="deliverables-file-meta">{text.pdfType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '6' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/markdown.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.markdownName}</span>
                <span className="deliverables-file-meta">{text.markdownType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '0' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/word.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.wordName}</span>
                <span className="deliverables-file-meta">{text.wordType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '1' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/excel.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.excelName}</span>
                <span className="deliverables-file-meta">{text.excelType}</span>
              </span>
            </div>
            <div
              className="deliverables-file-card"
              style={{ '--file-phase': '2' } as CSSProperties}
            >
              <span className="deliverables-icon-well">
                <Image
                  src={sitePath('/icons/html.svg')}
                  alt=""
                  width="28"
                  height="28"
                  draggable="false"
                />
              </span>
              <span className="deliverables-file-copy">
                <span className="deliverables-file-name">{text.htmlName}</span>
                <span className="deliverables-file-meta">{text.htmlType}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="deliverables-diff-panel">
          <div className="deliverables-tab-bar">
            <div className="deliverables-active-tab">
              <span className="deliverables-tab-title">{text.reviewTab}</span>
              <span className="deliverables-tab-close">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4L12 12M12 4L4 12"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="deliverables-diff-header">
            <Image
              src={sitePath('/icons/typescript.svg')}
              alt=""
              width="28"
              height="28"
              draggable="false"
            />
            <span className="deliverables-file-path">{'src/label.ts'}</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6L8 10L12 6"></path>
            </svg>
            <span className="deliverables-counts">
              <span>{'+2'}</span>
              <span>{'−1'}</span>
            </span>
            <span className="deliverables-diff-tools">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 2.5V13.5M3.5 2.5H12.5Q13.5 2.5 13.5 3.5V12.5Q13.5 13.5 12.5 13.5H3.5Q2.5 13.5 2.5 12.5V3.5Q2.5 2.5 3.5 2.5Z"></path>
              </svg>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 4H13.5M2.5 7.5H11Q13.5 7.5 13.5 10Q13.5 12.5 11 12.5H7M9 10.5L7 12.5L9 14.5M2.5 11H4.5"></path>
              </svg>
            </span>
          </div>
          <div className="deliverables-diff-body">
            <div className="deliverables-hunk">{'@@ -8,3 +8,4 @@'}</div>
            <div className="deliverables-line deliverables-context">
              <span className="deliverables-line-number">{'8'}</span>
              <span className="deliverables-line-number">{'8'}</span>
              <span className="deliverables-sign"> </span>
              <code className="deliverables-code">
                <span className="deliverables-keyword">{'function'}</span>{' '}
                <span className="deliverables-function-name">{'label'}</span>
                {'(name: '}
                <span className="deliverables-keyword">{'string'}</span>
                {') '}
                {'{'}
              </code>
            </div>
            <div className="deliverables-line deliverables-removed">
              <span className="deliverables-line-number">{'9'}</span>
              <span className="deliverables-line-number"></span>
              <span className="deliverables-sign">{'−'}</span>
              <code className="deliverables-code">
                {'  '}
                <span className="deliverables-keyword">{'return'}</span>
                {' name;'}
              </code>
            </div>
            <div className="deliverables-line deliverables-added">
              <span className="deliverables-line-number"></span>
              <span className="deliverables-line-number">{'9'}</span>
              <span className="deliverables-sign">{'+'}</span>
              <code className="deliverables-code">
                {'  '}
                <span className="deliverables-keyword">{'const'}</span>
                {' text = name.'}
                <span className="deliverables-function-name">{'trim'}</span>
                {'();'}
              </code>
            </div>
            <div className="deliverables-line deliverables-added">
              <span className="deliverables-line-number"></span>
              <span className="deliverables-line-number">{'10'}</span>
              <span className="deliverables-sign">{'+'}</span>
              <code className="deliverables-code">
                {'  '}
                <span className="deliverables-keyword">{'return'}</span>
                {' text || '}
                <span className="deliverables-string">{"'Untitled'"}</span>
                {';'}
              </code>
            </div>
            <div className="deliverables-line deliverables-context">
              <span className="deliverables-line-number">{'10'}</span>
              <span className="deliverables-line-number">{'11'}</span>
              <span className="deliverables-sign"> </span>
              <code className="deliverables-code">{'}'}</code>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
