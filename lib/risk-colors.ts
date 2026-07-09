import type { RiskLevel } from "./types";

/** Map pins + legend — matches risk status, not rose metrics */
export const MAP_PIN_COLORS: Record<RiskLevel, string> = {
  ปกติ: "#4E5768",
  เริ่มอุดตัน: "#8A5A00",
  อุดตันหนัก: "#B3261E",
};

/** Ring stroke colors — rose for risk levels */
export const RISK_RING: Record<RiskLevel, string> = {
  ปกติ: "#9CA3AF",
  เริ่มอุดตัน: "#FB7185",
  อุดตันหนัก: "#E11D48",
};

export const RISK_METRIC_BG: Record<RiskLevel, string> = {
  ปกติ: "bg-slate-50",
  เริ่มอุดตัน: "bg-rose-50",
  อุดตันหนัก: "bg-rose-50",
};

export const RISK_BADGE: Record<RiskLevel, { bg: string; text: string }> = {
  ปกติ: { bg: "bg-slate-100", text: "text-slate-600" },
  เริ่มอุดตัน: { bg: "bg-rose-50", text: "text-rose-700" },
  อุดตันหนัก: { bg: "bg-rose-50", text: "text-rose-800" },
};

export function riskMetricValueClass(level: RiskLevel): string {
  if (level === "อุดตันหนัก") return "text-rose-800";
  if (level === "เริ่มอุดตัน") return "text-rose-700";
  return "text-slate-900";
}

export function riskBarFillClass(level: RiskLevel): string {
  if (level === "อุดตันหนัก") return "bg-rose-700";
  if (level === "เริ่มอุดตัน") return "bg-rose-600";
  return "bg-slate-400";
}

export function riskBarTrackClass(): string {
  return "bg-rose-200/60";
}

export function urgencyRingColor(score: number): string {
  if (score >= 85) return "#EA580C";
  if (score >= 70) return "#F97316";
  return "#94A3B8";
}

/** Metric strip — segmented Apple-style, no gray tray or top borders */
export const METRIC_STRIP =
  "grid grid-cols-3 divide-x divide-slate-200/80 overflow-hidden rounded-xl ring-1 ring-slate-200/70";
export const METRIC_CELL_URGENCY = "bg-slate-50/85";
export const METRIC_CELL_RISK = "bg-rose-50/75";
export const METRIC_CELL_RAIN = "bg-sky-50/75";

/** Metric focus panel — hero urgency ring + stacked risk/rain (ReportCard v4.8) */
export const METRIC_FOCUS_PANEL =
  "grid min-h-[68px] w-[284px] max-w-[284px] shrink-0 grid-cols-[90px_194px] grid-rows-1 overflow-hidden rounded-xl ring-1 ring-inset ring-slate-200/80";

/** Fluid width for dashboard list rows — room for full rain label */
export const METRIC_FOCUS_PANEL_LIST =
  "grid min-h-[72px] w-full min-w-0 max-w-[252px] grid-cols-[68px_minmax(0,1fr)] grid-rows-1 overflow-hidden rounded-xl ring-1 ring-inset ring-slate-200/80";

/** @deprecated use METRIC_STRIP + METRIC_CELL_* */
export const BENTO_TRAY = METRIC_STRIP;
export const BENTO_CELL_URGENCY = METRIC_CELL_URGENCY;
export const BENTO_CELL_RISK = METRIC_CELL_RISK;
export const BENTO_CELL_RAIN = METRIC_CELL_RAIN;
export const BENTO_HERO = METRIC_CELL_URGENCY;
export const BENTO_SURFACE =
  "rounded-[14px] bg-white ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.03)]";
