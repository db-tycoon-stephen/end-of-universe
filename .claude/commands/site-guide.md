# The Startup at the End of the Universe — Site Guide

You are helping the owner of thestartupattheendoftheuniverse.com understand how to write, edit, and maintain their blog. Answer their question using the information below.

---

## Architecture Overview

- **`site/`** — Astro static site deployed to GitHub Pages at thestartupattheendoftheuniverse.com
- **`.github/workflows/`** — GitHub Actions: deploy on merge to main

---

## Writing a Post

1. Create a Markdown file in `site/src/content/blog/` with naming convention: `YYYY-MM-DD-slug.md`
2. Include this YAML frontmatter:

```yaml
---
title: "Your Post Title"
date: YYYY-MM-DD
tags: ["tag1", "tag2"]
description: "One-sentence description for the post card and SEO."
audio: "/audio/YYYY-MM-DD-slug.mp3"  # optional — adds audio player + podcast feed
---
```

3. Write Markdown body content below the frontmatter
4. For images, place PNGs in `site/public/charts/YYYY-MM-DD/` and reference as `/charts/YYYY-MM-DD/filename.png`
5. Image captions: put italic text on the line after the image (`*Caption text*`)
6. Tables use standard Markdown table syntax
7. For audio: record MP3, save to `site/public/audio/`, add `audio` field to frontmatter

---

## Editing an Existing Post

- Posts live in `site/src/content/blog/` as `.md` files
- Edit the frontmatter to update metadata (title, tags, description)
- Edit the body content below the `---` frontmatter separator

---

## Audio & Podcast Workflow

### Recording
Record via QuickTime Player (File > New Audio Recording) or Voice Memos. Save raw file anywhere accessible.

### Processing (ffmpeg)
```bash
ffmpeg -i /path/to/raw.m4a \
  -af "silenceremove=start_periods=1:start_silence=0.3:start_threshold=-35dB:stop_periods=-1:stop_silence=0.8:stop_threshold=-35dB,loudnorm=I=-19:TP=-3:LRA=11,atempo=1.2" \
  -codec:a libmp3lame -qscale:a 2 -ar 44100 \
  site/public/audio/SLUG.mp3 -y
```
Trims silence, normalizes to podcast levels (-19 LUFS), speeds up 1.2x.

### Scroll Sync (pywhispercpp — local, no API keys)
```bash
uv run python site/scripts/align-audio.py \
  site/src/content/blog/SLUG.md \
  site/public/audio/SLUG.mp3 \
  site/public/audio/sync/SLUG.json
```
Uses word-count proportional distribution refined with Whisper segment boundaries via whisper.cpp (Metal GPU on Apple Silicon). Automatically skips images, captions, headers, and metadata — only aligns spoken paragraphs. The `base` model (147MB) is cached after first download.

### What It Produces
- **Audio player** with SYNC toggle on the post page
- **Current paragraph highlights** with accent border as audio plays
- **Page auto-scrolls** to follow narration
- **Past paragraphs dim** for reading focus
- **Podcast feed** at `/podcast.xml` — only posts with `audio` field appear

### Key Files
| What | Where |
|------|-------|
| Audio files | `site/public/audio/*.mp3` |
| Sync JSON files | `site/public/audio/sync/*.json` |
| Alignment script | `site/scripts/align-audio.py` |
| AudioPlayer component | `site/src/components/AudioPlayer.astro` |
| Podcast feed | `site/src/pages/podcast.xml.ts` |
| Recording script | `site/scripts/record-post.sh` |

---

## Previewing the Site Locally

```bash
cd site && npm run dev
```

Opens at http://localhost:4321. Hot-reloads on file changes.

---

## Building the Site

```bash
cd site && npm run build
```

Output goes to `site/dist/`. Zero JavaScript, pure static HTML/CSS.

---

## Deploying Changes

Push or merge to `main` with changes in `site/**` → deploy workflow triggers automatically.

---

## Customizing the Site

- **CSS**: `site/src/styles/global.css` — midnight blue with starfield, retro accents
- **Header/Footer**: `site/src/components/Header.astro` and `Footer.astro`
- **Post layout**: `site/src/layouts/PostLayout.astro`
- **Homepage**: `site/src/pages/index.astro` — shows latest 10 posts
- **About page**: `site/src/pages/about.astro`
- **SEO**: `site/src/components/SEO.astro` — Open Graph, Twitter Cards, JSON-LD

---

## Key Files Quick Reference

| What | Where |
|------|-------|
| Blog posts | `site/src/content/blog/*.md` |
| Images | `site/public/charts/YYYY-MM-DD/` |
| CSS styling | `site/src/styles/global.css` |
| Post template | `site/src/layouts/PostLayout.astro` |
| Content schema | `site/src/content.config.ts` |
| Audio files | `site/public/audio/` |
| Podcast feed | `site/src/pages/podcast.xml.ts` |
| Audio player | `site/src/components/AudioPlayer.astro` |
| Deploy workflow | `.github/workflows/deploy.yml` |
| Writing guide | `.claude/commands/draft-post.md` |
| Publish guide | `.claude/commands/publish-post.md` |
