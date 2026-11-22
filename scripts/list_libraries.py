#!/usr/bin/env python3
import json
from pathlib import Path
root=Path(__file__).resolve().parent.parent
data=json.loads((root/"catalog/libraries.json").read_text())
local=root/"catalog/imported.local.json"
imports={i["libraryId"]:len(i["files"]) for i in json.loads(local.read_text())["imports"]} if local.exists() else {}
for lib in data["libraries"]:
    print(f"{lib['id']:<24} {lib['provider']:<17} {imports.get(lib['id'], 0):>4} files  {lib['url']}")
