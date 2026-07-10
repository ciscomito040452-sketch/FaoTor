# Demo Recording Guide

Use this checklist before recording your competition pitch video.

## Before recording

1. Open Settings (gear icon) and tap **Reset demo data** to reload 10 seed reports.
2. Keep language on **Thai** (or EN if your script is in English).
3. Use **sample photos** for predictable demo results — or take a real photo (mock AI shows a warning). Set `DEMO_STRICT_SAMPLES = true` in `lib/mock-data.ts` to lock samples-only while recording.
4. Notice the **Demo · Mock AI** badge in the nav — point it out if judges ask about AI.

## UI motion tips for recording

- Navigate between tabs slowly so the **nav pill slide** and **page fade (enter/exit ~320ms)** are visible.
- On `/report`, the **analysis step animation** (~3s) is intentional — wait for it to finish; success toast appears when result shows.
- On `/dashboard`, tap a KPI card (count-up + bar grow), filter list (popLayout), open report — show **sheet slide** (mobile) or **detail crossfade** (desktop).
- On `/line`, play auto demo — chat bubbles slide up with typing indicator.
- Reset demo data before each take so KPI count-up animations look fresh.

## Recommended recording flow (3-5 min)

| Step | Route | What to show |
|------|-------|----------------|
| 1 | `/` | Problem statement, Reporter vs Officer cards |
| 2 | `/report` | Pick **Sample: severe blockage**, pin location, submit |
| 3 | `/report` | Wait for AI animation, show result and thank-you |
| 4 | `/dashboard` | KPIs update, map pin, open report, change status |
| 5 | `/line` | Play auto demo (Phase 2 teaser) |
| 6 | `/about` | Phase 1 mock vs Phase 2 roadmap |

## Pitch line (from MOCKUP_SCOPE)

> "รอบคัดเลือกเราใช้ Mock-up ที่ UI และ flow ครบ - Phase 2 หลังผ่านรอบจะเชื่อม Gemini + Firestore จริง โดยไม่เปลี่ยนหน้าตาแอป"

## After recording

```bash
npm run build   # must pass before push
git push        # Vercel deploys in ~1-3 min
```

## Verify locally

```bash
npm run dev
node scripts/smoke-check.mjs
```
