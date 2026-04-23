---
name: check-release
description: Claude Code / Codex の最新リリースと公式ブログをチェックし、X投稿用ドラフトとリリースノートHTMLを作成する
disable-model-invocation: true
user-invocable: true
allowed-tools: Bash, Read, Write, Edit, WebSearch, WebFetch, Glob, Grep
version: "2.0"
last_updated: "2026-04-23"
---

Claude Code / Codex の最新バージョンと公式ブログをチェックして、新しいリリースがあればX投稿用ドラフトとリリースノートHTMLを作成してください。

作業前に `.claude/RELEASE_NOTES_GUIDE.md` を必ず参照してください。

## 設計方針: 自己修復パイプライン

brew キャッシュ遅延・token 上限・スコープ逸脱を避けるため以下の3フェーズで動作する:

1. **Pre-flight**: 複数ソース（GitHub Releases / npm / brew）を照合し、最新バージョンを採用
2. **実行**: HTML 生成と X 下書きを別ツール呼び出しに分割して token 上限回避
3. **Post-flight**: 処理バージョンを `.versions/` に書き込み、コミット＆プッシュ

---

## Pre-flight

### チェック1: Claude Code CLI

以下のソースを並列で取得し、**最も新しいバージョンを採用**（brew は数日遅れることがあるため単独信用しない）:

```bash
# GitHub Releases（一次ソース）
curl -s https://api.github.com/repos/anthropics/claude-code/releases/latest | jq -r '.tag_name'

# npm（配布元の1つ、最新追従が早い）
npm view @anthropic-ai/claude-code version

# brew（多くのユーザーの実環境）
brew info claude-code@latest --json=v2 | jq -r '.casks[0].version'
```

`.versions/claude-code` と比較。同じならスキップ。異なる場合はバージョン範囲 `[stored+1 ... target]` を処理対象とする。

CHANGELOG は GitHub の一次ソースから取得:
```bash
curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
```

### チェック2: Codex CLI

```bash
# GitHub Releases（一次ソース、rust-vX.Y.Z 形式）
curl -s https://api.github.com/repos/openai/codex/releases/latest | jq -r '.tag_name' | sed 's/^rust-v//'

# brew
brew info codex | sed -n 's/^==> codex: //p' | head -1
```

`.versions/codex` と比較。CHANGELOG は GitHub Releases 本体（`curl -s https://api.github.com/repos/openai/codex/releases/tags/rust-v{VERSION} | jq -r '.body'`）。

### チェック3/4: ブログ

- Claude Code: `https://claude.com/blog-category/claude-code` → `.versions/claude-blog-last-check` と比較
- Codex: `https://developers.openai.com/blog/topic/codex` → `.versions/codex-blog-last-check` と比較

---

## 実行（token 上限を避けるための分割）

新バージョン検出時は**以下の順で分割実行**する。1つのツール呼び出しで 500 token 超を避けるため、それぞれ別の Write 呼び出しで行う:

1. **HTML 生成**: `.claude/skills/generate-release-html/SKILL.md` に従い、`~/Desktop/release-notes-{バージョン}.html` を1つの Write で出力
2. **X投稿ドラフト生成**: `/tmp/x-post-cc.txt`（または `-codex.txt`）を別の Write で出力
3. **バージョンファイル更新**: `.versions/claude-code` 等を別の Write で更新

各ステップは独立したツール呼び出しで行い、1回あたりの出力が肥大化しないようにする。

---

## Post-flight

1. `.versions/` ファイルをコミット＆プッシュ（コミットメッセージにバージョン範囲を明記）
   ```bash
   git add .versions/
   git commit -m "chore: update Claude Code 2.1.116 → 2.1.117"
   git push origin main
   ```
2. X投稿ドラフトを `pbcopy` でクリップボードにコピー
3. 処理結果サマリを報告（対象・バージョン範囲・生成物パス・ブログ推奨）

マイナー修正のみでX投稿をスキップする場合は HTML もスキップ。ただし `.versions/` は必ず更新（次回の差分検出のため）。

---

## X投稿ドラフトのルール

スタイル選択（RELEASE_NOTES_GUIDE.md に従う）:
- 大きな新機能・新プロダクト → スタイルA: 目玉機能フォーカス
- 複数の変更がバランスよくある → スタイルB: カテゴリ別リスト
- バグ修正・改善中心 → スタイルC: 数行の短い要約
- マイナー修正のみ → スキップと報告

文字数制限: 全角140文字（半角280文字）以内に必ず収めること。

書き方:
- 【】は使わない。「新機能」「改善」等の見出しだけでシンプルに
- 目玉の変更だけ厳選、各項目は1行、説明は最小限
- 事実ベース。「〜がリリースされました！！」のような感嘆は避ける
- 日本語。専門用語（OAuth, stdin 等）は英語のまま
- 「〜の違い:」「〜の特徴:」+ 箇条書きはNG（AI生成感が出る）

スタイルBの例:
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

---

## 全て変更なしの場合

「更新なし」とだけ報告して終了。

## 出力

対象プロダクト、バージョン範囲、変更点の日本語要約、X投稿ドラフト（クリップボード）、ブログ推奨有無、HTMLファイルパス。
