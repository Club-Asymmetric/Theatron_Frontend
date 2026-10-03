# THEATRON 2026 — Cinematic Frontend

Next.js 15 App Router frontend for the THEATRON 2026 landing page.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

For a production check:

```bash
npm run build
```

## What changed

- New cinematic THEATRON 2026 homepage.
- Existing header component structure preserved: Theatron logo on the left, Immerse × Resolution centered, navigation on the right, mobile menu retained.
- Existing footer information and Asymmetric branding retained and restyled.
- Countdown is intentionally static for now: `00 DAYS`, `00 HOURS`, `00 MINUTES`.
- Previous-year route source is preserved under `src/app/_archive/2025/` so it is not part of the active Next.js routes.
- Existing public assets remain in `public/`.

## Hero background

`public/theatron-hero.jpg` is a temporary stage-background asset included so the project runs immediately.

Replace that file with the exact woman-on-stage reference image supplied for the final site. Keep the filename `theatron-hero.jpg` so no code changes are required.

## Archived pages

The previous route folders are stored in:

`src/app/_archive/2025/`

They have not been deleted. The underscore-prefixed folder is kept outside Next.js's active route tree.
