import type { RiskLevel } from "./types";

const BY_RISK: Record<RiskLevel, string> = {
  อุดตันหนัก: "/samples/drain-severe.svg",
  เริ่มอุดตัน: "/samples/drain-partial.svg",
  ปกติ: "/samples/drain-normal.svg",
};

export function sampleImageForRisk(level: RiskLevel): string {
  return BY_RISK[level];
}
