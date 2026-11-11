# GitHub Codespaces setup (Android-friendly)

1. Open the repository in Chrome.
2. Use the repository's **Code → Codespaces → Create codespace on main** flow.
3. Start with the default machine size; do not select a larger paid machine
   unless you have checked the billing implications.
4. In the Codespaces terminal, inspect the environment:

```bash
node --version
python3 --version
ffmpeg -version
```

5. The target is Node 22.6+, Python 3, and FFmpeg. Install only missing
   dependencies after checking the Codespaces usage/cost page.
6. Open the repository root and confirm the skill exists at:

```text
.agents/skills/cartoon-audio-short/SKILL.md
```

## Important
The original uploaded skill refers to a `kit/` folder that was not included.
This repository currently contains the skill instructions and project planning
docs, not a complete animation renderer. Do not run a presumed setup script
until the kit/engine has actually been added and inspected.

Generated renders should go into `out/` and must not be committed.
