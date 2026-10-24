# Blog Thumbnail Generator

A new tool, accessible at `/thumbnail`, that produces 1200×675 blog thumbnails matching the uploaded examples (Tiny Wisdom brand: cream background `#EFEEEA`, black headline, orange accent icon, faded logo top-center).

## Layout (matches your 3 examples)

```
+-------------------------------------------+
|                                           |
|             [Tiny Wisdom logo]            |  ← faded, top-center
|                                           |
|                                           |
|        Headline text (bold, black,        |  ← center, DM Sans Bold-ish
|         centered, 1–2 lines)              |
|                                           |
|                                           |
|                 [icon]                    |  ← orange, centered below
|                                           |
+-------------------------------------------+
```

Canvas: 1200×675. Background `#EFEEEA`. Icons colored `#ed612b`. Logo at ~20% opacity, top-center.

## Features (only what you asked for)

1. **Create thumbnail** — live preview on the page, rendered at 1200×675 (scaled to fit screen).
2. **Edit the text** — single textarea; line breaks respected; auto font-size step-down if the text gets long.
3. **Select the icon** — grid of all 26 icons from your zip (Writing, Clock, Book, Heart hand, Compass, Run, Flower, Thumb, etc.). Click to select; selected icon shows in preview.
4. **Export** — two buttons: "Download PNG" and "Download JPG". Filename derived from the headline (e.g. `the-illusion-of-productivity.png`).

## Pages & files

- `src/pages/Thumbnail.tsx` — main tool page (text input, icon picker grid, live preview, export buttons).
- `src/components/thumbnail/ThumbnailCanvas.tsx` — the rendered preview (HTML/CSS at 1200×675, scaled via CSS transform).
- `src/components/thumbnail/IconPicker.tsx` — clickable grid of icons.
- `src/lib/thumbnail-export.ts` — renders the preview to PNG/JPG using `html-to-image` (lightweight, works with inline SVGs).
- `src/assets/thumbnail-icons/` — the 26 SVG icons from your zip, plus an `index.ts` that exports them as `?react` components so we can recolor via `currentColor`.
- `src/assets/tiny-wisdom-logo.svg` — your uploaded Logotype.svg.
- Route added in `src/App.tsx`: `/thumbnail` → `Thumbnail`.
- A small link from the home page (`Index.tsx`) to `/thumbnail` so it's discoverable.

## Technical details

- Each SVG icon will be cleaned so its strokes/fills inherit `currentColor`; the wrapper applies `color: #ed612b`. (Your SVGs use hardcoded orange already — we'll swap to `currentColor` so the orange comes from one place.)
- Export uses `html-to-image` (`toPng`, `toJpeg`) at `pixelRatio: 1` against the unscaled 1200×675 node (rendered off-screen or temporarily un-transformed) so output is exactly 1200×675.
- Font: DM Sans Bold (already loaded per brand memory) for the headline.
- No backend, no database — purely client-side.

## Out of scope (per your spec)

- No saving/history, no auth, no custom icon upload, no color/layout customization, no background swap.

