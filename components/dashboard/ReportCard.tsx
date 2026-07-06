"use client";

import { forwardRef } from "react";
import type { Report } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { getRainLabel, getStatusLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { RiskBadge } from "@/components/RiskBadge";
import { MetricTile } from "@/components/ui/MetricTile";

interface ReportCardProps {
  report: Report;
  onSelect: (report: Report) => void;
  isSelected?: boolean;
  isPriority?: boolean;
  queueRank?: number;
}

export const ReportCard = forwardRef<HTMLButtonElement, ReportCardProps>(
  function ReportCard(
    { report, onSelect, isSelected, isPriority, queueRank },
    ref
  ) {
    const { locale, t } = useApp();
    const urgency = report.urgencyScore ?? null;
    const showUrgency = urgency != null && urgency >= 70;

    const meta = [report.district, formatTimeAgo(report.createdAt, locale)]
      .filter(Boolean)
      .join(" · ");

    const riskTone =
      report.riskLevel === "อุดตันหนัก"
        ? "risk"
        : report.riskLevel === "เริ่มอุดตัน"
          ? "urgency"
          : "neutral";

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onSelect(report)}
        className={`box-border w-full min-w-0 rounded-2xl p-3.5 text-left transition ${
          isSelected
            ? "bg-slate-50 ring-2 ring-brand-blue/40"
            : "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/70 hover:bg-slate-50/80 dark:bg-[var(--color-surface)]"
        }`}
      >
        <div className="flex gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={report.imageUrl}
            alt={report.location}
            className="h-14 w-14 shrink-0 rounded-xl object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              {queueRank != null && (
                <span className="shrink-0 text-[11px] font-semibold tabular-nums text-slate-400">
                  #{queueRank}
                </span>
              )}
              {isPriority && (
                <span className="shrink-0 rounded-md bg-brand-orange-soft px-1.5 py-0.5 text-[10px] font-semibold text-brand-orange-dark">
                  {t("dashboard.priority")}
                </span>
              )}
              <p className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-tight tracking-tight text-slate-900">
                {report.location}
              </p>
            </div>
            {meta && (
              <p className="mt-0.5 truncate text-[12px] text-slate-500">{meta}</p>
            )}

            <div className="mt-2.5 flex gap-2">
              <MetricTile
                label={t("dashboard.cardRiskLabel")}
                value={report.riskScore}
                tone={riskTone}
              >
                <RiskBadge level={report.riskLevel} compact />
              </MetricTile>
              {showUrgency && (
                <MetricTile
                  label={t("dashboard.cardUrgencyLabel")}
                  value={urgency}
                  tone="urgency"
                >
                  {report.rainForecast && (
                    <p className="truncate text-[10px] font-medium text-slate-600">
                      {t("report.rainForecast")}:{" "}
                      {getRainLabel(report.rainForecast, locale)}
                    </p>
                  )}
                </MetricTile>
              )}
            </div>

            <div className="mt-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {getStatusLabel(report.status, locale)}
              </span>
            </div>
          </div>
        </div>
      </button>
    );
  }
);
