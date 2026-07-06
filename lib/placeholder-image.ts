import type { RiskLevel } from "./types";

const TINT: Record<RiskLevel, string> = {
  ปกติ: "#E9EBEF",
  เริ่มอุดตัน: "#FFF3DC",
  อุดตันหนัก: "#FDE7E7",
};

const ACCENT: Record<RiskLevel, string> = {
  ปกติ: "#4E5768",
  เริ่มอุดตัน: "#8A5A00",
  อุดตันหนัก: "#B3261E",
};

export function makePlaceholderImage(
  risk: RiskLevel,
  label = "ท่อระบายน้ำ"
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${TINT[risk]}"/>
    <rect x="40" y="200" width="320" height="24" rx="4" fill="#9AA3B2" opacity="0.5"/>
    <rect x="120" y="80" width="160" height="120" rx="8" fill="#2F6FED" opacity="0.15"/>
    <circle cx="200" cy="140" r="36" fill="#2F6FED" opacity="0.25"/>
    <text x="200" y="260" text-anchor="middle" font-family="sans-serif" font-size="16" fill="${ACCENT[risk]}">${label}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
