---
title: '웹사이트 요구 사항'
description: '레이아웃, 탐색, 접근성, 배포, 성능 확인 항목.'
---

# 웹사이트 요구 사항

페이지 변경이나 배포 전에 사용하는 확인 목록입니다. 수정한 파일과 동작에 맞는 검사를 선택하세요.

## 검수 기준

| 영역      | 기대 결과                                        |
| --------- | ------------------------------------------------ |
| 내용      | 모든 애니메이션 없이 주제와 다음 행동을 이해     |
| 좁은 화면 | 긴 이름, 메뉴와 명령에 가로 넘침 없음            |
| 조작      | 하이드레이션 후 링크, 키보드와 JS 없는 상세 사용 |
| 언어      | 모든 언어판의 경로, 방향과 메타데이터 일치       |
| SEO       | 이동 후 canonical과 공유 URL이 현재 글을 표시    |
| HTTP      | origin/언어를 섞지 않고 304에는 본문 없음        |

읽기 순서, 혼합 방향의 문장 부호와 번역은 직접 확인합니다.

## 커밋할 입력

컴포넌트, Hook, CSS, Markdown, 정적 리소스를 버전 관리합니다. JavaScript와 CSS는 `pnpm build`로 생성하며 `.next`와 `public/docs`는 Git 관리 대상에서 제외합니다. `tests/fixtures/assets.json`을 기준으로 리소스 무결성을 확인하고 캡처한 HTML이나 원본 실행 코드가 다시 포함되는 것을 막습니다.

`.next`, `public/docs`, 캐시, 보고서와 설치된 패키지는 생성 결과입니다. 공유 설정은 이식 가능하게, 비밀과 개인 설정은 로컬에 둡니다. ignore 규칙은 접근 권한이 아닙니다.

## 변경 검증

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
```

프로덕션 빌드 후 사용하지 않는 포트에서 관련 브라우저 검사를 실행합니다. 모든 언어판의 설명 데이터와 frontmatter를 맞추고, 해시가 일치하지 않으면 원인을 확인한 뒤 체크섬을 갱신합니다.

## 공개 전 확인

문서를 먼저 빌드하고 전체 `public`을 전달합니다. `SITE_URL`, 기본 영어, 지원 언어, 404, sitemap, favicon, 데모 조작과 동적 청크를 확인합니다. 자원별 캐시 헤더를 점검하고 로컬, 원격 CI와 실제 도메인 검증을 구분합니다.

## 성능과 유지보수

payload와 LCP, CLS, 차단 시간을 함께 측정합니다. 서버 캐시가 클라이언트 실행을 제거하지는 않습니다. 실패를 피하려고 baseline을 덮지 않으며 글 확장은 내용 예산을 명시적으로 검토합니다. 리소스나 애니메이션을 바꿀 때는 관련 컴포넌트와 CSS, 출처, 체크섬, 기존 동작의 회귀를 함께 검증합니다.

[학습 경로](../learning/)에서 실습합니다.

중국어만 WeChat QR을 표시하고 다른 언어판은 https://x.com/deepseek_ai로 연결합니다.

## 수동 검수

메뉴에서 키보드, Escape와 포커스 복귀를 확인하고 화면 읽기 프로그램으로 복사 알림을 검증합니다. 실제 휴대폰에서 스크롤과 애니메이션 단계를 확인합니다. 아랍어의 긴 문구와 혼합 방향 명령도 검사합니다. 기기, 브라우저, 동작 설정과 증거를 기록하세요. 번역은 원어민 검수가 필요합니다.

```sh
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
SITE_URL=https://example.github.io/repository/ pnpm perf:pages
```
