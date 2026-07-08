# FaoTor (เฝ้าท่อ)

Community drain reporting web app with AI risk scoring for prioritized maintenance. Built for UTCC AI Hackathon 2026.

**Current mode:** Mock-up Demo v3 — full UI and user flow for pitch video. Uses `mock-analyze.ts` and `localStorage` instead of real Gemini/Firestore.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build (run before push) |
| `npm run lint` | ESLint |
| `npm run smoke` | Smoke test routes + locales (pass URL if not `127.0.0.1:3000`) |
| `npm run verify` | Full local gate: lint + build + start + smoke |

## Routes

| Path | Role |
|------|------|
| `/` | Landing |
| `/report` | Reporter — photo upload + mock AI |
| `/dashboard` | Officer — KPIs, map, queue, status updates |
| `/about` | Vision and Phase 2 roadmap |
| `/line` | LINE bot teaser (animated mock) |

## Docs

- [MOCKUP_SCOPE.md](Docs/MOCKUP_SCOPE.md) — what is in/out of scope now
- [DEMO_RECORDING.md](Docs/DEMO_RECORDING.md) — checklist before recording pitch video
- [AGENT.md](AGENT.md) — rules for AI agents working on this repo
- [FaoTor_SRS.md](Docs/FaoTor_SRS.md) — full requirements

## Phase 2 (after qualifying)

Real Gemini Vision API, Firestore, Firebase Storage, and LINE Bot — see [API_CONTRACT.md](Docs/API_CONTRACT.md). UI should stay the same; swap the mock layer in `lib/`.

## Deploy

Push to GitHub; Vercel auto-deploys. No environment variables required for the mock demo.
