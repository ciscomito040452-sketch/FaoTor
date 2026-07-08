import type { RiskLevel } from "./types";

/** Ring stroke colors — orange-first, no harsh red */
export const RISK_RING: Record<RiskLevel, string> = {
  ปกติ: "#9CA3AF",
  เริ่มอุดตัน: "#F97316",
  อุดตันหนัก: "#EA580C",
};

export const RISK_METRIC_BG: Record<RiskLevel, string> = {
  ปกติ: "bg-slate-50",
  เริ่มอุดตัน: "bg-brand-orange-soft",
  อุดตันหนัก: "bg-brand-orange-soft",
};

export const RISK_BADGE: Record<RiskLevel, { bg: string; text: string }> = {
  ปกติ: { bg: "bg-slate-100", text: "text-slate-600" },
  เริ่มอุดตัน: { bg: "bg-brand-orange-soft", text: "text-brand-orange" },
  อุดตันหนัก: { bg: "bg-brand-orange-soft", text: "text-brand-orange-dark" },
};

export function urgencyRingColor(score: number): string {
  if (score >= 85) return "#EA580C";
  if (score >= 70) return "#F97316";
  return "#94A3B8";
}

/** Metric strip — segmented Apple-style, no gray tray or top borders */
export const METRIC_STRIP =
  "grid grid-cols-3 divide-x divide-slate-200/80 overflow-hidden rounded-xl ring-1 ring-slate-200/70";
export const METRIC_CELL_URGENCY = "bg-orange-50/75";
export const METRIC_CELL_RISK = "bg-slate-50/85";
export const METRIC_CELL_RAIN = "bg-sky-50/75";

/** Metric focus panel — hero urgency ring + stacked risk/rain (ReportCard v4.8) */
export const METRIC_FOCUS_PANEL =
  "grid min-h-[68px] w-[284px] max-w-[284px] shrink-0 grid-cols-[90px_194px] grid-rows-1 overflow-hidden rounded-xl ring-1 ring-inset ring-slate-200/80";

/** @deprecated use METRIC_STRIP + METRIC_CELL_* */
export const BENTO_TRAY = METRIC_STRIP;
export const BENTO_CELL_URGENCY = METRIC_CELL_URGENCY;
export const BENTO_CELL_RISK = METRIC_CELL_RISK;
export const BENTO_CELL_RAIN = METRIC_CELL_RAIN;
export const BENTO_HERO = METRIC_CELL_URGENCY;
export const BENTO_SURFACE =
  "rounded-[14px] bg-white ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.03)]";
