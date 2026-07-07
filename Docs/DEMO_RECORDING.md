# Demo Recording Guide

Use this checklist before recording your competition pitch video.

## Before recording

1. Open Settings (gear icon) and tap **Reset demo data** to reload 10 seed reports.
2. Keep language on **Thai** (or EN if your script is in English).
3. Use **sample photos only** (do not upload camera photos) to avoid unpredictable AI results and localStorage limits.

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
