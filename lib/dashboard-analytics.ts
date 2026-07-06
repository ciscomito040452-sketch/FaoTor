import type { Report } from "./types";

export interface DayCount {
  date: string;
  count: number;
}

export function reportsByDay(reports: Report[], days = 7): number[] {
  const counts = new Map<string, number>();
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    counts.set(key, 0);
  }
  for (const r of reports) {
    const key = r.createdAt.slice(0, 10);
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return Array.from(counts.values());
}

export function resolutionRate(reports: Report[]): number {
  if (reports.length === 0) return 0;
  const fixed = reports.filter((r) => r.status === "แก้ไขแล้ว").length;
  return Math.round((fixed / reports.length) * 100);
}

export function trendPercent(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function calendarHeatmap(
  reports: Report[],
  year: number,
  month: number
): Map<number, number> {
  const map = new Map<number, number>();
  for (const r of reports) {
    const d = new Date(r.createdAt);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      map.set(day, (map.get(day) ?? 0) + 1);
    }
  }
  return map;
}

export function sparklineFromScores(reports: Report[], n = 8): number[] {
  return [...reports]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-n)
    .map((r) => r.riskScore);
}
