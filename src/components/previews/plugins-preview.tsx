import type { CSSProperties } from 'react';
import type { Messages } from '@/i18n';

export function PluginsPreview({
  text,
  running,
}: {
  text: Messages['Harness']['PluginsPreview'];
  running: boolean;
}) {
  return (
    <figure
      className="plugins-frame"
      aria-label={text.accessibleLabel}
      data-running={running}
      data-paused={!running}
    >
      <div className="plugins-canvas" aria-hidden="true">
        <div className="plugins-conversation">
          <div className="plugins-composer-group">
            <div className="plugins-mode">
              <svg
                data-preview-icon="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M6.51867 12.3282C7.29816 12.6011 8.16475 12.6514 9.02269 12.4216C9.57879 12.2726 10.0784 12.0185 10.5087 11.6888C10.7819 12.0555 11.1606 12.3304 11.5913 12.4805C10.9688 13.029 10.2149 13.4478 9.35911 13.6771C8.13946 14.0038 6.90632 13.8971 5.82126 13.4533C6.15821 13.1562 6.4021 12.7652 6.51867 12.3282ZM9.17629 2.89409C11.1101 3.34433 12.739 4.81872 13.2889 6.87043C13.4219 7.3665 13.4811 7.8649 13.4774 8.35466C13.0924 8.13213 12.6422 8.01837 12.1741 8.05276L12.1711 8.05257C12.1539 7.77199 12.109 7.48889 12.0334 7.20684C11.6363 5.72533 10.5048 4.6372 9.13549 4.22844C9.25559 3.87667 9.29214 3.49087 9.22309 3.09892C9.2108 3.02922 9.19451 2.96108 9.17629 2.89409ZM4.7311 3.89107L4.78302 4.11879C4.87648 4.4488 5.04146 4.74263 5.25579 4.98896C3.98078 6.01355 3.35848 7.72904 3.8089 9.41059C3.81828 9.44559 3.82866 9.48025 3.83885 9.51479C3.38217 9.61268 2.98548 9.84137 2.68107 10.1556C2.63414 10.022 2.5897 9.88632 2.55244 9.74726C1.93301 7.43489 2.86717 5.07173 4.71504 3.76697L4.7311 3.89107Z"
                  fill="currentColor"
                  stroke="none"
                ></path>
                <path d="M7.99136 5.28105C8.87501 5.28105 9.59136 4.56471 9.59136 3.68105C9.59136 2.7974 8.87501 2.08105 7.99136 2.08105C7.1077 2.08105 6.39136 2.7974 6.39136 3.68105C6.39136 4.56471 7.1077 5.28105 7.99136 5.28105Z"></path>
                <path d="M3.94009 12.9417C4.82374 12.9417 5.54009 12.2254 5.54009 11.3417C5.54009 10.458 4.82374 9.7417 3.94009 9.7417C3.05643 9.7417 2.34009 10.458 2.34009 11.3417C2.34009 12.2254 3.05643 12.9417 3.94009 12.9417Z"></path>
                <path d="M12.0851 12.9417C12.9688 12.9417 13.6851 12.2254 13.6851 11.3417C13.6851 10.458 12.9688 9.7417 12.0851 9.7417C11.2015 9.7417 10.4851 10.458 10.4851 11.3417C10.4851 12.2254 11.2015 12.9417 12.0851 12.9417Z"></path>
              </svg>
              {text.creatorMode}
              <svg
                data-preview-icon="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6"></path>
              </svg>
            </div>
            <div className="plugins-composer">
              <div className="plugins-prompt">
                <span>{text.prompt}</span>
              </div>
              <div className="plugins-toolbar">
                <span className="plugins-attachment">
                  <svg
                    data-preview-icon="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M8 2V14M2 8H14"></path>
                  </svg>
                </span>
                <span className="plugins-send">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8 13V3M3.5 7.5L8 3L12.5 7.5"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="plugins-chat-view">
          <div className="plugins-user-message">{text.prompt}</div>
          <div className="plugins-process">
            <div className="plugins-working-state">
              <div className="plugins-process-title">
                <span>{text.working}</span>
                <span className="plugins-process-chevron">
                  <svg
                    data-preview-icon="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6"></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="plugins-tool-calls">
              <div className="plugins-tool-calls-inner">
                <div className="plugins-tool-row  " data-tool="skill" data-kind="tool">
                  <svg
                    viewBox="0 0 17 17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    <path d="M4.57788 5.77124H10.7029M4.57788 8.89819H7.91879"></path>
                    <path
                      d="M12.1404 1.19446C12.9442 1.19446 13.6404 1.81999 13.6404 2.64465V8.89856H12.6404V2.64465C12.6404 2.42015 12.4411 2.19446 12.1404 2.19446H3.14038C2.83968 2.19446 2.64038 2.42015 2.64038 2.64465V13.0929C2.64082 13.3172 2.84001 13.5421 3.14038 13.5421H8.88159V14.5421H3.14038C2.33675 14.5421 1.6408 13.9172 1.64038 13.0929V2.64465C1.64038 1.81999 2.33651 1.19446 3.14038 1.19446H12.1404Z"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                    <path d="M12.0051 15.1056C12.0051 13.6395 10.8166 12.451 9.35059 12.451C10.8166 12.451 12.0051 11.2626 12.0051 9.79651C12.0051 11.2626 13.1936 12.451 14.6597 12.451C13.1936 12.451 12.0051 13.6395 12.0051 15.1056Z"></path>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.skill}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary ">{'cordis-plugin-development'}</span>
                </div>
                <div className="plugins-tool-row  " data-tool="readSkill" data-kind="tool">
                  <svg
                    data-preview-icon="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4.9375 5.90295H11.0625" stroke="currentColor"></path>
                    <path d="M4.9375 9.02991H8.27841" stroke="currentColor"></path>
                    <path
                      d="M12.5 1.32617C13.3039 1.32617 14 1.95171 14 2.77637V13.2246C13.9996 14.0489 13.3036 14.6738 12.5 14.6738H3.5C2.69637 14.6738 2.00042 14.0489 2 13.2246V2.77637C2 1.95171 2.69613 1.32617 3.5 1.32617H12.5ZM3.5 2.32617C3.1993 2.32617 3 2.55186 3 2.77637V13.2246C3.00044 13.4489 3.19963 13.6738 3.5 13.6738H12.5C12.8004 13.6738 12.9996 13.4489 13 13.2246V2.77637C13 2.55186 12.8007 2.32617 12.5 2.32617H3.5Z"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.read}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary plugins-file-summary">
                    {'skills/cordis-plugin-development/SKILL.md'}
                  </span>
                </div>
                <div
                  className="plugins-tool-row plugins-think-row "
                  data-tool="thinkSlot"
                  data-kind="think"
                >
                  <svg
                    data-preview-icon="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M10.7554 5.24466C13.9891 8.4783 15.3769 12.3333 13.8552 13.8551C12.3335 15.3768 8.4785 13.989 5.24478 10.7553C2.01111 7.52165 0.623307 3.66664 2.14504 2.14491C3.66676 0.623189 7.52178 2.01099 10.7554 5.24466Z"></path>
                    <path d="M10.7554 10.7553C7.52178 13.989 3.66676 15.3768 2.14504 13.8551C0.623307 12.3333 2.01111 8.4783 5.24478 5.24466C8.4785 2.01099 12.3335 0.623189 13.8552 2.14491C15.3769 3.66664 13.9891 7.52165 10.7554 10.7553Z"></path>
                    <path
                      d="M8.9587 8.00025C8.9587 8.52835 8.5306 8.95655 8.0024 8.95655C7.47429 8.95655 7.04614 8.52835 7.04614 8.00025C7.04614 7.47209 7.47429 7.04395 8.0024 7.04395C8.5306 7.04395 8.9587 7.47209 8.9587 8.00025Z"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.think}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary ">{text.toolSummaries.overlay}</span>
                </div>
                <div className="plugins-tool-row  " data-tool="providers" data-kind="tool">
                  <svg
                    data-preview-icon="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M3.16143 6.59068L1.75205 8.00006L3.10619 9.35419L2.39908 10.0613L0.832948 8.49517C0.559581 8.2218 0.559582 7.77831 0.832948 7.50494L2.45432 5.88357L3.16143 6.59068ZM8.49511 15.1671C8.22176 15.4405 7.77826 15.4404 7.50489 15.1671L5.93461 13.5968L6.64172 12.8897L8 14.248L9.40938 12.8386L10.1165 13.5457L8.49511 15.1671ZM15.1671 7.50494C15.4403 7.7782 15.4401 8.22179 15.1671 8.49517L13.652 10.0102L12.9449 9.30309L14.248 8.00006L12.8897 6.64178L13.5968 5.93467L15.1671 7.50494ZM9.35414 3.10624L8 1.7521L6.69696 3.05514L5.98986 2.34803L7.50489 0.833003C7.77828 0.559981 8.22186 0.559752 8.49511 0.833003L10.0612 2.39913L9.35414 3.10624Z"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                    <circle cx="8" cy="8" r="1.76221" stroke="currentColor"></circle>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.providers}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary ">{text.toolSummaries.providers}</span>
                </div>
                <div className="plugins-tool-row  " data-tool="querySlots" data-kind="tool">
                  <svg
                    data-preview-icon="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M3.16143 6.59068L1.75205 8.00006L3.10619 9.35419L2.39908 10.0613L0.832948 8.49517C0.559581 8.2218 0.559582 7.77831 0.832948 7.50494L2.45432 5.88357L3.16143 6.59068ZM8.49511 15.1671C8.22176 15.4405 7.77826 15.4404 7.50489 15.1671L5.93461 13.5968L6.64172 12.8897L8 14.248L9.40938 12.8386L10.1165 13.5457L8.49511 15.1671ZM15.1671 7.50494C15.4403 7.7782 15.4401 8.22179 15.1671 8.49517L13.652 10.0102L12.9449 9.30309L14.248 8.00006L12.8897 6.64178L13.5968 5.93467L15.1671 7.50494ZM9.35414 3.10624L8 1.7521L6.69696 3.05514L5.98986 2.34803L7.50489 0.833003C7.77828 0.559981 8.22186 0.559752 8.49511 0.833003L10.0612 2.39913L9.35414 3.10624Z"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                    <circle cx="8" cy="8" r="1.76221" stroke="currentColor"></circle>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.query}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary ">{'Slots.listSubTree'}</span>
                </div>
                <div className="plugins-tool-row  " data-tool="writeManifest" data-kind="tool">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    <path
                      d="M8.85596 2.69971H4.19971C3.37141 2.69971 2.69992 3.37146 2.69971 4.19971V11.8003C2.69992 12.6285 3.37141 13.3003 4.19971 13.3003H11.8003C12.6283 13.2999 13.3001 12.6283 13.3003 11.8003V7.89893H14.3003V11.8003C14.3001 13.1806 13.1806 14.2999 11.8003 14.3003H4.19971C2.81913 14.3003 1.69992 13.1808 1.69971 11.8003V4.19971C1.69992 2.81918 2.81913 1.69971 4.19971 1.69971H8.85596V2.69971Z"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                    <path d="M7.7849 8.23878L13.888 2.13574"></path>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.write}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary plugins-file-summary">
                    {'dsh-plugin-pomodoro-float/package.json'}
                  </span>
                  <span className="plugins-tool-diff">
                    {'+'}
                    {'35'}
                    {' −'}
                    {'0'}
                  </span>
                </div>
                <div className="plugins-tool-row  " data-tool="writeClient" data-kind="tool">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    <path
                      d="M8.85596 2.69971H4.19971C3.37141 2.69971 2.69992 3.37146 2.69971 4.19971V11.8003C2.69992 12.6285 3.37141 13.3003 4.19971 13.3003H11.8003C12.6283 13.2999 13.3001 12.6283 13.3003 11.8003V7.89893H14.3003V11.8003C14.3001 13.1806 13.1806 14.2999 11.8003 14.3003H4.19971C2.81913 14.3003 1.69992 13.1808 1.69971 11.8003V4.19971C1.69992 2.81918 2.81913 1.69971 4.19971 1.69971H8.85596V2.69971Z"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                    <path d="M7.7849 8.23878L13.888 2.13574"></path>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.write}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary plugins-file-summary">
                    {'dsh-plugin-pomodoro-float/client.js'}
                  </span>
                  <span className="plugins-tool-diff">
                    {'+'}
                    {'638'}
                    {' −'}
                    {'0'}
                  </span>
                </div>
                <div
                  className="plugins-tool-row  plugins-call-row"
                  data-tool="install"
                  data-kind="call"
                >
                  <svg
                    data-preview-icon="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M5.875 3C5.875 6.33333 7.54167 8 10.875 8C7.54167 8 5.875 9.66667 5.875 13C5.875 9.66667 4.20833 8 0.875 8C4.20833 8 5.875 6.33333 5.875 3Z"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M12.375 1.55823C12.375 3.39156 13.2917 4.30823 15.125 4.30823C13.2917 4.30823 12.375 5.22489 12.375 7.05823C12.375 5.22489 11.4583 4.30823 9.625 4.30823C11.4583 4.30823 12.375 3.39156 12.375 1.55823Z"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M12.375 10.4418C12.375 11.7751 13.0417 12.4418 14.375 12.4418C13.0417 12.4418 12.375 13.1084 12.375 14.4418C12.375 13.1084 11.7083 12.4418 10.375 12.4418C11.7083 12.4418 12.375 11.7751 12.375 10.4418Z"
                      stroke="currentColor"
                    ></path>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.toolCall}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary ">{'plugin_manager · install_bundle'}</span>
                </div>
                <div className="plugins-tool-row  " data-tool="editClient" data-kind="tool">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    <path
                      d="M8.85596 2.69971H4.19971C3.37141 2.69971 2.69992 3.37146 2.69971 4.19971V11.8003C2.69992 12.6285 3.37141 13.3003 4.19971 13.3003H11.8003C12.6283 13.2999 13.3001 12.6283 13.3003 11.8003V7.89893H14.3003V11.8003C14.3001 13.1806 13.1806 14.2999 11.8003 14.3003H4.19971C2.81913 14.3003 1.69992 13.1808 1.69971 11.8003V4.19971C1.69992 2.81918 2.81913 1.69971 4.19971 1.69971H8.85596V2.69971Z"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                    <path d="M7.7849 8.23878L13.888 2.13574"></path>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.edit}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary plugins-file-summary">
                    {'dsh-plugin-pomodoro-float/client.js'}
                  </span>
                  <span className="plugins-tool-diff">
                    {'+'}
                    {'5'}
                    {' −'}
                    {'3'}
                  </span>
                </div>
                <div className="plugins-tool-row  " data-tool="verify" data-kind="tool">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    <path d="M3 4L7 8L3 12M9 12H13"></path>
                  </svg>
                  <span className="plugins-tool-title">{text.tools.verify}</span>
                  <span className="plugins-tool-separator"></span>
                  <span className="plugins-tool-summary ">{text.toolSummaries.verify}</span>
                </div>
              </div>
            </div>
            <div className="plugins-finished-state">
              <span>{text.finished}</span>
              <svg
                data-preview-icon="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6"></path>
              </svg>
            </div>
            <p className="plugins-completion-copy">{text.completion}</p>
          </div>
        </div>
        <div className="plugins-manager">
          <div className="plugins-manager-header">
            <span>{text.plugins}</span>
          </div>
          <div className="plugins-list-viewport">
            <div className="plugins-list-track">
              <div className="plugins-group-label">{text.official}</div>
              <div className="plugins-plugin-row">
                <span className="plugins-icon-well">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M13.3027 17.1077H9.03125V12.8372H13.3027V17.1077ZM17.5742 12.8372C17.574 15.1958 15.6623 17.1075 13.3037 17.1077V8.56567H17.5742V12.8372Z"
                      fill="url(#:R559qkclfauarpla:-gradient)"
                    ></path>
                    <path
                      d="M18.5229 12.8372V8.56567H22.7944V12.8372H27.0659V17.1077H22.7944C20.4357 17.1077 18.5232 15.1959 18.5229 12.8372Z"
                      fill="#F2AF63"
                    ></path>
                    <path
                      d="M17.5742 26.6072H13.3037V18.0642C15.6625 18.0644 17.5742 19.9769 17.5742 22.3357V26.6072ZM13.3027 22.3357H9.03125V18.0642H13.3027V22.3357Z"
                      fill="#7CB7FF"
                    ></path>
                    <path
                      d="M22.7944 26.6072H18.5229V22.3357C18.5229 19.9768 20.4355 18.0642 22.7944 18.0642H27.0659V22.3357H22.7944V26.6072Z"
                      fill="#45D9E7"
                    ></path>
                    <defs>
                      <linearGradient
                        id=":R559qkclfauarpla:-gradient"
                        x1="16.1247"
                        y1="6.6613"
                        x2="9.03125"
                        y2="19.2206"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#7CB7FF"></stop>
                        <stop offset="1" stopColor="#145AF3"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="plugins-plugin-copy">
                  <span className="plugins-plugin-title">
                    <span className="plugins-plugin-name">{text.team.name}</span>
                    <span className="plugins-experimental">{text.experimental}</span>
                  </span>
                </span>
              </div>
              <div className="plugins-plugin-row">
                <span className="plugins-icon-well">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <g transform="translate(1.5 1.5) scale(0.9166666667)">
                      <path
                        d="M18 6L28.5 9.5V17.2C28.5 23.1 24.08 28.4 18 30C11.92 28.4 7.5 23.1 7.5 17.2V9.5L18 6Z"
                        fill="url(#:R599qkclfauarpla:-gradient)"
                        fillOpacity="0.8"
                      ></path>
                      <path
                        d="M14.2 18L16.84 20.63L22.2 15.27"
                        stroke="#FFFFFF"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                    <defs>
                      <linearGradient
                        id=":R599qkclfauarpla:-gradient"
                        x1="18"
                        y1="6"
                        x2="18"
                        y2="30"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#7AC2FF"></stop>
                        <stop offset="1" stopColor="#4A65E8"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="plugins-plugin-copy">
                  <span className="plugins-plugin-title">
                    <span className="plugins-plugin-name">{text.review.name}</span>
                    <span className="plugins-experimental">{text.experimental}</span>
                  </span>
                </span>
              </div>
              <div className="plugins-plugin-row">
                <span className="plugins-icon-well">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M18.5404 17.9143L22.2526 19.3885L21.5998 21.0332L17.8875 19.56C17.2134 19.2924 16.771 18.6398 16.771 17.9143V13.6399H18.5404V17.9143Z"
                      fill="url(#:R5d9qkclfauarpla:-gradient)"
                      stroke="url(#:R5d9qkclfauarpla:-stroke-gradient)"
                      strokeWidth="0.284352"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M17.9976 8C21.4515 8 24.4968 9.75127 26.2935 12.4141L26.646 10.9189L28.1216 11.2666L27.2671 14.9033L27.1118 15.5625L26.439 15.4824L22.73 15.042L22.9077 13.5371L24.6714 13.7451C23.2655 11.545 20.8019 10.0859 17.9976 10.0859C13.6268 10.0862 10.0836 13.6292 10.0835 18C10.0836 22.3708 13.6268 25.9148 17.9976 25.915C22.3685 25.915 25.9125 22.3709 25.9126 18V17.9531H27.9976V18C27.9974 23.5226 23.5202 28 17.9976 28C12.4752 27.9998 7.99768 23.5224 7.99756 18C7.99764 12.4775 12.4751 8.00024 17.9976 8ZM14.1235 27.1699C14.1657 27.1877 14.2091 27.2025 14.2515 27.2197C14.1683 27.1859 14.0857 27.1507 14.0034 27.1152L14.1235 27.1699Z"
                      fill="url(#:R5d9qkclfauarpla:-ring-gradient)"
                    ></path>
                    <defs>
                      <linearGradient
                        id=":R5d9qkclfauarpla:-gradient"
                        x1="15.6334"
                        y1="13.2607"
                        x2="29.9092"
                        y2="27.3696"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#58BCC8"></stop>
                        <stop offset="0.55" stopColor="#658EFF"></stop>
                      </linearGradient>
                      <linearGradient
                        id=":R5d9qkclfauarpla:-stroke-gradient"
                        x1="16.5812"
                        y1="13.2607"
                        x2="29.9092"
                        y2="27.3696"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#58BCC8"></stop>
                        <stop offset="0.55" stopColor="#658EFF"></stop>
                      </linearGradient>
                      <linearGradient
                        id=":R5d9qkclfauarpla:-ring-gradient"
                        x1="13.2184"
                        y1="7.52381"
                        x2="31.0194"
                        y2="27.2245"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#52CED8"></stop>
                        <stop offset="1" stopColor="#617BEB"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="plugins-plugin-copy">
                  <span className="plugins-plugin-title">
                    <span className="plugins-plugin-name">{text.schedule.name}</span>
                    <span className="plugins-experimental">{text.experimental}</span>
                  </span>
                </span>
              </div>
              <div className="plugins-plugin-row">
                <span className="plugins-icon-well">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M23.7324 8.77148V27.2295L21.2324 27.2285V8.77051L23.7324 8.77148ZM14.6797 10.7715L14.6787 25.2295L12.1787 25.2285L12.1797 10.7705L14.6797 10.7715ZM19.3926 22.4131H16.8926V13.5859H19.3926V22.4131ZM10.0625 20.708H7.5625V15.291H10.0625V20.708ZM28.4375 20.708H25.9375V15.291H28.4375V20.708Z"
                      fill="url(#:R5h9qkclfauarpla:-gradient)"
                    ></path>
                    <defs>
                      <linearGradient
                        id=":R5h9qkclfauarpla:-gradient"
                        x1="8.24602"
                        y1="16.4083"
                        x2="32.5611"
                        y2="22.9699"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#67C7FE"></stop>
                        <stop offset="1" stopColor="#3F77D8"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="plugins-plugin-copy">
                  <span className="plugins-plugin-title">
                    <span className="plugins-plugin-name">{text.voice.name}</span>
                    <span className="plugins-experimental">{text.experimental}</span>
                  </span>
                </span>
              </div>
              <div className="plugins-plugin-row">
                <span className="plugins-icon-well">
                  <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <path
                      d="M10 11L16.606 17.606C16.6841 17.6841 16.6841 17.8107 16.606 17.8888L10 24.4948"
                      stroke="#679EFE"
                      strokeWidth="3.5"
                    ></path>
                    <path d="M20.1211 24.4946H26.8685" stroke="#679EFE" strokeWidth="3.5"></path>
                  </svg>
                </span>
                <span className="plugins-plugin-copy">
                  <span className="plugins-plugin-title">
                    <span className="plugins-plugin-name">{text.terminal.name}</span>
                  </span>
                </span>
              </div>
              <div className="plugins-plugin-row">
                <span className="plugins-icon-well">
                  <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <path
                      d="M18.0486 28.4901C12.0858 28.4901 7.25195 23.6562 7.25195 17.6934C13.2148 17.6934 18.0486 22.5272 18.0486 28.4901Z"
                      fill="#A797FC"
                    ></path>
                    <path
                      d="M18.0486 6.89667C12.0858 6.89667 7.25195 11.7305 7.25195 17.6934C13.2148 17.6934 18.0486 12.8595 18.0486 6.89667Z"
                      fill="url(#plugin-preview-R1p9qkclfauarpla-loop)"
                    ></path>
                    <path
                      d="M18.0485 28.4901C24.0114 28.4901 28.8452 23.6562 28.8452 17.6934C22.8824 17.6934 18.0485 22.5272 18.0485 28.4901Z"
                      fill="#4561EE"
                    ></path>
                    <path
                      d="M18.0485 6.89667C24.0114 6.89667 28.8452 11.7305 28.8452 17.6934C22.8824 17.6934 18.0485 12.8595 18.0485 6.89667Z"
                      fill="#658EFF"
                    ></path>
                    <defs>
                      <linearGradient
                        id="plugin-preview-R1p9qkclfauarpla-loop"
                        x1="16.7911"
                        y1="16.1655"
                        x2="8.98192"
                        y2="8.74289"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#A23AE7"></stop>
                        <stop offset="1" stopColor="#E2E2E2"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="plugins-plugin-copy">
                  <span className="plugins-plugin-title">
                    <span className="plugins-plugin-name">{text.loop.name}</span>
                  </span>
                </span>
              </div>
              <div className="plugins-plugin-row">
                <span className="plugins-icon-well">
                  <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <rect
                      x="14.9893"
                      y="15.1877"
                      width="12.2365"
                      height="12.2365"
                      rx="2"
                      fill="url(#plugin-preview-R1t9qkclfauarpla-green)"
                      fillOpacity="0.8"
                    ></rect>
                    <rect
                      x="8.87109"
                      y="9.0697"
                      width="12.2365"
                      height="12.2365"
                      rx="2"
                      fill="url(#plugin-preview-R1t9qkclfauarpla-blue)"
                      fillOpacity="0.8"
                    ></rect>
                    <defs>
                      <linearGradient
                        id="plugin-preview-R1t9qkclfauarpla-green"
                        x1="21.1075"
                        y1="15.1877"
                        x2="21.1075"
                        y2="27.4243"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#45E7A4"></stop>
                        <stop offset="1" stopColor="#05909D"></stop>
                      </linearGradient>
                      <linearGradient
                        id="plugin-preview-R1t9qkclfauarpla-blue"
                        x1="14.9894"
                        y1="9.0697"
                        x2="14.9894"
                        y2="21.3063"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#69B9FF"></stop>
                        <stop offset="1" stopColor="#324DE2"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="plugins-plugin-copy">
                  <span className="plugins-plugin-title">
                    <span className="plugins-plugin-name">{text.subagent.name}</span>
                  </span>
                </span>
              </div>
              <div className="plugins-group-label plugins-installed-label">{text.installed}</div>
              <div className="plugins-plugin-row plugins-new-plugin">
                <span className="plugins-icon-well">
                  <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <path
                      d="M18 11C9 7 5 16 8 23C10 28 15 30 18 28C22 30 28 26 29 21C31 12 25 8 18 11Z"
                      fill="url(#plugin-preview-R69qkclfauarpla-tomato)"
                    ></path>
                    <path
                      d="M18 13.4L11.6 13.2L14.8 10.6L14.4 7.2L17.1 5.4L18.9 5.4L21.6 7.2L21.2 10.6L24.4 13.2Z"
                      fill="#79BD89"
                    ></path>
                    <path
                      d="M18.2 16.6V20H21.4"
                      stroke="#FFF0E9"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <defs>
                      <linearGradient
                        id="plugin-preview-R69qkclfauarpla-tomato"
                        x1="10"
                        y1="11"
                        x2="26"
                        y2="28"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFAC89"></stop>
                        <stop offset="1" stopColor="#E75C5C"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="plugins-plugin-copy">
                  <span className="plugins-plugin-name">{text.pomodoro.name}</span>
                </span>
                <span className="plugins-toggle">
                  <i></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="plugins-timer-widget">
          <div className="plugins-widget-expanded">
            <div className="plugins-widget-title">
              <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <path
                  d="M18 11C9 7 5 16 8 23C10 28 15 30 18 28C22 30 28 26 29 21C31 12 25 8 18 11Z"
                  fill="url(#plugin-preview-R4makclfauarpla-tomato)"
                ></path>
                <path
                  d="M18 13.4L11.6 13.2L14.8 10.6L14.4 7.2L17.1 5.4L18.9 5.4L21.6 7.2L21.2 10.6L24.4 13.2Z"
                  fill="#79BD89"
                ></path>
                <path
                  d="M18.2 16.6V20H21.4"
                  stroke="#FFF0E9"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <defs>
                  <linearGradient
                    id="plugin-preview-R4makclfauarpla-tomato"
                    x1="10"
                    y1="11"
                    x2="26"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFAC89"></stop>
                    <stop offset="1" stopColor="#E75C5C"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span>{text.pomodoro.name}</span>
              <span className="plugins-widget-window-mark">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 8H12"></path>
                </svg>
              </span>
            </div>
            <div className="plugins-timer-tabs">
              <span>{text.focus}</span>
              <span>{text.shortBreak}</span>
            </div>
            <span className="plugins-timer-viewport plugins-timer-digits">
              <span className="plugins-timer-strip">
                <span style={{ '--frame': '0' } as CSSProperties}>{'25:00'}</span>
                <span style={{ '--frame': '1' } as CSSProperties}>{'24:59'}</span>
                <span style={{ '--frame': '2' } as CSSProperties}>{'24:58'}</span>
                <span style={{ '--frame': '3' } as CSSProperties}>{'24:57'}</span>
                <span style={{ '--frame': '4' } as CSSProperties}>{'24:56'}</span>
                <span style={{ '--frame': '5' } as CSSProperties}>{'24:55'}</span>
                <span style={{ '--frame': '6' } as CSSProperties}>{'24:54'}</span>
                <span style={{ '--frame': '7' } as CSSProperties}>{'24:53'}</span>
                <span style={{ '--frame': '8' } as CSSProperties}>{'24:52'}</span>
                <span style={{ '--frame': '9' } as CSSProperties}>{'24:51'}</span>
                <span style={{ '--frame': '10' } as CSSProperties}>{'24:50'}</span>
                <span style={{ '--frame': '11' } as CSSProperties}>{'24:49'}</span>
                <span style={{ '--frame': '12' } as CSSProperties}>{'24:48'}</span>
                <span style={{ '--frame': '13' } as CSSProperties}>{'24:47'}</span>
                <span style={{ '--frame': '14' } as CSSProperties}>{'24:46'}</span>
                <span style={{ '--frame': '15' } as CSSProperties}>{'24:45'}</span>
                <span style={{ '--frame': '16' } as CSSProperties}>{'24:44'}</span>
                <span style={{ '--frame': '17' } as CSSProperties}>{'24:43'}</span>
                <span style={{ '--frame': '18' } as CSSProperties}>{'24:42'}</span>
                <span style={{ '--frame': '19' } as CSSProperties}>{'24:41'}</span>
                <span style={{ '--frame': '20' } as CSSProperties}>{'24:40'}</span>
                <span style={{ '--frame': '21' } as CSSProperties}>{'24:39'}</span>
                <span style={{ '--frame': '22' } as CSSProperties}>{'24:38'}</span>
                <span style={{ '--frame': '23' } as CSSProperties}>{'24:37'}</span>
                <span style={{ '--frame': '24' } as CSSProperties}>{'24:36'}</span>
              </span>
            </span>
            <div className="plugins-timer-start">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 3L13 8L5 13Z"></path>
              </svg>
              {text.startFocus}
            </div>
          </div>
          <div className="plugins-widget-compact">
            <span className="plugins-timer-viewport plugins-compact-digits">
              <span className="plugins-timer-strip">
                <span style={{ '--frame': '0' } as CSSProperties}>{'25:00'}</span>
                <span style={{ '--frame': '1' } as CSSProperties}>{'24:59'}</span>
                <span style={{ '--frame': '2' } as CSSProperties}>{'24:58'}</span>
                <span style={{ '--frame': '3' } as CSSProperties}>{'24:57'}</span>
                <span style={{ '--frame': '4' } as CSSProperties}>{'24:56'}</span>
                <span style={{ '--frame': '5' } as CSSProperties}>{'24:55'}</span>
                <span style={{ '--frame': '6' } as CSSProperties}>{'24:54'}</span>
                <span style={{ '--frame': '7' } as CSSProperties}>{'24:53'}</span>
                <span style={{ '--frame': '8' } as CSSProperties}>{'24:52'}</span>
                <span style={{ '--frame': '9' } as CSSProperties}>{'24:51'}</span>
                <span style={{ '--frame': '10' } as CSSProperties}>{'24:50'}</span>
                <span style={{ '--frame': '11' } as CSSProperties}>{'24:49'}</span>
                <span style={{ '--frame': '12' } as CSSProperties}>{'24:48'}</span>
                <span style={{ '--frame': '13' } as CSSProperties}>{'24:47'}</span>
                <span style={{ '--frame': '14' } as CSSProperties}>{'24:46'}</span>
                <span style={{ '--frame': '15' } as CSSProperties}>{'24:45'}</span>
                <span style={{ '--frame': '16' } as CSSProperties}>{'24:44'}</span>
                <span style={{ '--frame': '17' } as CSSProperties}>{'24:43'}</span>
                <span style={{ '--frame': '18' } as CSSProperties}>{'24:42'}</span>
                <span style={{ '--frame': '19' } as CSSProperties}>{'24:41'}</span>
                <span style={{ '--frame': '20' } as CSSProperties}>{'24:40'}</span>
                <span style={{ '--frame': '21' } as CSSProperties}>{'24:39'}</span>
                <span style={{ '--frame': '22' } as CSSProperties}>{'24:38'}</span>
                <span style={{ '--frame': '23' } as CSSProperties}>{'24:37'}</span>
                <span style={{ '--frame': '24' } as CSSProperties}>{'24:36'}</span>
              </span>
            </span>
            <span className="plugins-compact-label">{text.focus}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
