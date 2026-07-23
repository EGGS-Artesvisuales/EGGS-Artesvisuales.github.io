#!/usr/bin/env python3
"""Validate lowercase canonical routes, redirects, links, and web media policy."""

from __future__ import annotations

import argparse
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


LANGUAGES = ("es", "en", "mpd", "chn")
UPPERCASE_LANGUAGES = tuple(language.upper() for language in LANGUAGES)
UPPERCASE_ROUTE = re.compile(r"^/(?:ES|EN|MPD|CHN)(?:/|$)")
TEXT_SUFFIXES = {".html", ".md", ".markdown", ".yml", ".yaml", ".js", ".css", ".json"}
SKIP_PARTS = {".git", "_site", ".jekyll-cache", ".sass-cache", "node_modules", "netlify", "tools/pillow"}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, str]] = []
        self.canonical: str | None = None
        self.has_nav_button = False
        self.has_nav_div = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        classes = set(values.get("class", "").split())
        if "nav-toggle" in classes:
            self.has_nav_button |= tag == "button"
            self.has_nav_div |= tag == "div"
        if tag == "link" and values.get("rel", "").lower() == "canonical":
            self.canonical = values.get("href")
        for attribute in ("href", "src", "action"):
            if values.get(attribute):
                self.references.append((attribute, values[attribute]))


def skipped(path: Path) -> bool:
    normalized = path.as_posix()
    return any(part in path.parts for part in SKIP_PARTS) or "tools/pillow/" in normalized


def source_checks(source: Path) -> list[str]:
    """Validate source assets without enforcing authoring-directory casing.

    Source content intentionally remains in ES, EN, MPD, and CHN. Public URL
    casing is validated only after the post-build normalization step.
    """

    errors: list[str] = []
    for path in source.rglob("*"):
        if not path.is_file() or skipped(path):
            continue
        relative = path.relative_to(source).as_posix()
        if path.suffix.lower() == ".gif":
            errors.append(f"{relative}: GIF fuente no permitido; usar un derivado WebP optimizado")
    return errors


def target_exists(site: Path, page: Path, raw_reference: str) -> bool:
    parsed = urlparse(raw_reference)
    if parsed.scheme or parsed.netloc or raw_reference.startswith(("#", "//")):
        return True
    if parsed.path.startswith("/.netlify/functions/"):
        return True
    if parsed.path in ("", "/"):
        candidate = site / "index.html"
    elif parsed.path.startswith("/"):
        candidate = site / unquote(parsed.path.lstrip("/"))
    else:
        candidate = page.parent / unquote(parsed.path)
    candidates = [candidate]
    if candidate.suffix == "":
        candidates.extend((candidate.with_suffix(".html"), candidate / "index.html"))
    elif candidate.is_dir():
        candidates.append(candidate / "index.html")
    return any(item.is_file() for item in candidates)


def built_checks(site: Path) -> list[str]:
    errors: list[str] = []
    html_files = sorted(site.rglob("*.html"))
    if not html_files:
        return [f"{site}: no contiene un build HTML"]

    for language in UPPERCASE_LANGUAGES:
        if (site / language).exists():
            errors.append(f"{language}/: salida pública duplicada en mayúsculas")

    for page in html_files:
        relative = page.relative_to(site).as_posix()
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8", errors="replace"))
        language = relative.split("/", 1)[0]

        if relative == "index.html":
            if parser.canonical != "https://eggs-studio.cl/":
                errors.append(f"{relative}: canonical raíz ausente o incorrecto")
        elif language in LANGUAGES:
            expected_prefix = f"https://eggs-studio.cl/{language}/"
            if not parser.canonical or not parser.canonical.startswith(expected_prefix):
                errors.append(f"{relative}: canonical no usa /{language}/ en minúsculas")
            if (parser.has_nav_button or parser.has_nav_div) and (not parser.has_nav_button or parser.has_nav_div):
                errors.append(f"{relative}: el control nav-toggle debe ser un button nativo")
        elif language in UPPERCASE_LANGUAGES:
            errors.append(f"{relative}: página publicada bajo prefijo mayúsculo")

        for attribute, reference in parser.references:
            parsed_reference = urlparse(reference)
            if not parsed_reference.scheme and not parsed_reference.netloc and UPPERCASE_ROUTE.match(parsed_reference.path):
                errors.append(f"{relative}: {attribute} usa ruta de idioma en mayúsculas: {reference}")
            if not target_exists(site, page, reference):
                errors.append(f"{relative}: {attribute} interno sin destino: {reference}")

    return errors


def redirect_checks(site: Path) -> list[str]:
    errors: list[str] = []
    redirects_file = site / "_redirects"
    if not redirects_file.is_file():
        return [f"{redirects_file}: falta el archivo de redirecciones generado"]

    redirects: dict[str, str] = {}
    for line_number, line in enumerate(redirects_file.read_text(encoding="utf-8").splitlines(), 1):
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) != 3 or parts[2] != "301!":
            errors.append(f"_redirects:{line_number}: regla inválida")
            continue
        source, target, _status = parts
        redirects[source] = target
        if not target.startswith(tuple(f"/{language}/" for language in LANGUAGES)):
            errors.append(f"_redirects:{line_number}: destino sin prefijo minúsculo: {target}")
        if not target_exists(site, site / "index.html", target):
            errors.append(f"_redirects:{line_number}: destino inexistente: {target}")

    for language in LANGUAGES:
        uppercase = language.upper()
        expected = f"/{language}/index.html"
        required_sources = (
            f"/{uppercase}",
            f"/{uppercase}/",
            f"/{uppercase}/index.html",
        )
        for source in required_sources:
            if redirects.get(source) != expected:
                errors.append(f"_redirects: falta {source} -> {expected}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=Path("."))
    parser.add_argument("--site", type=Path, default=Path("_site"))
    args = parser.parse_args()

    errors = source_checks(args.source.resolve())
    errors.extend(built_checks(args.site.resolve()))
    errors.extend(redirect_checks(args.site.resolve()))
    if errors:
        print("Validación fallida:")
        for error in errors:
            print(f"- {error}")
        return 1

    pages = sum(1 for _ in args.site.rglob("*.html"))
    print(f"Validación correcta: {pages} páginas HTML, rutas minúsculas y enlaces internos resueltos.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
