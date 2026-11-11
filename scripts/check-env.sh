#!/usr/bin/env bash
set -euo pipefail
for bin in node npm python3 ffmpeg; do command -v "$bin" >/dev/null 2>&1 || { echo "Missing dependency: $bin" >&2; exit 1; }; done
node -e "const v=process.versions.node.split('.').map(Number); if(v[0]<22 || (v[0]===22 && v[1]<6)){console.error('Node.js 22.6+ required');process.exit(1)}"
python3 - <<'PY'
import importlib.util, sys
missing=[m for m in ('numpy','PIL') if importlib.util.find_spec(m) is None]
if missing:
 print('Missing Python modules:', ', '.join(missing), file=sys.stderr); sys.exit(1)
print('Python modules: OK')
PY
echo "Environment checks passed."
