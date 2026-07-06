# FaoTor UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild FaoTor frontend as a premium, video-ready mock-up that fully expresses `UI_UX_SPEC.md` while keeping mock backend (localStorage + mock-analyze).

**Architecture:** Shared app shell wraps all inner pages. Landing is a marketing-style hero. Report uses a 3-step wizard with animated analysis progress. Dashboard gets filters, static map teaser, and 10 seed reports. Settings sheet provides i18n + dark mode via React Context.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS 4, TypeScript. No new npm dependencies.

## Global Constraints

- Colors: Brand Blue (`#2F6FED`), Slate palette, Risk amber/red only in badges — per `UI_UX_SPEC.md` §1
- Typography: IBM Plex Sans Thai + Inter, Large Title 34px/700, Stat numbers 28px/600
- No charts, donuts, progress bars as data viz (simple loading bar OK)
- No emoji anywhere
- Button/row min height 50px / 64px
- Border radius: Card 16px, Button/Input 12px, Thumbnail 8px, Badge pill 9999px
- Spacing: 8pt grid only (4, 8, 12, 16, 24, 32, 48)
- Mock only: no Firebase, no Gemini, no new API routes
- i18n: React Context + JSON files, no next-intl

---

### Task 1: Foundation — tokens, locale, expanded seed data

**Files:**
- Modify: `app/globals.css`
- Create: `lib/locales/th.json`, `lib/locales/en.json`
- Create: `lib/locale-context.tsx`
- Modify: `lib/types.ts` (add optional `district`)
- Modify: `lib/mock-data.ts` (10 reports, local gradient placeholders)
- Modify: `app/layout.tsx` (wrap with LocaleProvider)

**Interfaces:**
- Produces: `useLocale()` → `{ locale, setLocale, t(key) }`
- Produces: `SEED_REPORTS` with 10 items

- [ ] **Step 1:** Add dark mode CSS variables and `.dark` body styles in `globals.css`
- [ ] **Step 2:** Create `th.json` and `en.json` with keys for all UI strings
- [ ] **Step 3:** Create `locale-context.tsx` with Context provider
- [ ] **Step 4:** Expand `mock-data.ts` to 10 realistic Thai reports using inline SVG data-URI thumbnails
- [ ] **Step 5:** Update `layout.tsx` to nest `LocaleProvider` inside `ReportsProvider`
- [ ] **Step 6:** Run `npm run build` — expect PASS

---

### Task 2: Shared layout components

**Files:**
- Create: `components/layout/AppShell.tsx`
- Create: `components/layout/PageHeader.tsx`
- Create: `components/layout/BottomNav.tsx`
- Create: `components/shared/RiskScore.tsx`
- Create: `components/SettingsSheet.tsx`
- Modify: `components/AppHeader.tsx` (or deprecate in favor of PageHeader)

**Interfaces:**
- Consumes: `useLocale()`, `usePathname()`
- Produces: `<AppShell showNav={boolean}>{children}</AppShell>`

- [ ] **Step 1:** Build `PageHeader` — back arrow, title, settings gear button
- [ ] **Step 2:** Build `BottomNav` — 3 tabs with active state (blue-500)
- [ ] **Step 3:** Build `AppShell` combining header + content + optional bottom nav
- [ ] **Step 4:** Build `SettingsSheet` — language toggle + dark mode toggle
- [ ] **Step 5:** Build `RiskScore` — displays score 0-100 with color by level
- [ ] **Step 6:** Run `npm run build` — expect PASS

---

### Task 3: Landing page rebuild

**Files:**
- Create: `components/landing/HeroSection.tsx`
- Create: `components/landing/RoleCard.tsx`
- Create: `components/landing/HowItWorks.tsx`
- Create: `components/landing/LiveStatsTeaser.tsx`
- Rewrite: `app/page.tsx`

**Interfaces:**
- Consumes: `useReports()` for live stats, `useLocale()` for strings

- [ ] **Step 1:** Build `HeroSection` with gradient background and logo
- [ ] **Step 2:** Build `RoleCard` — large tappable card with icon + title + description
- [ ] **Step 3:** Build `HowItWorks` — 3 numbered steps
- [ ] **Step 4:** Build `LiveStatsTeaser` reading from reports store
- [ ] **Step 5:** Compose new `app/page.tsx`
- [ ] **Step 6:** Run `npm run build` — expect PASS

---

### Task 4: Report flow — wizard + analysis animation

**Files:**
- Create: `components/report/StepIndicator.tsx`
- Create: `components/report/PhotoUploadZone.tsx`
- Create: `components/report/AnalysisProgress.tsx`
- Create: `components/report/ResultCard.tsx`
- Rewrite: `components/UploadForm.tsx`
- Modify: `app/report/page.tsx`

**Interfaces:**
- Consumes: `mockAnalyzeImage()`, `useReports().addReport`
- Produces: 3-step flow form → loading → result

- [ ] **Step 1:** Build `StepIndicator` — 3 steps with active/completed states
- [ ] **Step 2:** Build `PhotoUploadZone` — camera icon, dashed border, preview
- [ ] **Step 3:** Build `AnalysisProgress` — sequential checkmarks + progress bar
- [ ] **Step 4:** Build `ResultCard` — RiskScore + RiskBadge + reason + actions
- [ ] **Step 5:** Rewrite `UploadForm` to orchestrate steps
- [ ] **Step 6:** Update `app/report/page.tsx` with AppShell
- [ ] **Step 7:** Run `npm run build` — expect PASS

---

### Task 5: Dashboard rebuild

**Files:**
- Create: `components/dashboard/FilterTabs.tsx`
- Create: `components/dashboard/MapPreviewCard.tsx`
- Create: `components/dashboard/ReportRow.tsx`
- Rewrite: `components/ReportTable.tsx`
- Rewrite: `components/DetailSheet.tsx`
- Modify: `components/StatCard.tsx` (add `variant` prop for danger highlight)
- Rewrite: `app/dashboard/page.tsx`

**Interfaces:**
- Consumes: `useReports()`, filter state
- Produces: filtered sorted list, detail sheet on row click

- [ ] **Step 1:** Build `FilterTabs` segmented control
- [ ] **Step 2:** Build `MapPreviewCard` with static SVG pins
- [ ] **Step 3:** Build `ReportRow` with score + badge + thumbnail
- [ ] **Step 4:** Rewrite `DetailSheet` with hero image, score, reason block
- [ ] **Step 5:** Compose new `dashboard/page.tsx` with filters + map + list
- [ ] **Step 6:** Run `npm run build` — expect PASS

---

### Task 6: Polish + verify + push

**Files:**
- Modify: any remaining hardcoded Thai strings → `t()` calls
- Delete: unused `components/AppHeader.tsx` if fully replaced

- [ ] **Step 1:** Audit all pages for AppShell consistency
- [ ] **Step 2:** Test dark mode toggle on all pages
- [ ] **Step 3:** Run `npm run build` — expect PASS
- [ ] **Step 4:** Manual flow test: landing → report → dashboard → detail → status change
- [ ] **Step 5:** Commit: `feat: premium UI redesign for demo presentation`

---

## Self-Review Checklist

- [x] Landing hero — Task 3
- [x] Step indicator + analysis animation — Task 4
- [x] Big risk score — Tasks 2, 4, 5
- [x] 10 seed reports — Task 1
- [x] Filter tabs — Task 5
- [x] Static map teaser — Task 5
- [x] Settings sheet — Task 2
- [x] i18n — Task 1
- [x] Dark mode — Task 1
- [x] No new backend — Global Constraints
