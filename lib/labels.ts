import type { RainForecast, ReportStatus, RiskLevel } from "./types";

type LabelLocale = "th" | "en";

const RISK_LABELS: Record<LabelLocale, Record<RiskLevel, string>> = {
  th: {
    ปกติ: "ปกติ",
    เริ่มอุดตัน: "เริ่มอุดตัน",
    อุดตันหนัก: "อุดตันหนัก",
  },
  en: {
    ปกติ: "Normal",
    เริ่มอุดตัน: "Partial blockage",
    อุดตันหนัก: "Severe blockage",
  },
};

const STATUS_LABELS: Record<LabelLocale, Record<ReportStatus, string>> = {
  th: {
    รอดำเนินการ: "รอดำเนินการ",
    กำลังแก้ไข: "กำลังแก้ไข",
    แก้ไขแล้ว: "แก้ไขแล้ว",
  },
  en: {
    รอดำเนินการ: "Pending",
    กำลังแก้ไข: "In progress",
    แก้ไขแล้ว: "Resolved",
  },
};

const RAIN_LABELS: Record<LabelLocale, Record<RainForecast, string>> = {
  th: { สูง: "สูง", ปานกลาง: "ปานกลาง", ต่ำ: "ต่ำ" },
  en: { สูง: "High", ปานกลาง: "Medium", ต่ำ: "Low" },
};

export function getRiskLabel(level: RiskLevel, locale: LabelLocale): string {
  return RISK_LABELS[locale][level];
}

export function getStatusLabel(status: ReportStatus, locale: LabelLocale): string {
  return STATUS_LABELS[locale][status];
}

export function getRainLabel(forecast: RainForecast, locale: LabelLocale): string {
  return RAIN_LABELS[locale][forecast];
}

export const STATUS_OPTIONS: ReportStatus[] = [
  "รอดำเนินการ",
  "กำลังแก้ไข",
  "แก้ไขแล้ว",
];
