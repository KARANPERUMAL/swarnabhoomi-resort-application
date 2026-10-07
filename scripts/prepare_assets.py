from __future__ import annotations

import base64
import os
import re
import shutil
from pathlib import Path

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "source"
PUBLIC = ROOT / "frontend" / "public"


IMAGE_MAP = [
    ("images/hero/hero-main.png", "images/hero/hero-main.webp", 1820),
    ("images/resort/resort-night.jpg", "images/resort/resort-night.webp", 1280),
    ("images/resort/arrival-sign.jpeg", "images/resort/arrival-sign.webp", 1280),
    ("images/resort/cottage-veranda.jpeg", "images/resort/cottage-veranda.webp", 1440),
    ("images/resort/evening-cottages.jpg", "images/resort/evening-cottages.webp", 1280),
    ("images/wellness/pool-walkway-night.jpg", "images/wellness/pool-walkway-night.webp", 1280),
    ("images/wellness/pool-night.jpg", "images/wellness/pool-night.webp", 1280),
    ("images/wellness/pool-aerial-hq.png", "images/wellness/aerial-pool.webp", 1600),
    ("images/experiences/garden-lawn.jpg", "images/experiences/garden-lawn.webp", 1280),
    ("images/experiences/veranda-path.jpg", "images/experiences/veranda-path.webp", 1280),
    ("images/experiences/avani-farms-buddha-hq.png", "images/experiences/avani-farms-buddha.webp", 1600),
    ("images/experiences/pool-evenings.png", "images/experiences/pool-evenings.webp", 1440),
    ("images/experiences/food-barbecue.jpg", "images/experiences/food-barbecue.webp", 960),
    ("images/experiences/bonfire-evening.jpg", "images/experiences/bonfire-evening.webp", 960),
    ("images/gallery/buddha-wall.jpg", "images/gallery/buddha-wall.webp", 1280),
    ("images/gallery/art-corner.jpg", "images/gallery/art-corner.webp", 1280),
    ("images/location/hills-sunrise-hq.png", "images/location/hills-sunrise.webp", 1600),
    ("images/location/farm-landscape-hq.png", "images/location/farm-landscape.webp", 1600),
    ("images/resort/resort-night-hq.png", "images/resort/resort-night.webp", 1600),
    ("images/rooms/room-01-cover.jpg", "images/rooms/room-01/cover.webp", 1440),
    ("images/rooms/room-01-bedroom.jpeg", "images/rooms/room-01/bedroom.webp", 1440),
    ("images/rooms/room-02-cover.jpeg", "images/rooms/room-02/cover.webp", 1440),
    ("images/rooms/room-02-media-wall.jpeg", "images/rooms/room-02/media-wall.webp", 1440),
    ("images/resort/cottage-veranda.jpeg", "images/rooms/room-03/cover.webp", 1440),
]


def ensure_parent(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def save_webp(src_name: str, dest_rel: str, max_width: int) -> None:
    src = SOURCE / src_name
    dest = PUBLIC / dest_rel
    ensure_parent(dest)
    with Image.open(src) as image:
        image = image.convert("RGB")
        if image.width > max_width:
            ratio = max_width / image.width
            image = image.resize((max_width, round(image.height * ratio)), Image.LANCZOS)
        image.save(dest, "WEBP", quality=82, method=6)


def make_logo_assets() -> None:
    svg = SOURCE / "logos" / "swarnabhoomi-logo.svg"
    target_svg = PUBLIC / "logos" / "swarnabhoomi-logo.svg"
    ensure_parent(target_svg)
    shutil.copy2(svg, target_svg)

    text = svg.read_text(encoding="utf-8")
    match = re.search(r"base64,([^\"']+)", text)
    if not match:
        return

    logo_png = Image.open(os.BytesIO(base64.b64decode(match.group(1)))) if False else None
    data = base64.b64decode(match.group(1))
    extracted = PUBLIC / "logos" / "swarnabhoomi-logo-original.png"
    extracted.write_bytes(data)

    with Image.open(extracted).convert("RGBA") as logo:
        bg = Image.new("RGBA", logo.size, logo.getpixel((0, 0)))
        diff = ImageChops.difference(logo, bg).convert("L")
        bbox = diff.point(lambda p: 255 if p > 18 else 0).getbbox()
        cropped = logo.crop(bbox) if bbox else logo
        cleaned = []
        for r, g, b, a in cropped.getdata():
            if r > 238 and g > 238 and b > 238:
                cleaned.append((255, 255, 255, 0))
            else:
                cleaned.append((r, g, b, a))
        cropped.putdata(cleaned)
        cropped.save(PUBLIC / "logos" / "swarnabhoomi-logo-transparent.png")
        cropped.save(PUBLIC / "logos" / "swarnabhoomi-logo-transparent.webp", "WEBP", quality=90)


def main() -> None:
    for src, dest, width in IMAGE_MAP:
        save_webp(src, dest, width)

    shutil.copy2(SOURCE / "videos" / "resort-film.mp4", PUBLIC / "videos" / "hero" / "resort-film.mp4")
    make_logo_assets()


if __name__ == "__main__":
    main()
