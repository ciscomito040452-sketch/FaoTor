# FaoTor UI v3 — KARO-Inspired Design Spec

**Date:** 2026-07-06  
**Status:** Approved for implementation  
**Scope:** Full frontend visual redesign (mock layer unchanged)

## Summary

Redesign all 5 pages with KARO-style blue-orange palette, bento cards, top navigation, and SVG mini charts for KPI decoration. Functionality and mock data layer remain unchanged.

## Palette

| Token | Hex | Usage |
|-------|-----|-------|
| brand-blue | #3B82F6 | Primary actions, active tabs |
| brand-blue-dark | #2563EB | Hover |
| brand-blue-soft | #EFF6FF | Active tints |
| brand-orange | #F97316 | Secondary accent, trends |
| brand-orange-soft | #FFF7ED | Secondary tints |
| surface-page | #F3F4F6 | Page background |
| surface-card | #FFFFFF | Cards |
| risk-severe | #EF4444 | Badges/pins only |

## Navigation

Top nav (KARO): Logo | Pill tabs | Demo + Settings + Avatar  
Mobile: compact top bar + bottom icon nav

## Dashboard Bento

- Row 1: 4 KPI cards with mini charts
- Row 2: Calendar | Queue timeline | Map
- Row 3: Report list + detail panel

## Out of scope

Chart libraries, real auth, real CSV export, backend changes.
