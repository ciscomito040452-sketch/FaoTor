"use client";

import type { Report } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { RiskBadge } from "@/components/RiskBadge";
import { Card } from "@/components/ui/Card";

interface QueueTimelineProps {
  reports: Report[];
  selectedId?: string | null;
  onOpen: (report: Report) => void;
}

export function QueueTimeline({ reports, selectedId, onOpen }: QueueTimelineProps) {
  const { t } = useApp();

  if (reports.length === 0) {
    return (
      <Card className="h-full">
        <p className="text-[15px] font-semibold text-slate-900">
          {t("dashboard.todayQueue")}
        </p>
        <p className="mt-4 text-[13px] text-slate-600">{t("dashboard.queueEmpty")}</p>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col">
      <p className="text-[15px] font-semibold text-slate-900">
        {t("dashboard.todayQueue")}
      </p>
      <p className="mt-1 text-[13px] text-slate-600">{t("dashboard.todayQueueHint")}</p>
      <div className="relative mt-4 flex-1 space-y-0">
        <div className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-slate-100" />
        {reports.map((report, index) => {
          const selected = report.id === selectedId;
          const isLast = index === reports.length - 1;
          return (
            <button
              key={report.id}
              type="button"
              onClick={() => onOpen(report)}
              className={`relative flex w-full gap-3 pb-4 text-left ${isLast ? "" : ""}`}
            >
              <div
                className={`relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full border-2 ${
                  selected
                    ? "border-brand-blue bg-brand-blue"
                    : index === 0
                      ? "border-brand-orange bg-brand-orange"
                      : "border-brand-blue bg-white"
                }`}
              />
              <div
                className={`min-w-0 flex-1 rounded-[12px] border p-3 transition ${
                  selected
                    ? "border-brand-blue bg-brand-blue-soft"
                    : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                }`}
              >
                <p className="text-[11px] font-semibold text-slate-400">#{index + 1}</p>
                <p className="truncate text-[15px] font-semibold text-slate-900">
                  {report.location}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[15px] font-bold text-slate-900">
                    {report.riskScore}
                  </span>
                  <RiskBadge level={report.riskLevel} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
