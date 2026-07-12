---
name: portfolio-brand
description: このポートフォリオサイトのブランド（ダークスレート基調 + バイオレットアクセント、Geist書体）を、生成する成果物すべてに自動適用する。ブログのカバー画像、OGP画像、リリースノートHTML、図解・チャート、新規UIコンポーネントを作るときに必ず適用する。ユーザーに配色や書体を確認せず、本定義を直接使う。
---

# Portfolio Brand

サイト実装（globals.css / Tailwind クラスの実使用）から抽出したブランド定義。
成果物の種類を問わず、この配色と書体を自動適用する。ユーザーへの色・書体の確認は不要。

## Colors

ベース（ダークテーマが正）:

- Background: #0f172a (slate-900)
- Surface: #1e293b (slate-800)
- Text Primary: #e2e8f0 (slate-200)
- Text Secondary: #94a3b8 (slate-400)
- Text Muted: #64748b (slate-500)

アクセント（バイオレット系。使用は全体の 1〜2 割に抑える）:

- Accent: #c4b5fd (violet-300)
- Accent Strong: #a78bfa (violet-400)
- Accent Border: #8b5cf6 (violet-500)

ライト背景が必要な場合（印刷・埋め込み等）:

- Background: #ffffff / Text: #171717（globals.css のライト定義に従う）

## Typography

- Headings / Body: Geist Sans（CSS 変数 `--font-geist-sans`）
- Code: Geist Mono（`--font-geist-mono`）
- フォールバック: Arial, Helvetica, sans-serif

## 適用ルール

- ブログカバー画像・OGP 画像 — slate-900 背景 + violet アクセントの幾何学・抽象表現。写真風にしない。テキストは最小限（タイトル程度）
- 図解・チャート — 背景 slate-900、系列色は violet 系を主、対比が必要なときのみ slate-400。グリッド線は slate-800
- リリースノート HTML・ドキュメント — 上記ベース色 + 見出しに Geist Sans
- 新規 UI コンポーネント — 既存の Tailwind クラス（bg-slate-800/900, text-slate-200/400, violet-300〜500）を再利用し、新しい色を導入しない

## 禁止

- ブランド外のアクセント色（青・緑・オレンジ等）の導入
- 純黒 #000000 の背景（slate-900 を使う）
- 彩度の高い violet-600 以上を広面積で使うこと（アクセントは 300〜500 に限定）
