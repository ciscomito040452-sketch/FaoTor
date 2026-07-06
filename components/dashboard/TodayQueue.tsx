"use client";

import type { Report } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { RiskBadge } from "@/components/RiskBadge";

interface TodayQueueProps {
  reports: Report[];
  onOpen: (report: Report) => void;
  selectedId?: string | null;
}

export function TodayQueue({ reports, onOpen, selectedId }: TodayQueueProps) {
  const { t } = useApp();

  if (reports.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="mb-3">
        <h2 className="text-[17px] font-semibold text-slate-900">
          {t("dashboard.todayQueue")}
        </h2>
        <p className="text-[13px] text-slate-600">{t("dashboard.todayQueueHint")}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => {
          const selected = report.id === selectedId;
          return (
            <button
              key={report.id}
              type="button"
              onClick={() => onOpen(report)}
              className={`flex items-center gap-3 rounded-[12px] border bg-white p-3 text-left transition hover:border-slate-200 hover:shadow-sm dark:bg-[var(--color-surface)] ${
                selected
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-slate-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={report.imageUrl}
                alt={report.location}
                className="h-12 w-12 shrink-0 rounded-[8px] object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-slate-400">
                    #{index + 1}
                  </span>
                  <p className="truncate text-[15px] font-semibold text-slate-900">
                    {report.location}
                  </p>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-semibold text-slate-900">
                    {report.riskScore}
                  </span>
                  <RiskBadge level={report.riskLevel} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
