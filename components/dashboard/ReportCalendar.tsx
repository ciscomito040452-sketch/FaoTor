"use client";

import { useMemo } from "react";
import { useApp } from "@/lib/app-context";
import { calendarHeatmap } from "@/lib/dashboard-analytics";
import type { Report } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface ReportCalendarProps {
  reports: Report[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export function ReportCalendar({
  reports,
  selectedDay,
  onSelectDay,
}: ReportCalendarProps) {
  const { t } = useApp();
  const now = new Date();
  const heat = useMemo(
    () => calendarHeatmap(reports, now.getFullYear(), now.getMonth()),
    [reports, now]
  );

  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthLabel = now.toLocaleDateString("th-TH", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card>
      <p className="text-[15px] font-semibold text-slate-900">
        {t("dashboard.calendarTitle")}
      </p>
      <p className="mt-1 text-[13px] text-slate-600">{monthLabel}</p>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400">
        {["อ", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (day == null) {
            return <div key={`e-${i}`} className="h-8" />;
          }
          const count = heat.get(day) ?? 0;
          const isSelected = day === selectedDay;
          const isToday = day === today;
          const intensity =
            count === 0
              ? "bg-slate-50 text-slate-400"
              : count === 1
                ? "bg-brand-blue-soft text-brand-blue"
                : count >= 3
                  ? "bg-brand-orange text-white"
                  : "bg-brand-blue text-white";
          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDay(day)}
              className={`flex h-8 w-full items-center justify-center rounded-md text-[12px] font-semibold transition ${intensity} ${
                isSelected
                  ? "ring-2 ring-brand-blue ring-offset-1"
                  : isToday
                    ? "ring-1 ring-brand-orange/50"
                    : "hover:opacity-80"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
