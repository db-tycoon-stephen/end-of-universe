# Publish Post

You are helping the owner of thestartupattheendoftheuniverse.com review and publish a blog post. Follow this checklist exactly.

## Step 1: Identify the Post

Check for:
- Draft posts the user has mentioned or is working on
- Open PRs: `gh pr list --repo sciortino/end_of_universe --state open`
- Recently modified files in `site/src/content/blog/`

## Step 2: Review the Post

Read the full post. Check for:
- **Voice consistency**: Should be deadpan, nihilist British satire (see /draft-post for full voice guide)
- **No banned elements**: No exclamation marks, no LinkedIn-speak, no direct sci-fi quotes/catchphrases
- **Length**: 800-1500 words. If over, suggest cuts.
- **Frontmatter**: date, tags, description all present and correct

Report findings to the user.

## Step 3: Audio Recording

Ask the user if they want to record audio for this post. If yes:

### Recording
The user records themselves reading the post aloud:
- **QuickTime Player** > File > New Audio Recording (most reliable on macOS)
- **Voice Memos** on Mac or iPhone
- Save raw file anywhere accessible (e.g. project root)

### Processing (ffmpeg)
Process the raw recording — normalize levels, trim dead air, speed up:

```bash
ffmpeg -i /path/to/raw-recording.m4a \
  -af "silenceremove=start_periods=1:start_silence=0.3:start_threshold=-35dB:stop_periods=-1:stop_silence=0.8:stop_threshold=-35dB,loudnorm=I=-16:TP=-1.5:LRA=11,atempo=1.2" \
  -codec:a libmp3lame -qscale:a 2 -ar 44100 \
  site/public/audio/YYYY-MM-DD-slug.mp3 -y
```

This trims silence, normalizes to -16 LUFS (broadcast standard), and speeds up 1.2x.

### Scroll Sync Alignment (pywhispercpp — local, no API keys)
Generate paragraph timestamps for the scroll-sync audio player:

```bash
python3 site/scripts/align-audio.py \
  site/src/content/blog/YYYY-MM-DD-slug.md \
  site/public/audio/YYYY-MM-DD-slug.mp3 \
  site/public/audio/sync/YYYY-MM-DD-slug.json
```

This runs Whisper locally via whisper.cpp C++ bindings. Uses Metal GPU on Apple Silicon. No PyTorch, no API keys. The `base` model (147MB) is cached after first download.

The sync file enables:
- Current paragraph highlights with accent border as audio plays
- Page auto-scrolls to follow narration
- Past paragraphs dim
- SYNC toggle button for the reader

### Update Frontmatter
```yaml
audio: "/audio/YYYY-MM-DD-slug.mp3"
```

### Commit
Stage the post, MP3, and sync JSON:
```
git add site/public/audio/YYYY-MM-DD-slug.mp3 site/public/audio/sync/YYYY-MM-DD-slug.json site/src/content/blog/YYYY-MM-DD-slug.md
```

## Step 4: Build Verification

```bash
cd site && npm run build
```

Fix any issues before proceeding.

## Step 5: Commit and Deploy

Stage everything, commit, and push. Deploy triggers automatically on push to main.

## Step 6: Verify

Check the deploy succeeded:
```
gh run list --workflow=deploy.yml --repo sciortino/end_of_universe --limit=1
```

---

## Important Rules

- NEVER publish without user confirmation
- Respect the voice — no edits that make it sound earnest, motivational, or like a LinkedIn post
- Always ask about audio before publishing
- Always offer scroll sync alignment when audio is recorded
- Use the `sciortino` GitHub account for repo operations
