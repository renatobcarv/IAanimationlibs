#!/usr/bin/env python3
"""Import locally downloaded assets into a searchable catalog.

Examples:
  python scripts/import_assets.py --source ~/Downloads/FantasyTownKit.zip --library kenney-town
  python scripts/import_assets.py --source ~/Downloads/Mixamo --library mixamo
  python scripts/import_assets.py --source ~/Downloads/Character.fbx --library mixamo

Assets are intentionally stored in local public/assets (gitignored).
This tool does not bypass logins or copy third-party catalogs.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import re
import shutil
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "catalog" / "libraries.json"
LOCAL = ROOT / "public" / "assets"
MANIFEST = ROOT / "catalog" / "imported.local.json"
SUPPORTED = {".glb", ".gltf", ".fbx", ".obj", ".blend", ".dae", ".stl", ".png", ".jpg", ".jpeg", ".webp", ".bin", ".mtl", ".json", ".wav", ".mp3"}
MODEL_EXTS = {".glb", ".gltf", ".fbx", ".obj", ".blend", ".dae"}
ANIM_EXTS = {".fbx", ".glb", ".gltf"}
def safe_name(s: str) -> str:
    return re.sub(r"[^a-z0-9._-]+", "-", s.lower()).strip("-") or "asset"
def digest(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()
def transfer(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        if digest(source) != digest(target):
            raise ValueError(f"Destination already exists with different content: {target}")
        return
    shutil.copy2(source, target)
def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--source", required=True, type=Path, help="Directory, single file, or ZIP downloaded from the official provider")
    ap.add_argument("--library", required=True, help="Library ID from catalog/libraries.json")
    ap.add_argument("--license-note", default="", help="Optional note about license/attribution")
    args = ap.parse_args()
    libraries = {l["id"]: l for l in json.loads(CATALOG.read_text(encoding="utf8"))["libraries"]}
    if args.library not in libraries:
        ap.error(f"Unknown library ID: {args.library}. Available: {', '.join(libraries)}")
    src = args.source.expanduser().resolve()
    if not src.exists():
        ap.error(f"Source does not exist: {src}")
    dest = LOCAL / safe_name(args.library)
    dest.mkdir(parents=True, exist_ok=True)
    copied = []
    if src.is_file() and src.suffix.lower() == ".zip":
        with zipfile.ZipFile(src) as zf:
            for entry in zf.infolist():
                if entry.is_dir() or entry.filename.startswith("__MACOSX/"):
                    continue
                rel = Path(entry.filename.replace("\\", "/"))
                if rel.is_absolute() or ".." in rel.parts:
                    raise ValueError(f"Unsafe archive path: {entry.filename}")
                if rel.suffix.lower() not in SUPPORTED and rel.name.lower() not in {"license", "license.txt", "readme.txt", "license.md"}:
                    continue
                output = dest.joinpath(*rel.parts)
                output.parent.mkdir(parents=True, exist_ok=True)
                resolved = output.resolve()
                if not resolved.is_relative_to(dest.resolve()):
                    raise ValueError("Unsafe output path")
                # Never overwrite an existing asset silently.
                if resolved.exists():
                    raise ValueError(f"File already exists: {resolved}")
                with zf.open(entry) as reader, resolved.open("wb") as writer:
                    shutil.copyfileobj(reader, writer)
                copied.append(resolved)
    else:
        sources = [p for p in src.rglob("*") if p.is_file()] if src.is_dir() else [src]
        for p in sources:
            if p.suffix.lower() not in SUPPORTED and p.name.lower() not in {"license", "license.txt", "license.md", "readme.txt"}:
                continue
            rel = p.relative_to(src) if src.is_dir() else Path(p.name)
            output = dest / rel
            transfer(p, output)
            copied.append(output)
    entries = []
    for p in copied:
        ext = p.suffix.lower()
        entries.append({"name": p.name, "path": "/" + p.relative_to(ROOT / "public").as_posix(), "type": "model" if ext in MODEL_EXTS else ("animation-or-model" if ext in ANIM_EXTS else "support"), "bytes": p.stat().st_size})
    existing = json.loads(MANIFEST.read_text(encoding="utf8")) if MANIFEST.exists() else {"schemaVersion":1, "imports":[]}
    existing["imports"] = [i for i in existing["imports"] if i["libraryId"] != args.library]
    existing["imports"].append({"libraryId":args.library,"provider":libraries[args.library]["provider"],"sourceUrl":libraries[args.library]["url"],"license":libraries[args.library]["license"],"licenseNote":args.license_note,"importedAt":datetime.now(timezone.utc).isoformat(),"files":entries})
    MANIFEST.parent.mkdir(parents=True,exist_ok=True)
    MANIFEST.write_text(json.dumps(existing,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
    print(f"Imported {len(entries)} files from {args.library} to {dest}")
    print(f"Local manifest: {MANIFEST}")
    print("NOTE: FBX/OBJ/BLEND may require conversion to GLB for browser playback.")
    return 0
if __name__ == "__main__":
    sys.exit(main())
