#!/usr/bin/env python3
"""portfolio の記事（mdx）を Zenn の下書き（md）へ変換する。

Zenn は連携した GitHub リポジトリと同期する。
published: false は Zenn 上の下書きであって、GitHub 上では誰でも読める。
連携リポジトリが public だと、private の測定ノートから作った下書きがそのまま公開される。
そこで出力先のリポジトリが public なら書き込まずに止まる。

使い方:
    python to_zenn.py content/posts/<slug>.mdx --zenn-repo <path> [--emoji 📝] [--type tech]

終了コード:
    0  変換した
    1  変換できない（slug の長さ、MDX 固有の記法、public リポジトリなど）
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
MAX_TOPICS = 5


def split_frontmatter(text: str) -> tuple[dict[str, str], str]:
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", text, re.S)
    if not m:
        raise ValueError("frontmatter が無い")
    meta: dict[str, str] = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            meta[key.strip()] = value.strip()
    return meta, m.group(2)


def unquote(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def to_topics(raw: str) -> list[str]:
    """portfolio の tags を Zenn の topics に直す。

    Zenn の topic は英数字だけで扱われるので、ハイフンを落として小文字にする。
    上限の 5 個を超えた分は先頭から残す。portfolio 側で重要なタグを先に書いている前提。
    """
    items = [unquote(t) for t in re.findall(r"\"[^\"]*\"|'[^']*'|[^,\[\]\s]+", raw)]
    topics = []
    for item in items:
        t = re.sub(r"[^a-z0-9]", "", item.lower())
        if t and t not in topics:
            topics.append(t)
    return topics[:MAX_TOPICS]


def to_slug(stem: str) -> str:
    """ファイル名から slug を作る。50 文字を超えたらハイフンの位置で切る。"""
    slug = re.sub(r"[^a-z0-9_-]", "-", stem.lower()).strip("-")
    if len(slug) > 50:
        cut = slug[:50]
        slug = cut[: cut.rfind("-")] if "-" in cut else cut
    return slug


def mdx_only_constructs(body: str) -> list[str]:
    """Zenn で表示できない MDX 固有の記法を拾う。コードブロックの中は除く。"""
    found = []
    in_fence = False
    for lineno, line in enumerate(body.splitlines(), start=1):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if re.match(r"^\s*(import|export)\s", line):
            found.append(f"{lineno}: import / export 文")
        if re.search(r"<[A-Z][A-Za-z0-9]*[\s/>]", line):
            found.append(f"{lineno}: JSX のコンポーネント")
    return found


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


def build(meta: dict[str, str], body: str, emoji: str, kind: str) -> str:
    title = unquote(meta.get("title", ""))
    topics = to_topics(meta.get("tags", ""))
    front = [
        "---",
        f'title: "{title}"',
        f'emoji: "{emoji}"',
        f'type: "{kind}"',
        "topics: [" + ", ".join(f'"{t}"' for t in topics) + "]",
        # 下書きで出す。published_at は一度入れると変えられないので付けない。
        "published: false",
        "---",
        "",
    ]
    return "\n".join(front) + body.lstrip("\n")


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("source", type=Path)
    parser.add_argument("--zenn-repo", type=Path, required=True)
    parser.add_argument("--emoji", default="📝")
    parser.add_argument("--type", dest="kind", choices=("tech", "idea"), default="tech")
    parser.add_argument("--allow-unknown-visibility", action="store_true",
                        help="公開範囲を確かめられないときも書き込む（既定では止まる）")
    args = parser.parse_args(argv[1:])

    if not args.source.exists():
        print(f"記事が無い: {args.source}", file=sys.stderr)
        return 2

    visibility = repo_visibility(args.zenn_repo)
    if visibility == "PUBLIC":
        print("出力先の Zenn リポジトリが public。下書きが GitHub で読めてしまうので書き込まない", file=sys.stderr)
        return 1
    if visibility is None and not args.allow_unknown_visibility:
        print("出力先の公開範囲を確かめられない。gh の認証と origin を確認する", file=sys.stderr)
        return 1

    meta, body = split_frontmatter(args.source.read_text(encoding="utf-8"))
    problems = mdx_only_constructs(body)
    if problems:
        print("Zenn で表示できない MDX の記法がある:", file=sys.stderr)
        for p in problems:
            print(f"  {p}", file=sys.stderr)
        return 1

    slug = to_slug(args.source.stem)
    if not SLUG.match(slug):
        print(f"slug が Zenn の条件（a-z0-9_- で 12〜50 文字）を満たさない: {slug}", file=sys.stderr)
        return 1

    out = args.zenn_repo / "articles" / f"{slug}.md"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(build(meta, body, args.emoji, args.kind), encoding="utf-8")
    print(f"書き出した: {out}（published: false、公開範囲 {visibility or '未確認'}）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
