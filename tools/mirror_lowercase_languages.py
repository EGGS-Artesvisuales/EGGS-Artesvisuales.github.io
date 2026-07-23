#!/usr/bin/env python3
"""Publish language output only under lowercase URL directories.

The source repository intentionally keeps the authoring directories in uppercase
(`ES`, `EN`, `MPD`, `CHN`). Jekyll therefore builds those directories first.
This post-build step moves the generated output into lowercase directories,
removes the generated uppercase copies, and normalizes internal URL references.

No source content is deleted or renamed by this script.
"""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


LANGUAGES = ("ES", "EN", "MPD", "CHN")
TEXT_SUFFIXES = {".html", ".xml", ".txt", ".json", ".css", ".js"}


def publish_lowercase_directory(site: Path, language: str) -> int:
    source = site / language
    target = site / language.lower()

    if not source.exists():
        return 0

    if target.exists():
        shutil.rmtree(target)

    shutil.move(str(source), str(target))
    return sum(1 for item in target.rglob("*") if item.is_file())


def normalize_language_urls(site: Path) -> int:
    replacements = tuple(
        (f"/{language}/", f"/{language.lower()}/") for language in LANGUAGES
    )
    changed_files = 0

    for path in site.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue

        try:
            original = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        normalized = original
        for uppercase, lowercase in replacements:
            normalized = normalized.replace(uppercase, lowercase)

        if normalized != original:
            path.write_text(normalized, encoding="utf-8")
            changed_files += 1

    return changed_files


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", type=Path, default=Path("_site"))
    args = parser.parse_args()
    site = args.site.resolve()

    total_files = 0
    for language in LANGUAGES:
        total_files += publish_lowercase_directory(site, language)

    normalized_files = normalize_language_urls(site)
    print(
        "Directorios lowercase publicados: "
        f"{len(LANGUAGES)}; archivos conservados: {total_files}; "
        f"archivos con URLs normalizadas: {normalized_files}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
