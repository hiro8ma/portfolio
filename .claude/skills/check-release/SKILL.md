---
name: check-release
description: Claude Code / Codex の最新リリースと公式ブログをチェックし、X投稿用ドラフトを作成する
disable-model-invocation: true
user-invocable: true
allowed-tools: Bash, Read, Write, Edit, WebSearch, WebFetch, Glob, Grep
---

Claude Code / Codex の最新バージョンと公式ブログをチェックして、新しいリリースがあればX投稿用ドラフトを作成してください。

作業前に、このプロジェクトの `.claude/RELEASE_NOTES_GUIDE.md` を必ず参照してください。

■ チェック1: Claude Code CLI バージョン
1. `brew info claude-code --json=v2 | jq -r '.[0].version'` で最新バージョンを確認
2. `~/.claude-code-version` と比較。同じなら次へ
3. 新バージョンの場合:
   - `curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md` で CHANGELOG を取得・分析
   - リリース内容に応じてX投稿ドラフトを作成
   - ブログを書く価値があるかも判断
   - バージョンを `~/.claude-code-version` に保存

■ チェック2: Claude Code 公式ブログ
4. `https://claude.com/blog-category/claude-code` の最新記事を確認
5. `~/.claude-blog-last-check` と比較。同じなら次へ
6. 新しい記事がある場合:
   - 記事の内容を取得して分析
   - X投稿ドラフトを作成
   - 記事タイトルを `~/.claude-blog-last-check` に保存

■ チェック3: Codex CLI バージョン
7. `brew info codex | sed -n 's/^==> codex: //p' | head -1` で最新バージョンを確認
8. `~/.codex-version` と比較。同じなら次へ
9. 新バージョンの場合:
   - `https://developers.openai.com/codex/changelog` を取得・分析
   - X投稿ドラフトを作成
   - バージョンを `~/.codex-version` に保存

■ チェック4: Codex 公式ブログ
10. `https://developers.openai.com/blog/topic/codex` の最新記事を確認
11. `~/.codex-blog-last-check` と比較。同じなら次へ
12. 新しい記事がある場合:
    - 記事の内容を取得して分析
    - X投稿ドラフトを作成
    - 記事タイトルを `~/.codex-blog-last-check` に保存

■ すべて変更なしの場合
「変更なし」とだけ報告して終了

■ X投稿ドラフトのスタイル選択（RELEASE_NOTES_GUIDE.md に従う）
- 大きな新機能・新プロダクト → スタイルA: 目玉機能フォーカス + 数値・コスト・公式リンク
- 複数の変更がバランスよくある → スタイルB: 【新機能】【バグ修正】【改善】のカテゴリ別リスト
- バグ修正・改善中心 → スタイルC: 数行の短い要約
- マイナー修正のみ → スキップと報告

出力: 対象プロダクト、バージョン情報、変更点の日本語要約、X投稿ドラフト（コピペ可能）、ブログ推奨有無
文体: 事実ベース、感嘆符控えめ、専門用語は英語のまま、日本語で書く

■ リリースノート HTML 画像の生成
- 新バージョン検出時、X投稿ドラフトに加えて `.claude/skills/generate-release-html/SKILL.md` の仕様に従いリリースノート HTML も生成する
- 保存先: `~/Desktop/release-notes-{バージョン番号}.html`（例: `release-notes-2172.html`）
- マイナー修正のみでX投稿をスキップする場合は HTML もスキップ

■ X投稿の文字数制限
- X は日本語1文字=2カウント、実質140文字程度が上限
- 目玉の新機能・改善だけを厳選し、各項目1行で短くまとめる
- 全変更を網羅しようとしない。バグ修正は重要なもの以外省略可
