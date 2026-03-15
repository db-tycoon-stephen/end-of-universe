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
1. Determine the filename: `YYYY-MM-DD-slug.mp3` (matching the post filename)
2. Open QuickTime Player for recording (or remind them to use Voice Memos)
3. Once recorded, the MP3 should be saved to `site/public/audio/YYYY-MM-DD-slug.mp3`
4. Add `audio: "/audio/YYYY-MM-DD-slug.mp3"` to the post frontmatter
5. Verify the audio file exists at the expected path

## Step 4: Build Verification

```bash
cd site && npm run build
```

Fix any issues before proceeding.

## Step 5: Commit and Deploy

Stage the post and audio file (if any), commit, and push:
- Post: `site/src/content/blog/YYYY-MM-DD-slug.md`
- Audio: `site/public/audio/YYYY-MM-DD-slug.mp3` (if recorded)

Deploy triggers automatically on push to main.

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
- Use the `sciortino` GitHub account for repo operations
