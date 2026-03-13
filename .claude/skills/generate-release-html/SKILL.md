---
name: generate-release-html
description: Claude Code / Codex のリリースノートテキストを Anthropic カラーの日本語 HTML 画像（900x900px・1カラム・カード表示）として出力する
disable-model-invocation: true
user-invocable: true
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Claude Code / Codex のリリースノートテキストを受け取り、Anthropic カラーの日本語 HTML 画像（900×900px・1カラム・カード表示）として出力する。

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

### カラーパレット（Anthropic カラー）

| 用途 | カラー |
|------|--------|
| 背景 | `#faf8f4`（ウォームホワイト） |
| テキスト | `#1a1612`（ダークブラウン） |
| アクセント | `#cc785c`（コッパー） |
| ミュート | `#8a7d6e` |
| ボーダー | `#e0d8cc` |

### カテゴリ別カラー

| カテゴリ | 文字色 | 背景色 |
|---------|--------|--------|
| 新機能 | `#5c7a4e` | `#f0f5ec` |
| バグ修正 | `#cc785c` | `#fdf3ee` |
| 改善 | `#4a6fa5` | `#eef2f8` |
| 変更 | `#7a5ca0` | `#f4f0fa` |
| 非推奨 | `#8a7020` | `#faf5e4` |

### フォント

- 見出し: Instrument Serif（Google Fonts）
- モノスペース: DM Mono（Google Fonts）
- 本文: Noto Sans JP（Google Fonts）

### 構成要素

1. **ヘッダー**: バージョン番号（コッパー）+ 製品名 + カテゴリ別件数バッジ
2. **本文**: 1カラム、カテゴリごとにカード（角丸 + 薄い背景色 + 左ボーダー）を縦に並べる
3. **各カード**: カテゴリラベル + 項目リスト（カラードット＋テキスト、`code` はインラインコードスタイル）
4. **フッター**: "Anthropic" ロゴ + "claude.ai/code"

## 分類ルール

英語のリリースノートを以下のルールで日本語に分類・翻訳する:

- Added → 新機能
- Fixed → バグ修正
- Improved → 改善
- Changed → 変更
- Deprecated → 非推奨

項目数が多い場合は、カード内で2列グリッドにして項目を並べてもよい。

## HTML テンプレート構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- Google Fonts: Instrument Serif, DM Mono, Noto Sans JP -->
  <!-- CSS変数でカラー管理 -->
  <!-- body: width/height 900px, overflow hidden, flex column -->
</head>
<body>
  <div class="header">      <!-- バージョン + カテゴリバッジ -->
  <div class="body">        <!-- 2カラムグリッド -->
    <div class="col">       <!-- 左: 新機能 + バグ修正前半 -->
    <div class="col">       <!-- 右: バグ修正後半 + 改善 + 変更 + 非推奨 -->
  </div>
  <div class="footer">      <!-- Anthropic + claude.ai/code -->
</body>
</html>
```

## 注意事項

- `code` タグで囲む対象: コマンド名（`/resume`）、フラグ（`--continue`）、環境変数（`NODE_EXTRA_CA_CERTS`）、エラーコード（`EEXIST`）
- 日本語訳は自然な体言止め or「〜を修正」で統一
- 1項目が長い場合は適度に短縮してよい（意味が変わらない範囲で）
- `overflow: hidden` のため、全項目が収まるよう font-size や padding を微調整すること
- 保存後 `./outputs/release-notes-{バージョン}.html` のパスを報告する
