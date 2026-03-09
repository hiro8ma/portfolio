# Claude Code アップデート監視タスク

## 目的
Claude Code の新バージョンがリリースされたら、X投稿用のドラフトを作成して通知する。

## 参照ガイド
**必ず `.claude/RELEASE_NOTES_GUIDE.md` を読んでから作業すること。**

## タスク手順

1. **バージョンチェック**
   ```bash
   npm view @anthropic-ai/claude-code version
   ```

2. **前回バージョンと比較**
   - ファイル `~/.claude-code-version` に前回のバージョンを保存
   - 同じなら「変更なし」と報告して終了

3. **新バージョンの場合**
   - CHANGELOG を取得: `curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md`
   - `.claude/RELEASE_NOTES_GUIDE.md` の「CHANGELOG の読み方」に従って分析
   - 重要度を判断（新機能 > 重大バグ修正 > 改善 > マイナー修正）
   - X投稿用ドラフトを作成

4. **ドラフト形式**（ガイドに従う）
   ```
   Claude Code v{version} がリリース {適切な絵文字}

   {目玉機能を1行で}

   主な変更:
   • {重要な変更1}
   • {重要な変更2}
   • {重要な変更3}

   #ClaudeCode #AI
   ```

5. **判断も含める**
   - ブログを書く価値があるか
   - X投稿だけで十分か
   - スキップしてよいか

## 出力
- 変更がある場合：
  1. バージョン情報
  2. 主要な変更点（日本語要約）
  3. X投稿用ドラフト（コピペ可能な形式で）
  4. ブログ執筆の推奨有無
- 変更がない場合：簡潔に報告
