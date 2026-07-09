# Motion Design System v2 — FaoTor

**Date:** 2026-07-09  
**Scope:** Frontend polish — extends v1 spec

## v2 Additions

### New tokens
- `--duration-enter: 320ms`
- `--duration-exit: 200ms`
- `--ease-apple: cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### New variants (`lib/motion.ts`)
- `listItemVariants` — list enter/exit with scale
- `popLayoutTransition` — spring for filter changes

### New primitives
| Component | Purpose |
|-----------|---------|
| `MotionButton` | Hover lift + tap scale |
| `AnimatedCounter` | Count-up from previous value |
| `StaggerList` / `StaggerReveal` | Section & list stagger |
| `Skeleton` / `DashboardSkeleton` | Loading placeholders |

### Page transitions
- `PageTransition` uses `AnimatePresence mode="wait"` with enter + exit

### Component updates
- `StatusSegmented` — layoutId pill
- `SettingsSheet` — sliding locale/theme pills
- `ReportCard` — motion.button + layoutId thumbnail
- `DashboardListWorkspace` — AnimatePresence popLayout
- `QueueTimeline` — stagger slide-in
- `CalendarDayInsight` — crossfade on day change
- `EmptyState` — breathing icon
- `StepIndicator` — animated progress + check draw
- `PhotoUploadZone` — demo-only sample mode
- `LineFlowMock` — bubble slide-up
- `Toast` — success/error variants
- `TopNav` — scroll shadow
- `MobileBottomNav` — active dot + `/line` tab

## Demo recording notes
- Reset demo before each take for fresh KPI count-up
- Use sample photos only in `/report`
- Pause on nav pill slide and page fade (~320ms)
