#!/usr/bin/env python3
"""Mirror generated uppercase language directories into lowercase paths.

Netlify production currently normalizes some language URLs to lowercase
(`/es/`, `/en/`, `/mpd/`, `/chn/`). The source site keeps language folders in
uppercase for authoring and internal links. This script copies the generated
uppercase output into lowercase siblings so both URL forms serve the same
current build.
"""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


LANGUAGES = ("ES", "EN", "MPD", "CHN")


def mirror_directory(source: Path, target: Path) -> int:
    if not source.exists():
        return 0
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source, target)
    return sum(1 for item in target.rglob("*") if item.is_file())


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", type=Path, default=Path("_site"))
    args = parser.parse_args()
    site = args.site.resolve()

    total_files = 0
    for language in LANGUAGES:
        total_files += mirror_directory(site / language, site / language.lower())

    print(f"Directorios lowercase generados: {len(LANGUAGES)}; archivos copiados: {total_files}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
