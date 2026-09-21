#!/usr/bin/env python3
"""記事の下書きから、公開してはいけない文字列を拾う。

文字列で判定できるものだけを扱う。
「社名を消しても業種と時期で特定できる」のような判断は人に残す。

禁止語はこのリポジトリに置かない。public なので、書いた語がそのまま公開される。
既定の置き場は ~/.config/knowledge-to-blog/denylist.txt で、
環境変数 KNOWLEDGE_TO_BLOG_DENYLIST で変更できる。
1 行 1 語、# から後はコメント、大文字小文字は区別しない。

使い方:
    python disclosure_check.py content/posts/<slug>.mdx [...]

終了コード:
    0  問題なし
    1  拾ったものがある
    2  引数や禁止語ファイルの問題
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

DEFAULT_DENYLIST = Path("~/.config/knowledge-to-blog/denylist.txt").expanduser()

# 公開してよい hiro8ma のリポジトリ。これ以外への github.com/hiro8ma/<repo> は拾う。
PUBLIC_REPOS = {"agent", "mcp", "ft", "agentic-coding", "portfolio"}

PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("private リポジトリへの相対パス", re.compile(r"\.\./ai/|(?<![\w/])knowledge/[\w-]+/")),
    ("ローカルパス", re.compile(r"/Users/[^\s)\"']+")),
    ("鍵の形の文字列", re.compile(r"AIza[0-9A-Za-z_-]{20,}|AQ\.[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z]{20,}")),
    ("Notion の URL", re.compile(r"https?://(?:www\.|app\.)?notion\.(?:so|com)/\S+")),
    ("ナレッジの wikilink の書き残し", re.compile(r"\[\[[^\]]+\]\]")),
    ("Issue ID らしき語", re.compile(r"(?<![\w/.-])[A-Z]{1,5}-\d{2,5}(?![\w.])")),
]

GITHUB_REPO = re.compile(r"github\.com/hiro8ma/([\w.-]+)")

# コードブロックの中は Issue ID の誤検知が多い（例: UTF-8, ISO-8601）ので、ID 判定だけ除外する。
FENCE = re.compile(r"^\s*```")


def load_denylist(path: Path) -> list[str]:
    if not path.exists():
        return []
    words = []
    for raw in path.read_text(encoding="utf-8").splitlines():
        word = raw.split("#", 1)[0].strip()
        if word:
            words.append(word)
    return words


def compile_denylist(words: list[str]) -> list[tuple[str, re.Pattern[str]]]:
    """英字の語は単語単位、それ以外は部分一致で探す。

    英字を部分一致にすると relationships の中の ships のような誤検知が出る。
    誤検知が多いと結果を読まなくなるので、判定器として役に立たなくなる。
    日本語には単語境界が無いので部分一致にする。
    """
    compiled = []
    for word in words:
        escaped = re.escape(word)
        if word.isascii():
            pattern = re.compile(rf"(?<![\w-]){escaped}(?![\w-])", re.IGNORECASE)
        else:
            pattern = re.compile(escaped, re.IGNORECASE)
        compiled.append((word, pattern))
    return compiled


def scan(text: str, denylist: list[str]) -> list[tuple[int, str, str]]:
    findings: list[tuple[int, str, str]] = []
    deny_patterns = compile_denylist(denylist)
    in_fence = False
    for lineno, line in enumerate(text.splitlines(), start=1):
        if FENCE.match(line):
            in_fence = not in_fence
        for word, pattern in deny_patterns:
            if pattern.search(line):
                findings.append((lineno, "禁止語", word))
        for label, pattern in PATTERNS:
            if in_fence and label == "Issue ID らしき語":
                continue
            for m in pattern.finditer(line):
                findings.append((lineno, label, m.group(0)))
        for m in GITHUB_REPO.finditer(line):
            repo = m.group(1).removesuffix(".git")
            if repo not in PUBLIC_REPOS:
                findings.append((lineno, "private リポジトリへのリンク", m.group(0)))
    return findings


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__.strip(), file=sys.stderr)
        return 2

    deny_path = Path(os.environ.get("KNOWLEDGE_TO_BLOG_DENYLIST", DEFAULT_DENYLIST)).expanduser()
    denylist = load_denylist(deny_path)
    if not denylist:
        print(
            f"禁止語ファイルが無いか空: {deny_path}\n"
            "顧客名や社名を拾えない状態なので、判定を通さずに止める。",
            file=sys.stderr,
        )
        return 2

    total = 0
    for name in argv[1:]:
        path = Path(name)
        if not path.exists():
            print(f"ファイルが無い: {path}", file=sys.stderr)
            return 2
        findings = scan(path.read_text(encoding="utf-8"), denylist)
        for lineno, label, hit in findings:
            # 禁止語そのものは画面に出さない。端末の記録やログに残るため。
            shown = "(非表示)" if label == "禁止語" else hit
            print(f"{path}:{lineno}: {label}: {shown}")
        total += len(findings)

    if total:
        print(f"\n{total} 件。直してから再実行する。", file=sys.stderr)
        return 1
    print(f"問題なし（禁止語 {len(denylist)} 語、パターン {len(PATTERNS) + 1} 種で確認）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
