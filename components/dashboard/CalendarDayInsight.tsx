"use client";

import { useMemo } from "react";
import type { Report } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { reportsOnDay } from "@/lib/dashboard-analytics";
import { Card } from "@/components/ui/Card";
import { ScoreRing } from "@/components/ui/ScoreRing";

interface CalendarDayInsightProps {
  reports: Report[];
  year: number;
  month: number;
  selectedDay: number;
  onViewList: () => void;
  onSelectReport: (report: Report) => void;
}

const RING_COLORS = {
  ปกติ: "#6B7280",
  เริ่มอุดตัน: "#F97316",
  อุดตันหนัก: "#EF4444",
} as const;

export function CalendarDayInsight({
  reports,
  year,
  month,
  selectedDay,
  onViewList,
  onSelectReport,
}: CalendarDayInsightProps) {
  const { t } = useApp();
  const now = new Date();
  const isToday =
    now.getFullYear() === year &&
    now.getMonth() === month &&
    now.getDate() === selectedDay;

  const dayReports = useMemo(
    () => reportsOnDay(reports, year, month, selectedDay),
    [reports, year, month, selectedDay]
  );

  const pending = dayReports.filter((r) => r.status === "รอดำเนินการ").length;
  const severe = dayReports.filter((r) => r.riskLevel === "อุดตันหนัก").length;
  const topReports = [...dayReports]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 2);

  const title = isToday
    ? t("dashboard.dayInsightToday")
    : t("dashboard.dayInsightDay").replace("{day}", String(selectedDay));

  return (
    <Card className="flex flex-1 flex-col">
      <p className="text-[15px] font-semibold text-slate-900">{title}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {(
          [
            { dot: "bg-slate-200", pill: "bg-slate-50 text-slate-500", key: "dashboard.calendarLegend0" },
            { dot: "bg-brand-blue/40", pill: "bg-brand-blue-soft text-brand-blue", key: "dashboard.calendarLegend1" },
            { dot: "bg-brand-blue", pill: "bg-brand-blue-soft text-brand-blue", key: "dashboard.calendarLegend2" },
            { dot: "bg-brand-orange", pill: "bg-brand-orange-soft text-brand-orange", key: "dashboard.calendarLegend3" },
          ] as const
        ).map(({ dot, pill, key }) => (
          <span
            key={key}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${pill}`}
          >
            <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
            {t(key)}
          </span>
        ))}
      </div>

      {dayReports.length === 0 ? (
        <p className="mt-4 text-[13px] text-slate-500">
          {t("dashboard.dayInsightEmpty")}
        </p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-[12px] bg-slate-50 px-2 py-3 text-center">
              <p className="text-[20px] font-bold text-slate-900">
                {dayReports.length}
              </p>
              <p className="text-[10px] text-slate-500">
                {t("dashboard.dayInsightReports")}
              </p>
            </div>
            <div className="rounded-[12px] bg-brand-blue-soft px-2 py-3 text-center">
              <p className="text-[20px] font-bold text-brand-blue">{pending}</p>
              <p className="text-[10px] text-slate-600">
                {t("dashboard.filterPending")}
              </p>
            </div>
            <div className="rounded-[12px] bg-brand-orange-soft px-2 py-3 text-center">
              <p className="text-[20px] font-bold text-brand-orange">{severe}</p>
              <p className="text-[10px] text-slate-600">
                {t("dashboard.filterSevere")}
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {topReports.map((report) => (
              <button
                key={report.id}
                type="button"
                onClick={() => onSelectReport(report)}
                className="flex w-full items-center gap-3 rounded-[12px] border border-slate-100 bg-slate-50/50 p-2 text-left transition hover:border-brand-blue/30 hover:bg-brand-blue-soft/30"
              >
                <ScoreRing
                  value={report.riskScore}
                  size={44}
                  strokeColor={
                    RING_COLORS[report.riskLevel as keyof typeof RING_COLORS] ??
                    "#3B82F6"
                  }
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-slate-900">
                    {report.location}
                  </p>
                  <p className="text-[11px] text-slate-500">{report.district}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onViewList}
            className="mt-auto pt-4 text-[13px] font-semibold text-brand-blue hover:text-brand-blue-dark"
          >
            {t("dashboard.dayInsightViewList")} →
          </button>
        </>
      )}
    </Card>
  );
}
