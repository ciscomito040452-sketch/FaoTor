# Self-host fonts (local == Vercel)

## Problem
`next/font/google` downloads fonts at build/dev time from `fonts.googleapis.com`.
On this PC that request fails (TLS/network), so Next falls back to system fonts.
Vercel can reach Google Fonts, so deployed UI looks different from localhost.

## Decision
Self-host `IBM Plex Sans Thai` (400/600/700) and `Inter` (400/600) as `.woff2` under `public/fonts/`, then load them with `next/font/local` in `lib/fonts.ts`.

Keep CSS variables:
- `--font-ibm-plex-sans-thai`
- `--font-inter`

so `app/globals.css` does not need changes.

## Success
- No Google Fonts download warnings in `npm run dev`
- Localhost typography matches Vercel for these families
