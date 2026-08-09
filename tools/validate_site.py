#!/usr/bin/env python3
"""Validate lowercase canonical routes, redirects, links, and web media policy."""

from __future__ import annotations

import argparse
from collections import Counter
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


LANGUAGES = ("es", "en", "mpd", "chn")
UPPERCASE_LANGUAGES = tuple(language.upper() for language in LANGUAGES)
UPPERCASE_ROUTE = re.compile(r"^/(?:ES|EN|MPD|CHN)(?:/|$)")
TEXT_SUFFIXES = {".html", ".md", ".markdown", ".yml", ".yaml", ".js", ".css", ".json"}
SKIP_PARTS = {".git", "_site", ".jekyll-cache", ".sass-cache", "node_modules", "netlify", "tools/pillow"}
SITE_ORIGIN = "https://eggs-studio.cl"
EXPECTED_DOCUMENT_LANG = {
    "es": "es",
    "en": "en",
    "mpd": "arn",
    "chn": "zh-Hans",
}
SELF_HREFLANG = {
    "es": "es-CL",
    "en": "en",
    "mpd": "arn-CL",
    "chn": "zh-Hans",
}
REQUIRED_HREFLANGS = frozenset((*SELF_HREFLANG.values(), "x-default"))


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, str]] = []
        self.canonical: str | None = None
        self.has_nav_button = False
        self.has_nav_div = False
        self.alternates: dict[str, list[str]] = {}
        self.document_lang = ""
        self.robots = ""
        self.h1_count = 0
        self.has_main_content = False
        self.has_skip_link = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        classes = set(values.get("class", "").split())
        rel_values = set(values.get("rel", "").lower().split())
        if tag == "html":
            self.document_lang = values.get("lang", "")
        if tag == "meta" and values.get("name", "").lower() == "robots":
            self.robots = values.get("content", "")
        if tag == "h1":
            self.h1_count += 1
        if tag == "main" and values.get("id") == "main-content":
            self.has_main_content = True
        if tag == "a" and "skip-link" in classes and values.get("href") == "#main-content":
            self.has_skip_link = True
        if "nav-toggle" in classes:
            self.has_nav_button |= tag == "button"
            self.has_nav_div |= tag == "div"
        if tag == "link" and "canonical" in rel_values:
            self.canonical = values.get("href")
        if tag == "link" and "alternate" in rel_values:
            hreflang = values.get("hreflang")
            href = values.get("href")
            if hreflang and href:
                self.alternates.setdefault(hreflang, []).append(href)
        for attribute in ("href", "src", "action"):
            if values.get(attribute):
                self.references.append((attribute, values[attribute]))


def skipped(path: Path) -> bool:
    normalized = path.as_posix()
    return any(part in path.parts for part in SKIP_PARTS) or "tools/pillow/" in normalized


def source_checks(source: Path) -> list[str]:
    """Validate source assets for the canonical lowercase source tree."""

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

    published_directories = {path.name for path in site.iterdir() if path.is_dir()}
    for language in UPPERCASE_LANGUAGES:
        if language in published_directories:
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
            expected_document_lang = EXPECTED_DOCUMENT_LANG[language]
            if parser.document_lang != expected_document_lang:
                errors.append(
                    f"{relative}: lang={parser.document_lang!r}; esperado {expected_document_lang!r}"
                )

            if parser.has_main_content:
                if parser.h1_count != 1:
                    errors.append(f"{relative}: debe contener exactamente un h1; encontrados {parser.h1_count}")
                if not parser.has_skip_link:
                    errors.append(f"{relative}: falta enlace .skip-link hacia #main-content")

                indexable = "noindex" not in parser.robots.lower()
                if indexable:
                    missing_hreflangs = sorted(REQUIRED_HREFLANGS - parser.alternates.keys())
                    if missing_hreflangs:
                        errors.append(
                            f"{relative}: hreflang incompleto; faltan {', '.join(missing_hreflangs)}"
                        )

                    self_code = SELF_HREFLANG[language]
                    self_links = parser.alternates.get(self_code, [])
                    if parser.canonical not in self_links:
                        errors.append(
                            f"{relative}: hreflang {self_code} no autorreferencia el canonical"
                        )

                    spanish_links = parser.alternates.get("es-CL", [])
                    default_links = parser.alternates.get("x-default", [])
                    if spanish_links and default_links and default_links[0] != spanish_links[0]:
                        errors.append(
                            f"{relative}: x-default debe apuntar a la versión es-CL"
                        )

            for hreflang, hrefs in parser.alternates.items():
                if len(hrefs) != len(set(hrefs)):
                    errors.append(f"{relative}: hreflang {hreflang} está duplicado")
        elif language in UPPERCASE_LANGUAGES:
            errors.append(f"{relative}: página publicada bajo prefijo mayúsculo")

        for attribute, reference in parser.references:
            parsed_reference = urlparse(reference)
            if not parsed_reference.scheme and not parsed_reference.netloc and UPPERCASE_ROUTE.match(parsed_reference.path):
                errors.append(f"{relative}: {attribute} usa ruta de idioma en mayúsculas: {reference}")
            if not target_exists(site, page, reference):
                errors.append(f"{relative}: {attribute} interno sin destino: {reference}")

    return errors


def sitemap_checks(site: Path) -> list[str]:
    errors: list[str] = []
    sitemap_file = site / "sitemap.xml"
    if not sitemap_file.is_file():
        return [f"{sitemap_file}: falta el sitemap generado"]

    try:
        tree = ET.parse(sitemap_file)
    except ET.ParseError as error:
        return [f"{sitemap_file}: XML inválido: {error}"]

    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [
        node.text.strip()
        for node in tree.findall("s:url/s:loc", namespace)
        if node.text and node.text.strip()
    ]
    counts = Counter(locs)
    for loc, count in counts.items():
        if count > 1:
            errors.append(f"sitemap.xml: URL duplicada {count} veces: {loc}")

    canonical_robots: dict[str, str] = {}
    for page in sorted(site.rglob("*.html")):
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8", errors="replace"))
        if not parser.canonical:
            continue
        if parser.canonical in canonical_robots:
            errors.append(f"sitemap.xml: canonical duplicado en el build: {parser.canonical}")
        canonical_robots[parser.canonical] = parser.robots.lower()

    for loc in locs:
        if not loc.startswith(f"{SITE_ORIGIN}/"):
            errors.append(f"sitemap.xml: URL fuera del origen canónico: {loc}")
            continue
        if loc not in canonical_robots:
            errors.append(f"sitemap.xml: URL no coincide con ningún canonical publicado: {loc}")
        elif "noindex" in canonical_robots[loc]:
            errors.append(f"sitemap.xml: incluye una página noindex: {loc}")

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
        if source.rstrip("/") == target.rstrip("/"):
            errors.append(
                f"_redirects:{line_number}: redirección circular equivalente: "
                f"{source} -> {target}"
            )
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
    errors.extend(sitemap_checks(args.site.resolve()))
    errors.extend(redirect_checks(args.site.resolve()))
    if errors:
        print("Validación fallida:")
        for error in errors:
            print(f"- {error}")
        return 1

    pages = sum(1 for _ in args.site.rglob("*.html"))
    print(f"Validación correcta: {pages} páginas HTML, rutas, idiomas, hreflang, sitemap y enlaces resueltos.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
