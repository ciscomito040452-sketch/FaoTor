"use client";

import { useMemo } from "react";
import { useApp } from "@/lib/app-context";
import { calendarHeatmap } from "@/lib/dashboard-analytics";
import type { Report } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface ReportCalendarProps {
  reports: Report[];
}

export function ReportCalendar({ reports }: ReportCalendarProps) {
  const { t } = useApp();
  const now = new Date();
  const heat = useMemo(
    () => calendarHeatmap(reports, now.getFullYear(), now.getMonth()),
    [reports, now]
  );

  const year = now.getFullYear();
  const month = now.getMonth();
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
    <Card className="h-full">
      <p className="text-[15px] font-semibold text-slate-900">
        {t("dashboard.calendarTitle")}
      </p>
      <p className="mt-1 text-[13px] text-slate-600">{monthLabel}</p>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400">
        {["อ", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day == null) {
            return <div key={`e-${i}`} className="aspect-square" />;
          }
          const count = heat.get(day) ?? 0;
          const intensity =
            count === 0
              ? "bg-slate-50 text-slate-400"
              : count === 1
                ? "bg-brand-blue-soft text-brand-blue"
                : count >= 3
                  ? "bg-brand-orange text-white"
                  : "bg-brand-blue text-white";
          return (
            <div
              key={day}
              className={`flex aspect-square items-center justify-center rounded-lg text-[12px] font-semibold ${intensity}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
