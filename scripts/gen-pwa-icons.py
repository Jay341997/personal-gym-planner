#!/usr/bin/env python3
"""Generate minimal solid-color PNGs for PWA (stdlib only). Run: python3 scripts/gen-pwa-icons.py"""
from __future__ import annotations

import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"


def _chunk(chunk_type: bytes, data: bytes) -> bytes:
    crc = zlib.crc32(chunk_type + data) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + chunk_type + data + struct.pack(">I", crc)


def rgba_png(path: Path, width: int, height: int, rgb: tuple[int, int, int]) -> None:
    r, g, b = rgb
    alpha = 255
    row = bytes([r, g, b, alpha]) * width
    raw = bytearray()
    for _ in range(height):
        raw.append(0)
        raw.extend(row)
    compressed = zlib.compress(bytes(raw), 9)
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    sign = b"\x89PNG\r\n\x1a\n"
    data = sign + _chunk(b"IHDR", ihdr) + _chunk(b"IDAT", compressed) + _chunk(b"IEND", b"")
    path.write_bytes(data)


def main() -> None:
    PUBLIC.mkdir(exist_ok=True)
    accent = (0x36, 0xA3, 0xFF)  # theme accent #36a3ff
    rgba_png(PUBLIC / "icon-192.png", 192, 192, accent)
    rgba_png(PUBLIC / "icon-512.png", 512, 512, accent)
    print("Wrote", PUBLIC / "icon-192.png", "and", PUBLIC / "icon-512.png")


if __name__ == "__main__":
    main()
