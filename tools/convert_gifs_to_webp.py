from pathlib import Path
import argparse
import sys


ROOT = Path(__file__).resolve().parents[1]
VENDORED_PILLOW = ROOT / "tools" / "pillow"
if VENDORED_PILLOW.exists():
    sys.path.insert(0, str(VENDORED_PILLOW))

from PIL import Image, ImageSequence


def convert_gif(gif_path: Path, quality: int, overwrite: bool) -> tuple[Path, int, int]:
    output_path = gif_path.with_suffix(".webp")
    if output_path.exists() and output_path.stat().st_size > 0 and not overwrite:
        return output_path, gif_path.stat().st_size, output_path.stat().st_size

    with Image.open(gif_path) as image:
        frames = []
        durations = []
        for frame in ImageSequence.Iterator(image):
            frames.append(frame.convert("RGBA"))
            durations.append(frame.info.get("duration", image.info.get("duration", 100)))

        if not frames:
            raise RuntimeError(f"No frames found in {gif_path}")

        frames[0].save(
            output_path,
            save_all=True,
            append_images=frames[1:],
            duration=durations,
            loop=image.info.get("loop", 0),
            format="WEBP",
            quality=quality,
            method=4,
            allow_mixed=True,
        )

    return output_path, gif_path.stat().st_size, output_path.stat().st_size


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert animated GIF files to animated WebP.")
    parser.add_argument(
        "--root",
        default=str(ROOT / "assets" / "img"),
        help="Folder where GIF files will be searched recursively.",
    )
    parser.add_argument("--quality", type=int, default=78, help="WebP quality, from 1 to 100.")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing non-empty WebP files.")
    args = parser.parse_args()

    image_root = Path(args.root)
    gifs = sorted(image_root.rglob("*.gif"), key=lambda path: path.stat().st_size)
    if not gifs:
        print(f"No GIF files found in {image_root}")
        return 0

    converted = 0
    gif_total = 0
    webp_total = 0

    for gif_path in gifs:
        output_path, old_size, new_size = convert_gif(gif_path, args.quality, args.overwrite)
        converted += 1
        gif_total += old_size
        webp_total += new_size
        print(f"{gif_path.relative_to(image_root)} -> {output_path.name} ({old_size} -> {new_size} bytes)")

    print(f"Processed: {converted}")
    print(f"GIF total: {gif_total} bytes")
    print(f"WebP total: {webp_total} bytes")
    print(f"Saved: {gif_total - webp_total} bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
