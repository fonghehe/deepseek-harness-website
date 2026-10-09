---
title: '아키텍처'
description: 'React 컴포넌트, Next.js 경로, 애니메이션 재생, VitePress 문서 제공.'
---

# 아키텍처

사이트는 이 저장소에서 관리하는 React 컴포넌트, Hook, CSS로 빌드합니다. Next.js가 서버 렌더링(SSR)과 하이드레이션을 담당합니다. 원본 사이트에서 캡처한 HTML이나 컴파일된 앱을 로드하지 않으며, 브랜드 이미지, 글꼴, 파일 아이콘, WeChat QR 코드 등을 정적 리소스로 사용합니다.

## 컴포넌트 디렉터리

페이지 진입점은 `landing-page.tsx`에 유지하고 레이아웃, 조작, 데모, GPU 역할별로 분리합니다. `previews/`에는 일러스트 JSX, 컨테이너 쿼리와 타임라인을 함께 두고 `graphics/`에는 렌더러, 지오메트리와 셰이더를 모읍니다. 텍스트 보조는 `shared/`, 공통 재생 Hook은 `src/hooks/use-demo-scene.ts`에 유지합니다. 중앙 재내보내기 파일 없이 실제 모듈을 직접 import하여 서버/클라이언트 경계와 GPU 지연 로딩을 명확하게 보여 줍니다.

```text
src/components/
├── landing-page.tsx    # 페이지 구성
├── layout/             # 헤더, 푸터와 브랜드
├── controls/           # 언어, 다운로드, 복사와 연락처
├── sections/           # 데모 영역과 상세 카드
├── previews/           # 다섯 일러스트와 CSS 타임라인
├── motion/             # 등장, 원근과 CTA 모션
├── graphics/           # Three.js 장면, 셰이더와 지오메트리
├── shared/             # 제목과 리치 텍스트
└── styles/             # 디자인 변수, 반응형과 RTL
```

## 컴포넌트 구성

```text
page.tsx → locale + dictionary → LandingPage → Next.js SSR
layout.tsx → html lang / dir
browser → generated chunks → client events / demo state
/docs/ → /docs/en/ → VitePress article
```

| 컴포넌트                    | 소스                                                                            |
| --------------------------- | ------------------------------------------------------------------------------- |
| 헤더, 언어 선택, 다운로드   | `layout/header.tsx`, `controls/locale-menu.tsx`, `controls/download-menu.tsx`   |
| 첫 화면의 데스크톱 미리보기 | `previews/desktop-preview.tsx`                                                  |
| 네 가지 대화형 데모         | `sections/capability-demos.tsx`, `use-demo-scene.ts`                            |
| 기본 접기·펼치기 상세 카드  | `sections/feature-section.tsx`                                                  |
| 클립보드, Canvas, 연락처    | `controls/copy-command.tsx`, `graphics/particle-field.tsx`, `layout/footer.tsx` |
| 스타일과 메타데이터         | `styles/harness.css`, `website-metadata.ts`                                     |

## SSR과 언어

페이지가 언어를 검증하고 사전을 props로 LandingPage에 전달합니다. 서버와 클라이언트는 같은 JSX를 사용합니다. RichText는 허용된 태그만 해석하고 임의 HTML을 주입하지 않습니다. 라우트 그룹의 루트 레이아웃이 서버에서 lang과 dir을 설정합니다.

## 데모 재생 제어

`use-demo-scene`은 가시성, 포그라운드, 동작 감소와 사용자 일시정지를 결합합니다. CSS `animation-play-state`가 위치를 유지하며 매 프레임 React를 갱신하지 않습니다. workflow는 매 주기마다 시나리오를 변경합니다.

## Canvas 생명주기

`ParticleField`는 화면에 보이고 포그라운드일 때만 Three.js 장면을 로드합니다. `RawShaderMaterial`은 자체 유체 GLSL과 색상을 유지하고 `InstancedBufferGeometry`는 타일을 한 번의 인스턴스 드로우로 그립니다. 지원 환경에서 `compileAsync`로 셰이더를 병렬 준비합니다. 최대 30fps와 CSS 픽셀 해상도를 사용하며 화면 밖과 백그라운드에서는 멈춥니다. 동작 감소 시 GPU 할당을 생략하고 종료 시 geometry, material, texture, renderer를 해제합니다.

Framer Motion은 탐색 스프링, 진입과 스크롤 원근을 담당하며 매 프레임 React를 다시 렌더링하지 않습니다. 네 데모는 22초, 17.5초, 11초, 15초 CSS 시간축과 컨테이너 크기 조절 및 일시정지 위치를 유지합니다.

## 문서 제공

VitePress/Vue가 public/docs를 생성하고 Next.js가 동일 출처에서 제공합니다. 독립 개발과 미리보기도 영어를 엽니다. Vue 테마는 이동 뒤 방향과 SEO를 바꾸고 이전 노드와 오래된 갱신을 제거합니다.

## SEO와 문서 캐시

`website-metadata.ts`는 Next.js Metadata API와 `SITE_URL` 또는 미리보기 요청의 출처를 사용합니다. 아랍어에 임의의 지역 코드를 지정하지 않습니다. VitePress 문서 캐시는 출처와 문서별로 분리하고 최대 128개 항목을 5분 동안 보관합니다. 렌더링에 실패한 항목은 제거하며 약한 ETag가 일치하면 본문 없는 `304` 응답을 반환합니다.

## 입력과 빌드

컴포넌트, Hook, CSS, Markdown, 정적 리소스를 버전 관리합니다. JavaScript와 CSS는 `pnpm build`로 생성하며 `.next`와 `public/docs`는 Git 관리 대상에서 제외합니다. `tests/fixtures/assets.json`을 기준으로 리소스 무결성을 확인하고 캡처한 HTML이나 원본 실행 코드가 다시 포함되는 것을 막습니다.

중국어만 WeChat QR을 표시하고 다른 언어판는 https://x.com/deepseek_ai로 연결합니다.

컴포넌트 소스를 직접 관리하면 가독성이 좋아지지만 정확한 화면, 모든 상호작용이나 모바일 성능을 증명하지 않습니다. 과거 보고서는 이전 구현입니다. 번역, 포커스와 혼합 방향은 수동 점검이 필요합니다.

영어 기본 문서에서 더 자세히 설명합니다. [English](../../en/architecture/)

## 웹사이트 공개 배포

GitHub Pages는 웹사이트와 전체 문서를 정적 파일로 공개합니다. `pnpm build:pages`는 실제 배포 URL과 저장소 경로를 사용하고 `pnpm check:pages`는 로컬 링크와 SEO를 검증합니다. 기존 Next.js 서버 모드도 유지합니다. 요청별 출처, 애플리케이션 캐시 헤더와 조건부 문서 ETag는 서버 전달 기능입니다. Pages 메타데이터는 빌드 시 결정됩니다. 배포 절차는 `DEVELOPMENT.md`에 있습니다.

## 렌더링과 배포 경계

파일과 실행 추적의 정적 그림은 서버에서 렌더링합니다. 재생 제어와 시나리오가 바뀌는 워크플로는 클라이언트 컴포넌트입니다. 큰 플러그인 SVG는 HTML/RSC 직렬화 증가를 막기 위해 클라이언트 경계를 유지합니다. 경계를 바꾸기 전에 HTML과 스크립트 크기를 함께 비교합니다.

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
