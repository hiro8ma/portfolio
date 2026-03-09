#!/bin/bash
# Claude Code アップデート監視スクリプト
# Claude のスケジュールタスクから実行される

VERSION_FILE="$HOME/.claude-code-version"
CHANGELOG_URL="https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md"

# macOS デスクトップ通知を送信
notify_mac() {
    local title="$1"
    local message="$2"

    # macOS の場合のみ実行
    if [[ "$OSTYPE" == "darwin"* ]]; then
        osascript -e "display notification \"$message\" with title \"$title\" sound name \"Glass\""
    fi
}

# 最新バージョンを取得
LATEST_VERSION=$(npm view @anthropic-ai/claude-code version 2>/dev/null)

if [ -z "$LATEST_VERSION" ]; then
    echo "❌ バージョン取得に失敗しました"
    exit 1
fi

# 前回のバージョンを読み込み
PREVIOUS_VERSION=""
if [ -f "$VERSION_FILE" ]; then
    PREVIOUS_VERSION=$(cat "$VERSION_FILE")
fi

# バージョン比較
if [ "$LATEST_VERSION" = "$PREVIOUS_VERSION" ]; then
    echo "✅ 変更なし: v$LATEST_VERSION"
    exit 0
fi

# 新バージョン検出！
echo "🎉 新バージョン検出！"
echo "   前回: v$PREVIOUS_VERSION"
echo "   最新: v$LATEST_VERSION"
echo ""

# Mac デスクトップ通知
notify_mac "Claude Code 🎉" "v${LATEST_VERSION} がリリースされました！"

# CHANGELOG を取得
echo "📋 CHANGELOG の最新セクション:"
echo "---"
curl -s "$CHANGELOG_URL" | head -100
echo "---"
echo ""

# バージョンを保存
echo "$LATEST_VERSION" > "$VERSION_FILE"

# 投稿用ドラフトを生成（ユーザーがコピペできるように）
echo ""
echo "================================================"
echo "📝 X投稿用ドラフト（コピペ用）:"
echo "================================================"
echo ""
echo "Claude Code v${LATEST_VERSION} がリリースされました 🎉"
echo ""
echo "主な更新:"
echo "• [ここにハイライトを記入]"
echo ""
echo "#ClaudeCode #AI #開発"
echo ""
echo "================================================"
