# Motion Design System v1 — FaoTor

**Date:** 2026-07-09  
**Scope:** Mock-up Frontend polish (no backend changes)

## Goals

- Make the app feel alive, smooth, and Apple-like without heavy animations
- Use `transform` + `opacity` only (150–400ms)
- Respect `prefers-reduced-motion` everywhere

## Tokens (`app/globals.css`)

| Token | Value |
|-------|-------|
| `--ease-out-expo` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--ease-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) |
| `--duration-fast` | 150ms |
| `--duration-normal` | 250ms |
| `--duration-slow` | 400ms |

Utility classes: `.animate-fade-up`, `.animate-scale-in`, `.animate-shake`, `.pressable`, `.stagger-1`…`.stagger-6`

## JS helpers (`lib/motion.ts`)

- `useReducedMotion()` — matchMedia hook
- `MOTION.spring`, `MOTION.tween`, `staggerChildren()`
- Variants: `backdropVariants`, `sheetPanelVariants`, `toastVariants`, `pageVariants`, `fadeUpVariants`, `slideLeftVariants`, `scaleFadeVariants`

## Primitives

| Component | Use |
|-----------|-----|
| `FadeIn` | Staggered content reveal |
| `AnimatedSheet` | DetailSheet, SettingsSheet |
| `PageTransition` | Route enter (AppLayout) |

## Component mapping

| Area | Animation |
|------|-----------|
| TopNav | `layoutId="nav-pill"` sliding active tab |
| MobileBottomNav | Icon scale on active + tap |
| DetailSheet / Settings | Backdrop fade + panel slide/spring |
| Toast | Slide up + fade |
| ErrorBanner | Shake + fade out |
| Dashboard KPI | Count-up + bar/donut grow |
| ReportCard | Selection tint + list stagger |
| FilterTabs | `layoutId="filter-pill"` |
| Calendar | Tap scale + selected spring |
| Map pin | Bounce on select |
| Report flow | Step crossfade (AnimatePresence) |
| Landing | Stagger fade-up on sections |

## Library

- **framer-motion** — sheets, layoutId, AnimatePresence, stagger
- **CSS** — charts, rings, pressable buttons, keyframes

## Reduced motion

All framer-motion components check `useReducedMotion()` and skip to final state. CSS keyframes disabled via `@media (prefers-reduced-motion: reduce)`.
