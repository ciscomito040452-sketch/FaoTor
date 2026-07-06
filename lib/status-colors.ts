import type { ReportStatus, RiskLevel } from "./types";

export const STATUS_PILL: Record<ReportStatus, string> = {
  รอดำเนินการ: "bg-slate-100 text-slate-600 ring-slate-200/80",
  กำลังแก้ไข: "bg-brand-blue-soft text-brand-blue ring-brand-blue/20",
  แก้ไขแล้ว: "bg-emerald-50 text-emerald-700 ring-emerald-200/80",
};

export const THUMB_RING: Record<RiskLevel, string> = {
  ปกติ: "ring-slate-200",
  เริ่มอุดตัน: "ring-brand-orange/40",
  อุดตันหนัก: "ring-brand-orange/60",
};
