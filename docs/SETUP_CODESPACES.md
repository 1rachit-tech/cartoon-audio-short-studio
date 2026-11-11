# GitHub Codespaces setup (Android-friendly)

1. Open this repository in Chrome.
2. Select **Code → Codespaces → Create codespace on main**.
3. Start with the default machine size; check billing before choosing a larger
   or paid machine.
4. In the Codespaces terminal, inspect the environment:

```bash
node --version
python3 --version
ffmpeg -version
```

5. The target is Node.js 22.6+, Python 3, and FFmpeg. Install missing
   dependencies only after checking Codespaces usage/cost.
6. Install the Node dependency and browser:

```bash
npm install
npx playwright install chromium
bash scripts/check-env.sh
```

7. Run the five-second prototype:

```bash
npm run render:sample
```

The prototype writes `out/sample.mp4`. Generated frames are stored in
`frames/`; both locations are git-ignored.

## Current prototype limits
- The first renderer is a simple procedural 2D cartoon scene used to validate
  the frame-capture and MP4-export pipeline.
- It does not yet implement the complete 3D toon world, character system,
  voiceover synchronization, generated music/SFX, or full audio mix specified
  in the production skill.
- The original uploaded skill refers to a `kit/` directory that was not
  included. The full renderer is being built in milestones; do not assume that
  the original kit exists.

## Cost and privacy
Codespaces compute/storage can incur charges after included quotas. Check the
billing page before longer renders or larger machines. Do not commit API keys,
tokens, private voiceovers, or generated personal audio.
