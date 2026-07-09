import type { RiskLevel } from "./types";

const EXAMPLES_BASE = "/samples/samples/Example";
const MOCK_LIST_BASE = "/samples/samples/Mock List 1-4";

function assetPath(base: string, filename: string): string {
  return `${base}/${encodeURIComponent(filename)}`;
}

/** Report flow — pick sample by risk level (อุดตันหนัก → เริ่มอุดตัน → ปกติ) */
export const SAMPLE_IMAGES_BY_RISK: Record<RiskLevel, string> = {
  อุดตันหนัก: assetPath(EXAMPLES_BASE, "อุดตันหนัก.jpg"),
  เริ่มอุดตัน: assetPath(EXAMPLES_BASE, "เริ่มอุดตัน.jpg"),
  ปกติ: assetPath(EXAMPLES_BASE, "ปกติ.jpg"),
};

export const SAMPLE_IMAGES = [
  SAMPLE_IMAGES_BY_RISK["อุดตันหนัก"],
  SAMPLE_IMAGES_BY_RISK["เริ่มอุดตัน"],
  SAMPLE_IMAGES_BY_RISK["ปกติ"],
] as const;

/** Dashboard list — top urgent rows matched by location label */
const MOCK_LIST_IMAGES_BY_LOCATION: Record<string, string> = {
  "ซอยลาดพร้าว 42": assetPath(MOCK_LIST_BASE, "ซอยลาดพร้าว 42.jpg"),
  "ตลาดนัดจตุจักร โซน B": assetPath(MOCK_LIST_BASE, "ตลาดนัดจตุจักร โซน B.jpg"),
  "ชุมชนคลองเตย ซอย 12": assetPath(MOCK_LIST_BASE, "ชุมชนคลองเตย ซอย 12.jpg"),
  "หมู่บ้านสุขใจ ซอย 3": assetPath(MOCK_LIST_BASE, "หมู่บ้านสุขใจ ซอย 3.jpg"),
};

/** Dashboard list — SVG placeholder by risk (not real photos) */
const PLACEHOLDER_BY_RISK: Record<RiskLevel, string> = {
  อุดตันหนัก: "/samples/drain-severe.svg",
  เริ่มอุดตัน: "/samples/drain-partial.svg",
  ปกติ: "/samples/drain-normal.svg",
};

export function placeholderImageForRisk(level: RiskLevel): string {
  return PLACEHOLDER_BY_RISK[level];
}

export function sampleImageForRisk(level: RiskLevel): string {
  return SAMPLE_IMAGES_BY_RISK[level];
}

export function mockListImageForLocation(location: string): string | undefined {
  return MOCK_LIST_IMAGES_BY_LOCATION[location];
}
