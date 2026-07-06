# FaoTor UI Redesign — Design Spec

**Date:** 2026-07-06  
**Status:** Proposed  
**Scope:** Full frontend mock-up overhaul (no backend change)

---

## Problem Statement

The current demo implements the bare minimum flow (3 pages, 3 seed items, basic forms). It reads as ~10% of `UI_UX_SPEC.md` — functional skeleton, not a presentation-ready product. For a hackathon video, it fails the "wow" test: no brand presence, no narrative, no depth.

### Gap Analysis (Current vs Spec)

| Area | Spec requires | Current state |
|------|---------------|---------------|
| Landing | Brand story, clear roles | 2 buttons only |
| Report flow | Step UX, result card with badge + reason | Basic form, tiny result |
| Dashboard | Stat cards, sorted list, detail sheet | 3 items, flat list |
| Risk display | Big Number score + Pill badge + Shield icon | Badge only, no score |
| Navigation | App shell across pages | Isolated pages |
| Settings | Sheet with language/theme | Missing |
| Seed data | Enough to feel "live" | 3 generic Unsplash images |
| Visual identity | Logo gradient (blue wave + shield) | Flat gray background |

---

## Goals

1. **Video-ready:** Looks like a real product in screen recording, not a homework template.
2. **Spec-compliant:** Follow `Docs/UI_UX_SPEC.md` colors, typography, spacing, components.
3. **Still mock:** No Firebase/Gemini — localStorage + `mock-analyze.ts` unchanged in backend layer.
4. **Deliver in one session:** Achievable redesign without scope creep into Phase 2 (real map, real API).

---

## Recommended Approach: "Premium Demo Shell"

Keep mock backend. Rebuild all visible UI as a cohesive app with:

- Hero landing page with logo gradient, value props, live stats teaser
- Shared app shell (header + mobile bottom nav)
- Multi-step report wizard with animated AI analysis steps
- Rich dashboard (10 seed reports, filter tabs, risk score in list)
- Polished detail sheet with big score, status workflow, image hero
- Settings bottom sheet (Thai/EN toggle, theme toggle — UI only)
- Static map preview card on dashboard (Phase 2 teaser, not interactive map)

---

## Screen Designs

### 1. Landing `/`

**Layout:** Full-height hero with subtle blue gradient background (from logo `#2F6FED` → `#EAF2FE`).

**Sections:**
1. **Hero** — Logo 120px, title "เฝ้าท่อ", subtitle explaining community + AI + officer workflow
2. **Live stats row** — 3 mini stat pills pulled from localStorage (e.g. "12 จุดเสี่ยง", "34 รอดำเนินการ") — updates when user adds reports
3. **Role cards** — Two large tappable cards (not plain buttons):
   - "รายงานท่อ" — icon + description for Reporter
   - "แดชบอร์ดเจ้าหน้าที่" — icon + description for Officer
4. **How it works** — 3 steps with numbers: ถ่ายรูป → AI วิเคราะห์ → เจ้าหน้าที่ลอกท่อ
5. **Footer note** — Small caption "เวอร์ชัน Demo — ข้อมูลจำลองสำหรับนำเสนอ"

### 2. Report `/report`

**App shell:** Header with back link, settings gear.

**Step indicator:** Horizontal 3-step bar (1. ถ่ายรูป → 2. วิเคราะห์ → 3. ผลลัพธ์).

**Step 1 — Form:**
- Photo upload zone with camera icon SVG, dashed border 200px, helper text
- Location input with label above (per spec 4.2)
- Optional GPS hint text (static mock: "หรือใช้ตำแหน่งปัจจุบัน" — button disabled with tooltip)

**Step 2 — Analysis:**
- Full-screen loading card with spinner
- Animated checklist: "ตรวจจับท่อ" → "วิเคราะห์สิ่งกีดขวาง" → "คำนวณความเสี่ยง" (items check off sequentially)
- Progress bar (blue, not chart — simple 0-100% width)

**Step 3 — Result:**
- Large risk score number (Title 1, 28px) e.g. "87"
- RiskBadge pill
- Reason card (Callout text)
- Location recap
- Primary: "ดูในแดชบอร์ด" link
- Secondary: "ส่งรายงานอีกจุด"

### 3. Dashboard `/dashboard`

**Header:** Title + last-updated caption.

**Stat row:** 3 StatCards per spec 4.4 — third card ("อุดตันหนัก") gets subtle red tint background when > 0.

**Filter tabs:** Segmented control — ทั้งหมด | รอดำเนินการ | อุดตันหนัก (client-side filter).

**Map preview card (static):**
- SVG illustration with 4-5 pin dots colored by risk
- Caption: "แผนที่ความเสี่ยง — เร็วๆ นี้ (Phase 2)"
- Not interactive — visual only for pitch narrative

**Report list:** Enhanced rows per spec 4.5:
- Thumbnail 48x48
- Location (Headline) + time (Caption)
- Risk score number right-aligned before badge
- Chevron

**Detail sheet:** Full redesign:
- Hero image full width
- Location + timestamp
- Big risk score + RiskBadge
- AI reason block with left blue border accent
- Status segmented control
- Save button

### 4. Settings Sheet (global)

Triggered from gear icon on all inner pages.

- Language row: ไทย / English (React Context + `lib/locales/th.json`, `en.json`)
- Theme row: Light / Dark toggle (CSS class on `<html>`, per spec 1.4 dark tokens)
- Close button

---

## Component Architecture

```
components/
  layout/
    AppShell.tsx          — wrapper with header + bottom nav
    PageHeader.tsx        — back + title + settings
    BottomNav.tsx         — mobile nav (หน้าแรก / รายงาน / แดชบอร์ด)
  landing/
    HeroSection.tsx
    RoleCard.tsx
    HowItWorks.tsx
    LiveStatsTeaser.tsx
  report/
    StepIndicator.tsx
    PhotoUploadZone.tsx
    AnalysisProgress.tsx  — animated AI steps
    ResultCard.tsx        — score + badge + reason
  dashboard/
    FilterTabs.tsx
    MapPreviewCard.tsx    — static SVG
    ReportRow.tsx         — replaces ReportTable row
  shared/
    RiskBadge.tsx         — keep, refine icon
    RiskScore.tsx         — big number display
    StatCard.tsx          — keep, add variant prop
    DetailSheet.tsx       — rewrite
    SettingsSheet.tsx     — new
    ShieldDropletIcon.tsx — keep
lib/
  locales/th.json, en.json
  locale-context.tsx      — i18n without new library
  mock-data.ts            — expand to 10 reports with realistic Thai locations
```

---

## Data Changes

- Expand `SEED_REPORTS` to 10 items with varied risk levels, statuses, realistic Thai addresses
- Use local placeholder images (gradient cards with pipe icon) instead of Unsplash — works offline, no external dependency
- Add `district` optional field to Report type for richer list display

---

## Non-Goals (this redesign)

- Real Gemini API
- Real Firebase
- Interactive Leaflet map
- Login system
- Charts/graphs (spec forbids)

---

## Success Criteria

After redesign, a screen recording should show:

1. Landing page that immediately communicates what FaoTor does
2. Report flow that feels like "AI is working" (not just a spinner)
3. Dashboard with enough data to look like a real municipality tool
4. Detail sheet that officers would actually use
5. Consistent brand blue/slate throughout — no generic Tailwind defaults

Target perceived quality: **7-8/10** for hackathon demo (not production, but credible).
