---
title: 'アーキテクチャ'
description: 'React のコンポーネント、Next.js のルート、アニメーション、VitePress の配信。'
---

# アーキテクチャ

サイトは本リポジトリで管理する React コンポーネント、Hook、CSS から構築します。Next.js がサーバーサイドレンダリング（SSR）とハイドレーションを担当します。元サイトから取得した HTML やコンパイル済みアプリは読み込まず、ブランド画像、フォント、ファイルアイコン、WeChat の QR コードなどを静的リソースとして利用します。

## コンポーネントのディレクトリ

ページの入口は `landing-page.tsx` に残し、責務ごとに配置します。レイアウト、操作、デモ、GPU の変更箇所が分かります。`previews/` は JSX、コンテナクエリと時間軸をまとめ、`graphics/` は renderer、geometry と shader をまとめます。テキスト用の補助コンポーネントは `shared/`、共通再生 Hook は `src/hooks/use-demo-scene.ts` にあります。再エクスポート用の集約ファイルを使わず、各モジュールを直接 import することで、サーバー／クライアントの境界と GPU の遅延読み込みを明示します。

```text
src/components/
├── landing-page.tsx    # ページの構成
├── layout/             # ヘッダー、フッターとブランド
├── controls/           # 言語、ダウンロード、コピーと連絡先
├── sections/           # デモのセクションと詳細カード
├── previews/           # 五つのプレビューと CSS 時間軸
├── motion/             # 表示時のアニメーション、遠近感と CTA の動き
├── graphics/           # Three.js シーン、shader と geometry
├── shared/             # 見出しとリッチテキスト
└── styles/             # デザイン変数、レスポンシブと RTL
```

## コンポーネント構成

```text
page.tsx → locale + dictionary → LandingPage → Next.js SSR
layout.tsx → html lang / dir
browser → generated chunks → client events / demo state
/docs/ → /docs/en/ → VitePress article
```

| コンポーネント                           | ソース                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| ヘッダー・言語・ダウンロード             | `layout/header.tsx`, `controls/locale-menu.tsx`, `controls/download-menu.tsx`   |
| ファーストビューのデスクトッププレビュー | `previews/desktop-preview.tsx`                                                  |
| 四つの対話型デモ                         | `sections/capability-demos.tsx`, `use-demo-scene.ts`                            |
| HTML 標準の詳細カード                    | `sections/feature-section.tsx`                                                  |
| コピー・Canvas・連絡先                   | `controls/copy-command.tsx`, `graphics/particle-field.tsx`, `layout/footer.tsx` |
| スタイル・メタデータ                     | `styles/harness.css`, `website-metadata.ts`                                     |

## SSR と言語

言語を検証したページが共通 LandingPage を呼び、辞書を props として渡します。サーバーとクライアントは同じ JSX を使います。RichText は許可した書式だけを解釈し、任意 HTML を注入しません。ルートグループのルートレイアウトが lang と dir をサーバーで設定します。

## デモの再生制御

`use-demo-scene` は可視性、前景、動きの設定とユーザーの一時停止を統合します。CSS の `animation-play-state` が再生位置を保持し、毎フレーム React を更新しません。workflow は一周期ごとにシナリオを切り替えます。

## Canvas のライフサイクル

`ParticleField` は表示中かつフォアグラウンドのときだけ Three.js シーンを読み込みます。`RawShaderMaterial` は独自の流体 GLSL と色値を保持し、`InstancedBufferGeometry` がタイルを一括描画します。対応環境では `compileAsync` がシェーダーを並列に準備します。描画は最大 30fps、CSS ピクセル解像度とし、画面外やバックグラウンドでは停止します。動きを減らす設定では GPU を割り当てず、終了時には geometry、material、texture、renderer を解放します。

Framer Motion がナビゲーションのスプリング、表示時のアニメーション、スクロールによる遠近感を担当し、React を毎フレーム再描画しません。四つのデモは 22 秒、17.5 秒、11 秒、15 秒の CSS 時間軸とコンテナ拡縮、一時停止位置を保持します。

## 文書配信

VitePress/Vue が public/docs を生成し、Next.js が同一 origin で配信します。独立開発とプレビューを含め入口は英語です。Vue テーマが移動後の方向と SEO を更新し、旧ノードと古い更新を除きます。

## SEO と文書キャッシュ

`website-metadata.ts` は Next.js Metadata API を使い、`SITE_URL` またはプレビューのリクエスト元から URL を決定します。地域を指定しないアラビア語に、架空の地域コードは付けません。VitePress 記事のキャッシュはオリジンと記事ごとに分離し、最大 128 件を 5 分間保持します。失敗した描画結果は除去し、弱い ETag が一致した場合は本文のない `304` を返します。

## 入力と生成物

React、Hook、CSS、Markdown と静的リソースをバージョン管理します。JavaScript と CSS は `pnpm build` で生成し、`.next` と `public/docs` は Git の管理対象から除外します。`tests/fixtures/assets.json` に基づくチェックで静的リソースの整合性を確認し、取得した HTML や元サイトの実行コードが再導入されるのを防ぎます。

中国語だけ WeChat QR を表示し、他の言語は https://x.com/deepseek_ai へリンクします。

コンポーネントのソースを管理することは読みやすさを改善しますが、視覚一致、全操作とモバイル性能はブラウザーで別途確認します。歴史的レポートは旧実装の値です。人手で翻訳、フォーカスと混在方向を確認します。

詳しい主版は英語です。 [English](../../en/architecture/)

## サイトの公開

GitHub Pages はサイトと全ドキュメントを静的ファイルとして公開します。`pnpm build:pages` は実際の公開 URL とリポジトリのパスを使い、`pnpm check:pages` がローカルリンクと SEO を確認します。通常の Next.js サーバーも維持します。リクエスト単位のオリジン、アプリのキャッシュヘッダーと条件付き ETag はサーバー配信の機能です。Pages のメタデータは構築時に確定します。公開手順は `DEVELOPMENT.md` を参照してください。

## 描画と配信の境界

ファイルと実行トレースの静的な図はサーバーで描画します。再生操作とシナリオが変わるワークフローはクライアントで動作します。大きなプラグイン SVG は HTML/RSC の増加を抑えるためクライアント境界を維持します。境界変更では HTML とスクリプトの両方を比較します。

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
