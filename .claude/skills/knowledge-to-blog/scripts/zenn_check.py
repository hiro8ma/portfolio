#!/usr/bin/env python3
"""Zenn の下書きを置く前の検査。

2 つを確かめる。

    リポジトリ  連携リポジトリが private か。public だと published: false の下書きも GitHub で読める
    記事        frontmatter が Zenn の条件を満たし、published: false になっているか

使い方:
    python zenn_check.py --repo <zenn リポジトリ>
    python zenn_check.py --repo <zenn リポジトリ> <zenn リポジトリ>/articles/<slug>.md [...]

終了コード:
    0  問題なし
    1  問題あり
    2  引数の問題
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

SLUG = re.compile(r"^[a-z0-9_-]{12,50}$")
TOPIC = re.compile(r"^[a-z0-9]+$")
MAX_TOPICS = 5


def repo_visibility(repo: Path) -> str | None:
    """origin のリポジトリの公開範囲を返す。取れなければ None。"""
    try:
        url = subprocess.run(
            ["git", "-C", str(repo), "remote", "get-url", "origin"],
            capture_output=True, text=True, check=True,
        ).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    m = re.search(r"github\.com[:/]([^/]+/[^/.]+)", url)
    if not m:
        return None
    try:
        out = subprocess.run(
            ["gh", "repo", "view", m.group(1), "--json", "visibility"],
            capture_output=True, text=True, check=True,
        ).stdout
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    return json.loads(out).get("visibility")


def check_repo(repo: Path) -> list[str]:
    visibility = repo_visibility(repo)
    if visibility == "PUBLIC":
        return ["連携リポジトリが public。published: false の下書きも GitHub で読めてしまう"]
    if visibility is None:
        return ["連携リポジトリの公開範囲を確かめられない。gh の認証と origin を確認する"]
    return []


def frontmatter(text: str) -> dict[str, str] | None:
    m = re.match(r"^---\n(.*?)\n---", text, re.S)
    if not m:
        return None
    meta = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            meta[key.strip()] = value.strip()
    return meta


def unquote(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def check_article(path: Path) -> list[str]:
    problems = []
    if not SLUG.match(path.stem):
        problems.append(f"slug（ファイル名）が a-z0-9_- で 12〜50 文字になっていない: {path.stem}")
    meta = frontmatter(path.read_text(encoding="utf-8"))
    if meta is None:
        return problems + ["frontmatter が無い"]

    if not unquote(meta.get("title", "")):
        problems.append("title が空")
    emoji = unquote(meta.get("emoji", ""))
    # 絵文字 1 つ。英数字や空白が入っていれば絵文字ではない。
    if not emoji or re.search(r"[A-Za-z0-9\s]", emoji):
        problems.append(f"emoji が絵文字 1 つになっていない: {emoji!r}")
    if unquote(meta.get("type", "")) not in ("tech", "idea"):
        problems.append(f"type が tech / idea のどちらでもない: {meta.get('type')!r}")

    topics = [unquote(t) for t in re.findall(r"\"[^\"]*\"|'[^']*'|[^,\[\]\s]+", meta.get("topics", ""))]
    if not topics:
        problems.append("topics が空")
    if len(topics) > MAX_TOPICS:
        problems.append(f"topics が {len(topics)} 個。上限は {MAX_TOPICS} 個")
    bad = [t for t in topics if not TOPIC.match(t)]
    if bad:
        problems.append(f"topics に英小文字と数字以外が入っている: {bad}")

    if meta.get("published", "").lower() != "false":
        problems.append("published が false ではない。公開はユーザーが Zenn の画面で判断する")
    if "published_at" in meta:
        problems.append("published_at は一度入れると変えられないので付けない")
    return problems


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--repo", type=Path, required=True)
    parser.add_argument("articles", nargs="*", type=Path)
    args = parser.parse_args(argv[1:])

    failed = False
    for problem in check_repo(args.repo):
        print(f"リポジトリ: {problem}")
        failed = True
    for article in args.articles:
        if not article.exists():
            print(f"記事が無い: {article}", file=sys.stderr)
            return 2
        for problem in check_article(article):
            print(f"{article.name}: {problem}")
            failed = True

    if failed:
        return 1
    print(f"問題なし（リポジトリは private、記事 {len(args.articles)} 本）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
