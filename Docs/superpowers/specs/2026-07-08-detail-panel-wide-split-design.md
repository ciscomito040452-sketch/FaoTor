# Detail Panel Wide Split — Design Spec

**Date:** 2026-07-08  
**Status:** Approved  
**Scope:** Desktop `ReportDetailPanel` proportions and readability

## Problem

Detail panel at 400–520px with 2-column split leaves ~200px per column. Thai status labels wrap to 2 lines; metrics stacked vertically feel cramped; 4:3 image dominates the right column.

## Solution: Wide Split + Sticky Footer

### Layout

- **Header:** full width — title, chips, close
- **Body (2 columns ~52/48):**
  - Left: map link + AI reason card
  - Right: image (16:10, max-h 168px)
- **Full width below body:** horizontal metrics (`panel` variant)
- **Footer (sticky):** full-width `StatusSegmented` + Save button

### Panel width

`xl:grid-cols-[minmax(0,1fr)_minmax(520px,600px)]`

### Typography

- AI body: 14px, `leading-relaxed`
- Status segmented: 12px, `whitespace-nowrap`, `leading-none`

### Logic fix

`showStatusInBody` must respect `showStatusSection` even when `layout="split"`.

### Unchanged

- Mobile `DetailSheet` — stack layout + footer status
- Mock data, KPI cards

## Success criteria

- Status labels single line at xl breakpoint
- AI text readable without overflow
- Image + metrics balanced in right column
- `npm run lint` and `npm run build` pass
