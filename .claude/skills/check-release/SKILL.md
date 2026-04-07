---
name: check-release
description: Claude Code / Codex の最新リリースと公式ブログをチェックし、X投稿用ドラフトとリリースノートHTMLを作成する
disable-model-invocation: true
user-invocable: true
allowed-tools: Bash, Read, Write, Edit, WebSearch, WebFetch, Glob, Grep
version: "1.0"
last_updated: "2026-04-07"
---

Claude Code / Codex の最新バージョンと公式ブログをチェックして、新しいリリースがあればX投稿用ドラフトとリリースノートHTMLを作成してください。

作業前に `.claude/RELEASE_NOTES_GUIDE.md` を必ず参照してください。

■ 事前準備
1. `brew update` を実行してキャッシュを更新

■ チェック1: Claude Code CLI バージョン
1. `brew info claude-code@latest --json=v2 | jq -r '.casks[0].version'` で最新バージョンを確認
2. `.versions/claude-code` と比較。同じなら次へ
3. 新バージョンの場合:
   - `curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md` で CHANGELOG を取得・分析
   - リリース内容に応じてX投稿ドラフトを作成
   - ブログを書く価値があるかも判断
   - `.versions/claude-code` にバージョンを保存

■ チェック2: Claude Code 公式ブログ
1. `https://claude.com/blog-category/claude-code` の最新記事を確認
2. `.versions/claude-blog-last-check` と比較。同じなら次へ
3. 新しい記事がある場合:
   - 記事の内容を取得して分析
   - X投稿ドラフトを作成
   - `.versions/claude-blog-last-check` に記事タイトルを保存

■ チェック3: Codex CLI バージョン
1. `brew info codex | sed -n 's/^==> codex: //p' | head -1` で最新バージョンを確認
2. `.versions/codex` と比較。同じなら次へ
3. 新バージョンの場合:
   - `https://developers.openai.com/codex/changelog` を取得・分析
   - X投稿ドラフトを作成
   - ブログを書く価値があるかも判断
   - `.versions/codex` にバージョンを保存

■ チェック4: Codex 公式ブログ
1. `https://developers.openai.com/blog/topic/codex` の最新記事を確認
2. `.versions/codex-blog-last-check` と比較。同じなら次へ
3. 新しい記事がある場合:
   - 記事の内容を取得して分析
   - X投稿ドラフトを作成
   - `.versions/codex-blog-last-check` に記事タイトルを保存

■ 変更検出時の共通アクション
- `.versions/` ファイルを更新してコミット＆プッシュ
- 新バージョン検出時: `.claude/skills/generate-release-html/SKILL.md` に従ってリリースノート HTML も生成
  - マイナー修正のみでX投稿をスキップする場合は HTML もスキップ
- X投稿ドラフトをクリップボードにコピー

■ すべて変更なしの場合
「更新なし」とだけ報告して終了

■ X投稿ドラフトのルール
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

■ 出力
対象プロダクト、バージョン情報、変更点の日本語要約、X投稿ドラフト（コピペ可能）、ブログ推奨有無
