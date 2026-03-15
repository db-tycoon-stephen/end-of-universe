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
---
```

3. Write Markdown body content below the frontmatter
4. For images, place PNGs in `site/public/charts/YYYY-MM-DD/` and reference as `/charts/YYYY-MM-DD/filename.png`
5. Image captions: put italic text on the line after the image (`*Caption text*`)
6. Tables use standard Markdown table syntax

---

## Editing an Existing Post

- Posts live in `site/src/content/blog/` as `.md` files
- Edit the frontmatter to update metadata (title, tags, description)
- Edit the body content below the `---` frontmatter separator

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
| Deploy workflow | `.github/workflows/deploy.yml` |
| Writing guide | `.claude/commands/draft-post.md` |
