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
  return "#3B82F6";
}
