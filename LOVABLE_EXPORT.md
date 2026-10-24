# Lovable export — Thumbnail Editor

Snapshot copied from Lovable project `a119b880-2097-4060-91c3-0c7924c92da5` at commit `75698609c5e8578aac33fa3262f0a29b1a0fb1af` on 2026-10-24 (JST) so the code survives cancelling the Lovable subscription.
This repo was NOT created via Lovable's GitHub sync; files were copied one by one through the Lovable API.

- Lovable editor: https://lovable.dev/projects/a119b880-2097-4060-91c3-0c7924c92da5
- Published URL: https://thumbnail.thetinywisdom.com
- Files in Lovable project: 137 (45 binary)

## Binary files not recoverable through the API
- none

## Excluded (large third-party / regenerable data)
- `bun.lockb`

## Lovable-hosted assets (`*.asset.json`) — downloaded copies
The `*.asset.json` files point at Lovable's CDN (`/__l5e/assets-v1/...`), which only works on Lovable hosting.
The real files were downloaded next to each json (same name without `.asset.json`). After leaving Lovable, change imports to use those files directly.
- `src/assets/fonts/Zichtbaar-Bold.otf`
- `src/assets/fonts/Zichtbaar-BoldItalic.otf`
- `src/assets/fonts/Zichtbaar-Italic.otf`
- `src/assets/fonts/Zichtbaar-Regular.otf`

## Things that do NOT move with this code
- **Supabase (Lovable Cloud) database, auth users, storage, edge functions deployment and secrets** live in Lovable's Supabase project. Export data/schema before cancelling, or create your own Supabase project and run the migrations.
- **Secrets / env vars** (names only; values are not in this repo except the public publishable keys in `.env`): see list below.
- **Hosting**: `*.lovable.app` / custom domain hosting stops; redeploy (e.g. Vercel/Netlify/Cloudflare) and repoint DNS.
- `@lovable.dev/*` npm packages are public on npmjs and keep working; `bun.lock` may reference Lovable's private npm cache — delete it and reinstall if install fails.
## Project-specific notes

- **Stack:** Vite + React SPA (shadcn/ui, Tailwind), vitest. App title "Blog Thumbnail Editor". Purely client-side: thumbnails rendered in-browser (`src/lib/thumbnail-export.ts`), icons loaded via `import.meta.glob('./*.svg', { query: '?raw' })` from `src/assets/thumbnail-icons/`.
- **Supabase:** a Lovable Cloud Supabase client is generated (`src/integrations/supabase/`), but the app does not use it — no tables, no edge functions, no migrations. Nothing to migrate DB-wise; the integration folder and `@supabase/supabase-js` can be removed.
- **Lovable-specific dependency:** dev-only `lovable-tagger` plugin in vite.config.ts (safe to remove).
- **Fonts:** 4 Zichtbaar .otf fonts were stored on Lovable's CDN (`*.otf.asset.json` pointers); the actual font files were downloaded and committed next to the pointers. Update imports to reference the .otf files directly once off Lovable.
- **Env names (values not copied):** client `.env`: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_SUPABASE_PROJECT_ID (unused).
- **Published at:** https://thumbnail.thetinywisdom.com (custom domain on Lovable hosting) — easiest to move to any static host (Vercel/Netlify/Cloudflare Pages).
