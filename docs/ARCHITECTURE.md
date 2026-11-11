# Architecture and implementation milestones

## Product goal
A mobile-friendly, repeatable pipeline that takes an original story and a
user-supplied narration track and produces a vertical cartoon MP4.

## Pipeline
1. Intake: idea/script/audio and target duration.
2. Story: factual verification where needed, script, narration text.
3. Timing: align phrases/words to the audio; derive total frames at 30 fps.
4. Shot planning: frame ranges, environment, characters, camera, action, SFX.
5. Scene rendering: deterministic frame renderer, with reproducible scene state.
6. Review: contact sheet and visual QA before full render.
7. Audio: synthesize music/SFX stems; measure and mix against narration.
8. Export: H.264 MP4 + AAC, then freeze/black-frame/loudness QA.

## Planned modules
- `src/timing/`: duration and phrase/word alignment.
- `src/story/`: shot-plan schema and validation.
- `src/renderer/`: 3D scene, character cards, camera, lighting, frame renderer.
- `src/audio/`: music/SFX generation and measured mix.
- `src/export/`: FFmpeg encode and QA.
- `tests/`: unit tests and short render smoke tests.
- `out/`: generated outputs (git-ignored).

## Milestones
- [ ] M0 — repository and reproducible Codespaces environment.
- [ ] M1 — minimal vertical scene rendered to numbered PNG frames.
- [ ] M2 — shot-plan driven characters, props, camera movement, continuity.
- [ ] M3 — voiceover timing and contact-sheet generation.
- [ ] M4 — music/SFX stems and measured audio mix.
- [ ] M5 — FFmpeg MP4 export and automated QA.
- [ ] M6 — complete 20–30 second sample short.

## Runtime target
Node.js 22.6+, Python 3, FFmpeg, Playwright + Chromium, Python NumPy and
Pillow. Verify actual versions in the Codespace before rendering.

## Engineering constraints
- Keep rendering deterministic: scene state must be a pure function of frame.
- Start with a low-resolution/short smoke test; scale to 1080×1920 only after QA.
- Never run heavy rendering and memory-intensive Python tasks concurrently on
  a small Codespaces machine.
- Keep generated media and caches out of Git.
- Never place API keys, tokens, or private voice files in the repository.
