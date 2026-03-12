---
name: write-blog
description: AI関連の最新ニュースからブログ記事を作成してmainにプッシュする
disable-model-invocation: true
user-invocable: true
argument-hint: "[トピックやURL（省略可）]"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch
---

AI関連の最新ニュース・海外記事を1つ選び、ブログ記事を作成してmainにプッシュしてください。

$ARGUMENTS が指定されている場合はそのトピックまたはURLを元に記事を書いてください。

作業前に、このプロジェクトの `.claude/BLOG_WRITING_GUIDE.md` と既存の記事（content/posts/）を数件読み、文体・構成を合わせてください。

■ ネタ探し
1. Web検索で直近1〜2日のAI関連ニュースを探す
   - 対象: AI新機能、モデルアップデート、AI業界の動向、雇用・ホワイトカラーへの影響、市場・投資
   - 海外記事を優先（日本語化 + 日本への影響の考察が付加価値になる）
2. Xで短く投稿するには収まらない、深掘りする価値のあるネタを1つ選ぶ
3. 過去記事（content/posts/）と重複しないか確認

■ 記事作成
1. content/posts/{slug}.mdx を作成
2. フロントマター:
   ---
   title: "メインタイトル — サブタイトル"
   date: "{今日の日付 YYYY-MM-DD}"
   description: "1〜2文の要約"
   tags: ["関連タグ"]
   ---
3. 構成（BLOG_WRITING_GUIDE.md に従う）:
   - 概要（何が起きたか。日付・企業名・数字で始める）
   - 詳細（テーブルで整理、コード例があれば含む）
   - 日本への示唆（日本市場・日本のエンジニアにとっての影響を具体的に）
   - まとめ（箇条書きまたは短い段落でキーテイクアウェイ）
   - 参考リンク（ソースURLを末尾にまとめる。本文中にインラインリンクを散らさない）
4. 文体:
   - 断定調（「〜と思います」は避ける）
   - 短い段落（1〜3文）
   - テーブル3〜5個。比較・データ整理・Before/Afterで活用
   - 日本語70% / 英語30%。専門用語・企業名・プロダクト名は英語のまま
   - コードブロックは言語指定付き
   - 引用（> ）は経営者・研究者の直接発言のみ。出典明記

■ 投稿
1. git add content/posts/{slug}.mdx
2. git commit（コミットメッセージに Co-Authored-By をつけない）
3. git push origin main（GitHub Actionsが自動デプロイ）

■ 注意
- 1日1記事まで
- コミットメッセージに 🤖 Generated with Claude Code のフッターをつけない
