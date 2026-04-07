---
name: generate-release-html
description: Claude Code / Codex のリリースノートテキストを各ブランドカラーの日本語 HTML 画像（900x900px・1カラム・カード表示）として出力する
disable-model-invocation: true
user-invocable: true
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
version: "1.0"
last_updated: "2026-04-07"
---

Claude Code / Codex のリリースノートテキストを受け取り、各ブランドカラーの日本語 HTML 画像（900×900px・1カラム・カード表示）として出力する。
Claude Code → Anthropic カラー、Codex → OpenAI カラーを使い分ける。

## 入力形式

以下のいずれかで渡す:
- バージョン番号と箇条書きのリリースノートテキスト（英語可）
- GitHub Releases / CHANGELOG.md のテキスト

## 出力仕様

- ファイル: `release-notes-{バージョン番号}.html`（例: `release-notes-2172.html`）
- 保存先: `~/Desktop/`
- サイズ: `width: 900px; height: 900px; overflow: hidden`（スクショで正方形画像になる想定）
- レイアウト: 1カラム・カード表示（カテゴリごとにカードを縦に並べる）

## デザイン仕様

### カラーパレット — Claude Code（Anthropic カラー）

| 用途 | カラー |
|------|--------|
| 背景 | `#faf8f4`（ウォームホワイト） |
| テキスト | `#1a1612`（ダークブラウン） |
| アクセント | `#cc785c`（コッパー） |
| ミュート | `#8a7d6e` |
| ボーダー | `#e0d8cc` |

#### カテゴリ別カラー（Claude Code）

| カテゴリ | 文字色 | 背景色 |
|---------|--------|--------|
| 新機能 | `#5c7a4e` | `#f0f5ec` |
| バグ修正 | `#cc785c` | `#fdf3ee` |
| 改善 | `#4a6fa5` | `#eef2f8` |
| 変更 | `#7a5ca0` | `#f4f0fa` |
| 非推奨 | `#8a7020` | `#faf5e4` |

### カラーパレット — Codex（OpenAI カラー）

| 用途 | カラー |
|------|--------|
| 背景 | `#f7f7f8`（クールグレーホワイト） |
| テキスト | `#171717`（ニアブラック） |
| アクセント | `#10a37f`（OpenAI グリーン） |
| ミュート | `#6e6e80` |
| ボーダー | `#d9d9e3` |

#### カテゴリ別カラー（Codex）

| カテゴリ | 文字色 | 背景色 |
|---------|--------|--------|
| 新機能 | `#10a37f` | `#e6f7f2` |
| バグ修正 | `#cf4e2e` | `#fdf0ed` |
| 改善 | `#2e6fba` | `#eaf1fb` |
| 変更 | `#7c5cbf` | `#f3effc` |
| 非推奨 | `#8a7020` | `#faf5e4` |

### フォント

- 見出し: Instrument Serif（Google Fonts）
- モノスペース: DM Mono（Google Fonts）
- 本文: Noto Sans JP（Google Fonts）

### 構成要素

1. **ヘッダー**: バージョン番号（アクセント色）+ 製品名 + カテゴリ別件数バッジ
2. **本文**: 1カラム、カテゴリごとにカード（角丸 + 薄い背景色 + 左ボーダー）を縦に並べる
3. **各カード**: カテゴリラベル + 項目リスト（カラードット＋テキスト、`code` はインラインコードスタイル）
4. **フッター**: Claude Code → "Anthropic" + "claude.ai/code" / Codex → "OpenAI" + "developers.openai.com/codex"

## 分類ルール

英語のリリースノートを以下のルールで日本語に分類・翻訳する:

- Added → 新機能
- Fixed → バグ修正
- Improved → 改善
- Changed → 変更
- Deprecated → 非推奨

項目数が多い場合は、カード内で2列グリッドにして項目を並べてもよい。

## HTML テンプレート

テンプレートファイルをコピーして内容を差し替える。**CSS や構造は変更しない。**

| 対象 | テンプレートファイル |
|------|---------------------|
| Claude Code | `template-claude-code.html`（同ディレクトリ） |
| Codex | `template-codex.html`（同ディレクトリ） |

### 差し替え手順

1. テンプレートを Read で読む
2. `{{VERSION}}` → バージョン番号
3. `{{DATE}}` → リリース日（YYYY-MM-DD）
4. `<!-- {{BADGES}} -->` → バッジ要素に置換（例: `<span class="badge b-new">新機能 5</span>`）
5. `<!-- {{CARDS}} -->` → カテゴリカード群に置換（テンプレート内のコメントに書き方あり）
6. `~/Desktop/` に保存

## 注意事項

- `code` タグで囲む対象: コマンド名（`/resume`）、フラグ（`--continue`）、環境変数（`NODE_EXTRA_CA_CERTS`）、エラーコード（`EEXIST`）
- 日本語訳は自然な体言止め or「〜を修正」で統一
- 1項目が長い場合は適度に短縮してよい（意味が変わらない範囲で）
- `overflow: hidden` のため、全項目が収まるよう項目数を調整すること（CSS は変更しない）
- 保存後 `~/Desktop/release-notes-{バージョン}.html` のパスを報告する
