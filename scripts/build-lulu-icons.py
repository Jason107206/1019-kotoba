#!/usr/bin/env python3
"""Render installed-app icons from assets/app-icon.png. No remote resources."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Image.open(root / "assets" / "app-icon.png").convert("RGBA")
out = root / "dist" / "icons"
bg = (253, 235, 176, 255)

def render(name, size, scale):
    canvas = Image.new("RGBA", (size, size), bg)
    side = max(1, round(size * scale))
    art = source.resize((side, side), Image.Resampling.LANCZOS)
    offset = ((size - side) // 2, (size - side) // 2)
    canvas.paste(art, offset, art)
    canvas.convert("RGB").save(out / name, "PNG", optimize=True)

jobs = [
    ("icon-512.png", 512, 1),
    ("icon-192.png", 192, 1),
    ("apple-touch-icon.png", 180, 1),
    ("favicon-32.png", 32, 1),
    ("favicon-16.png", 16, 1),
    # Feet and ears of the full illustration sit near the canvas edge.
    # 66.2% keeps every non-background pixel inside the maskable safe circle.
    ("maskable-512.png", 512, 0.662),
]
for job in jobs:
    render(*job)
print("Built app icons from assets/app-icon.png")
