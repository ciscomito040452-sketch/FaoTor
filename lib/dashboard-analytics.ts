import type { Report } from "./types";

export interface DayCount {
  date: string;
  count: number;
}

function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function reportDateKey(iso: string): string {
  return dateKey(new Date(iso));
}

/** Count reports per day for the last `days` days (oldest → newest). */
export function reportsByDayWhere(
  reports: Report[],
  days: number,
  predicate: (r: Report) => boolean
): number[] {
  const now = new Date();
  const keys: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    keys.push(dateKey(d));
  }
  const counts = new Map(keys.map((k) => [k, 0]));
  for (const r of reports) {
    const k = reportDateKey(r.createdAt);
    if (counts.has(k) && predicate(r)) {
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
  }
  return keys.map((k) => counts.get(k) ?? 0);
}

export function reportsByDay(reports: Report[], days = 7): number[] {
  return reportsByDayWhere(reports, days, () => true);
}

export function reportsByDayPending(reports: Report[], days = 7): number[] {
  return reportsByDayWhere(reports, days, (r) => r.status === "รอดำเนินการ");
}

export function reportsByDaySevere(reports: Report[], days = 7): number[] {
  return reportsByDayWhere(reports, days, (r) => r.riskLevel === "อุดตันหนัก");
}

export function reportsByDayResolved(reports: Report[], days = 7): number[] {
  return reportsByDayWhere(reports, days, (r) => r.status === "แก้ไขแล้ว");
}

export function sumSeries(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

/** Compare sum of last `windowDays` vs previous `windowDays` in a 2×window series. */
export function trendFromDaySeries(
  reports: Report[],
  windowDays: number,
  predicate: (r: Report) => boolean
): number | null {
  const series = reportsByDayWhere(reports, windowDays * 2, predicate);
  const current = sumSeries(series.slice(-windowDays));
  const previous = sumSeries(series.slice(0, windowDays));
  return trendPercent(current, previous);
}

export function resolutionRate(reports: Report[]): number {
  if (reports.length === 0) return 0;
  const fixed = reports.filter((r) => r.status === "แก้ไขแล้ว").length;
  return Math.round((fixed / reports.length) * 100);
}

export function trendPercent(
  current: number,
  previous: number
): number | null {
  if (previous === 0) return null;
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

export function reportsOnDay(
  reports: Report[],
  year: number,
  month: number,
  day: number
): Report[] {
  return reports.filter((r) => {
    const d = new Date(r.createdAt);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month &&
      d.getDate() === day
    );
  });
}
