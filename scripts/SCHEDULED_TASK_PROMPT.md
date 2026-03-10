# Claude Code / Codex アップデート監視タスク

## 目的
Claude Code と Codex の新バージョン、ならびに関連する公式発信を検出し、X投稿用のドラフトを作成して通知する。

## 参照ガイド
**必ず `.claude/RELEASE_NOTES_GUIDE.md` を読んでから作業すること。**

## タスク手順

### チェック1: Claude Code CLI バージョン

1. **バージョンチェック**
   ```bash
   brew info claude-code --json=v2 | jq -r '.[0].version'
   ```

2. **前回バージョンと比較**
   - ファイル `~/.claude-code-version` に前回のバージョンを保存
   - 同じならチェック2へ進む

3. **新バージョンの場合**
   - CHANGELOG を取得: `curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md`
   - `.claude/RELEASE_NOTES_GUIDE.md` の「CHANGELOG の読み方」に従って分析
   - 重要度を判断（新機能 > 重大バグ修正 > 改善 > マイナー修正）
   - リリース内容に応じてスタイルA/B/Cを選択してX投稿ドラフトを作成
   - ブログを書く価値があるかも判断
   - バージョンを `~/.claude-code-version` に保存

### チェック2: Claude Code 公式ブログ

1. **最新記事を確認**
   - `https://claude.com/blog-category/claude-code` をフェッチ
   - 最新の記事タイトルとURLを取得

2. **前回チェックと比較**
   - ファイル `~/.claude-blog-last-check` に前回の記事タイトルを保存
   - 同じなら「変更なし」と報告して終了

3. **新しい記事の場合**
   - 記事の内容を取得して要約
   - X投稿ドラフトを作成（スタイルA推奨: 新プロダクト・新機能の紹介）
   - ブログを書く価値があるかも判断
   - 記事タイトルを `~/.claude-blog-last-check` に保存

### チェック3: Codex CLI バージョン

1. **バージョンチェック**
   ```bash
   brew info codex | sed -n 's/^==> codex: //p' | head -1
   ```

2. **前回バージョンと比較**
   - ファイル `~/.codex-version` に前回のバージョンを保存
   - 同じならチェック4へ進む

3. **新バージョンの場合**
   - CHANGELOG を取得: `curl -s https://developers.openai.com/codex/changelog`
   - 必要に応じて補助情報も確認:
     - `https://developers.openai.com/codex/`
     - `https://developers.openai.com/blog/topic/codex`
   - `.claude/RELEASE_NOTES_GUIDE.md` の「Codex の見方」と「X投稿の書き方」に従って分析
   - 重要度を判断（新機能 > 重大バグ修正 > 改善 > マイナー修正）
   - リリース内容に応じてスタイルA/B/Cを選択してX投稿ドラフトを作成
   - ブログを書く価値があるかも判断
   - マイナー修正のみならスキップしてよい
   - バージョンを `~/.codex-version` に保存

### チェック4: Codex 関連の公式発信

1. **最新記事を確認**
   - `https://developers.openai.com/blog/topic/codex` をフェッチ
   - 最新の記事タイトルとURLを取得

2. **前回チェックと比較**
   - ファイル `~/.codex-blog-last-check` に前回の記事タイトルを保存
   - 同じなら「変更なし」と報告して終了

3. **新しい記事の場合**
   - 記事の内容を取得して要約
   - X投稿ドラフトを作成（スタイルA推奨: 新プロダクト・新機能の紹介）
   - ブログを書く価値があるかも判断
   - 記事タイトルを `~/.codex-blog-last-check` に保存

### ドラフト形式

`.claude/RELEASE_NOTES_GUIDE.md` のスタイルA/B/Cから選択:
- **スタイルA（目玉機能フォーカス）**: 大きな新機能・新プロダクトがあるとき。機能名 + 使い方の具体例
- **スタイルB（カテゴリ別リスト）**: 複数の変更がバランスよくあるとき。【新機能】【バグ修正】【改善】で分類
- **スタイルC（短い要約）**: バグ修正・改善が中心のとき。数行で要約

### 判断も含める
- ブログを書く価値があるか
- X投稿だけで十分か
- スキップしてよいか

## 出力
- 変更がある場合：
  1. 対象プロダクト（Claude Code / Codex）
  2. 検出ソース（CHANGELOG / ブログ）
  3. バージョン情報または記事タイトル
  4. 主要な変更点（日本語要約）
  5. X投稿用ドラフト（コピペ可能な形式で）
  6. ブログ執筆の推奨有無
- 変更がない場合：簡潔に報告
