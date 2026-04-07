# Claude Code / Codex リリースノート分析 & 投稿ガイド

## 1. リリースノートの取得方法

### Claude Code の取得元

```bash
# GitHub から直接取得
curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md | head -200

# brew でバージョン確認
brew info claude-code@latest --json=v2 | jq -r '.casks[0].version'
```

### 確認すべきソース

| ソース | URL | 用途 | チェック方法 |
|--------|-----|------|-------------|
| **CHANGELOG.md** | `github.com/anthropics/claude-code/blob/main/CHANGELOG.md` | CLI の変更履歴 | `curl` で取得 |
| **GitHub Releases** | `github.com/anthropics/claude-code/releases` | リリースノート | GitHub API で取得 |
| **Anthropic 公式ブログ** | `claude.com/blog` | 新プロダクト発表、機能紹介 | RSSまたはWebフェッチ |
| **Claude Code カテゴリ** | `claude.com/blog-category/claude-code` | Claude Code 関連の記事のみ | 上記に含む |
| **brew** | `brew info claude-code@latest` | バージョン情報 | `brew info --json=v2` |

> **重要**: CHANGELOG には CLI のバージョン更新のみ記載される。
> Code Review のような新プロダクト発表やプラットフォーム変更は **公式ブログ** でのみ告知されることがあるため、ブログも必ずチェックすること。

### Codex の取得元

```bash
# 現在の導入バージョン
codex --version

# brew の導入バージョン
brew info codex | sed -n 's/^==> codex: //p' | head -1
```

| ソース | URL | 用途 | チェック方法 |
|--------|-----|------|-------------|
| **Codex Changelog** | `developers.openai.com/codex/changelog` | CLI の変更履歴 | Web フェッチ |
| **Codex Docs** | `developers.openai.com/codex/` | 機能概要、使い方 | Web フェッチ |
| **OpenAI Developer Blog Topic** | `developers.openai.com/blog/topic/codex` | Codex 関連の記事一覧 | Web フェッチ |
| **brew** | `brew info codex` | バージョン情報 | `brew info` |
| **CLI local** | `codex --version` | ローカル導入済みバージョン | ローカル実行 |

> **重要**: Codex は GitHub の `CHANGELOG.md` よりも、`developers.openai.com/codex/changelog` が一次ソースとして扱いやすい。
> 大きな発表は `developers.openai.com/blog/topic/codex` 側に出ることがあるため、CLI の差分だけで判断しないこと。

---

## 2. CHANGELOG の読み方

### セクション構造

```markdown
## [バージョン番号] - 日付

### Added（新機能）
### Changed（変更）
### Fixed（バグ修正）
### Deprecated（非推奨）
### Removed（削除）
### Security（セキュリティ）
```

### 注目すべきポイント

| 優先度 | カテゴリ | 理由 |
|--------|----------|------|
| **高** | 新コマンド/機能 | ユーザーの使い方が変わる |
| **高** | 破壊的変更 | 既存ユーザーに影響 |
| **中** | バグ修正（重大） | 多くのユーザーが遭遇していた問題 |
| **中** | パフォーマンス改善 | 体感に影響 |
| **低** | 内部リファクタリング | 一般ユーザーには見えない |
| **低** | マイナーなバグ修正 | 影響範囲が限定的 |

### Codex での読み替え

Codex changelog は GitHub の Markdown CHANGELOG と完全に同じ見出し構造とは限らないが、判断軸は同じでよい。

| 見るポイント | 判断 |
|-------------|------|
| 新しいサブコマンド、ツール、ワークフロー | **高** |
| モデル切り替え、既定動作、権限まわりの変更 | **高** |
| feature flag の追加・昇格 | **中** |
| 安定性、起動、パフォーマンスの改善 | **中** |
| 文言修正、小さな不具合修正のみ | **低** |

---

## 3. ブログ記事の書き方

### 記事構成テンプレート

```markdown
---
title: "Claude Code {version} リリース — {目玉機能}"
date: "{YYYY-MM-DD}"
description: "{1〜2文の要約}"
tags: ["claude-code", "anthropic", "ai", "cli", "release"]
---

## Claude Code {version} がリリース
[1段落で概要]

## 新機能
### {機能名} — {一言説明}
[コード例]
[ユースケース]

## バグ修正
### {問題の説明}
**問題**: ...
**修正済み**。

## 改善点
[箇条書きまたはテーブル]

## アップデート方法
```bash
brew upgrade claude-code@latest
```

## まとめ
[テーブルで要約]

## 参考リンク
- [Claude Code GitHub](...)
```

### 書き方のポイント

| ポイント | 説明 |
|----------|------|
| **見出しで完結** | `### /loop コマンド — 定期プロンプト実行` |
| **コード例は必須** | 実際に動くコマンドを示す |
| **テーブルを多用** | 情報を整理して見やすく |
| **短い段落** | 1段落は2〜3文まで |
| **日本語 + 英語用語** | 専門用語は英語のまま |

### 避けるべきこと

- 長い導入文（すぐ本題へ）
- 「〜と思います」「〜かもしれません」（断定調で）
- 全部の変更を網羅（重要なものを厳選）
- 公式の文言をそのまま翻訳（自分の言葉で解釈）

---

## 4. X（Twitter）投稿の書き方

### 投稿スタイルの出し分け

リリース内容に応じて **1ツイート** で最適な形式を選ぶ。

| リリース内容 | スタイル | 説明 |
|-------------|---------|------|
| 大きな新機能がある | **A: 目玉機能フォーカス** | 1つの機能にフォーカスし、使い方の具体例を示す |
| 複数の変更がバランスよくある | **B: カテゴリ別リスト** | 【新機能】【バグ修正】【改善】等で分類して網羅 |
| バグ修正・改善が中心 | **C: 短い要約** | 主要な変更を数行でまとめる |
| マイナーな修正のみ | **スキップ** | 投稿しない |

---

### スタイルA: 目玉機能フォーカス

**使うとき**: ユーザーの使い方が変わる新コマンド・新機能・新プロダクトがある場合

#### 例1: CLIの新コマンド

```
Claude Codeに/loop コマンドがきています

/loop [interval] <prompt>

最小単位は1分
```

#### 例2: 新プロダクト発表（数値・コスト・リンクあり）

```
Claude Code Code Review 機能追加

1. PRが開くと複数Agentが並行稼働
2. 検証・重大度ランク付け
3. 結果はサマリー+インラインコメント

効果
レビューコメント率 16%→54%
誤検知 < 1%

$15〜25/PRと深いレビューの分コスト高め

https://claude.com/blog/code-review
```

**ポイント**:
- 機能名 + 使い方（コマンド例）を具体的に示す
- 公式ブログに詳細がある場合はURLを貼る
- 数値データ（効果、コスト等）があれば含める
- 感嘆符は控えめに。事実ベースで淡々と
- スクリーンショットがあるとなお良い

---

### スタイルB: カテゴリ別リスト

**使うとき**: 新機能・改善が複数あり、目玉だけに絞って伝えたい場合

```
Claude Code 2.1.72

新機能
・ExitWorktreeツール追加
・/plan fix the auth bug で即プランモード開始
・/copy w キーでファイルへ直書き（SSH向け）

改善
・effort levelsを3段階に簡素化（max廃止）
・prompt cache修正で入力トークンコスト最大12x削減
```

**ポイント**:
- 【】は使わず「新機能」「改善」等の見出しだけでシンプルに
- 各項目は1行に収める。説明は最小限
- X の文字数制限に収まるよう、目玉の変更だけを厳選（全部列挙しない）
- バグ修正が多い場合も重要なものだけ。「バグ修正多数」で済ませてよい
- 重要度順に並べる

---

### スタイルC: 短い要約

**使うとき**: バグ修正・改善が中心で、目玉と言える新機能がない場合

```
Claude Code {version} 🔧

安定性が大幅向上:
• stdin フリーズ問題を修正
• Voice 起動時のフリーズ解消
• OAuth トークン更新の改善

長時間セッションがより快適に
```

---

### 共通ルール

| ルール | 説明 |
|--------|------|
| **文字数** | X の制限（日本語は実質140文字）に収める。項目を厳選し、1項目1行で短く書く |
| **ハッシュタグ** | なくてもOK。つけるなら `#ClaudeCode` 程度 |
| **改行** | 読みやすさのため積極的に使う |
| **絵文字** | 控えめに。なくてもよい |
| **文体** | 事実ベース。「〜がリリースされました！！」のような感嘆は避ける |
| **言語** | 日本語。専門用語（OAuth, stdin 等）は英語のまま |

### NG パターン

| NG | 理由 |
|----|------|
| 「〜がリリースされました！！」| 感嘆符過剰 |
| 変更を全部列挙（スタイルA/Cで） | 読めない。網羅はスタイルBで |
| リンクだけ | 何が変わったか分からない |
| 英語の CHANGELOG をそのまま | 日本語で書く |
| 「〜の違い:」「〜の特徴:」の後に箇条書き | AI生成感が出る。テーブルか地の文で書く |

---

## 5. 判断基準

### 投稿する価値があるか

| 条件 | 判断 |
|------|------|
| 新コマンド追加 | **投稿する** |
| 重大なバグ修正 | **投稿する** |
| 破壊的変更 | **投稿する**（警告として） |
| マイナーバグ修正のみ | スキップ |
| 内部リファクタリングのみ | スキップ |

### ブログ vs X のみ

| 変更の規模 | 対応 |
|------------|------|
| 新機能 + 複数の改善 | ブログ + X |
| 1つの目玉機能 | X のみ（または短いブログ） |
| バグ修正のみ | X のみ |
| マイナー | スキップ |

---

## 6. Codex 向けの補足

### X投稿で触れるとよい点

| 観点 | 例 |
|------|----|
| 何が変わったか | 新コマンド、承認フロー、feature flag、モデル既定値 |
| どう使うか | `codex exec`、`codex features list`、`codex -c ...` |
| 誰に効くか | 日常利用、CI、長文コンテキスト、レビュー用途 |

### 使い方の具体例

```bash
codex exec "Review this diff"
codex features list
codex -c model=\"gpt-5.4\" exec "Summarize this repository"
```

### ブログ推奨の判断

| 条件 | 判断 |
|------|------|
| 新しいワークフローが増える | **ブログ候補** |
| 既定モデルやコンテキスト挙動が変わる | **ブログ候補** |
| 安定性改善が中心 | X のみ |
| マイナー修正のみ | スキップ |

## 7. 自動チェックの設定

### Claude スケジュールタスク用プロンプト

```
Claude Code / Codex 関連のアップデートをチェック:

■ チェック1: Claude Code CLI バージョン
1. brew info claude-code@latest --json=v2 | jq -r '.casks[0].version' でバージョン確認
2. .versions/claude-code と比較
3. 新バージョンなら CHANGELOG.md を取得して分析

■ チェック2: Claude Code 公式ブログ
1. https://claude.com/blog-category/claude-code の最新記事を確認
2. .versions/claude-blog-last-check に前回チェックした記事タイトルを保存
3. 新しい記事があれば内容を取得して分析

■ チェック3: Codex CLI バージョン
1. brew info codex | sed -n 's/^==> codex: //p' | head -1 でバージョン確認
2. .versions/codex と比較
3. 新バージョンなら https://developers.openai.com/codex/changelog を取得して分析

■ チェック4: Codex 公式発信
1. https://developers.openai.com/blog/topic/codex の最新記事を確認
2. .versions/codex-blog-last-check に前回チェックした記事タイトルを保存
3. 新しい記事があれば内容を取得して分析

■ 共通
- リリース内容に応じてスタイルA/B/Cを選択してX投稿ドラフトを作成
- ブログを書く価値があるかも判断
- Mac デスクトップに通知
```

### 通知内容

新バージョンまたは新記事の検出時に以下を出力:
1. 対象プロダクト（Claude Code / Codex）
2. 検出ソース（CHANGELOG / ブログ）
3. バージョン情報または記事タイトル
4. 主要な変更点（日本語要約）
5. X投稿用ドラフト（コピペ可能な形式で）
6. ブログを書く価値があるかの判断
