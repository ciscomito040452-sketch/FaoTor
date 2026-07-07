"use client";

import { forwardRef } from "react";
import type { Report } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { getStatusLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { STATUS_PILL, THUMB_RING } from "@/lib/status-colors";
import { MetricsBento } from "@/components/shared/MetricsBento";

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

    const meta = [report.district, formatTimeAgo(report.createdAt, locale)]
      .filter(Boolean)
      .join(" · ");

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onSelect(report)}
        className={`box-border w-full min-w-0 rounded-2xl p-3 text-left transition ${
          isSelected
            ? "bg-slate-50 ring-2 ring-brand-blue/40"
            : "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/70 hover:bg-slate-50/80 dark:bg-[var(--color-surface)]"
        }`}
      >
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={report.imageUrl}
            alt={report.location}
            className={`h-14 w-14 shrink-0 rounded-xl object-cover ring-2 ${THUMB_RING[report.riskLevel]}`}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
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
                  <p className="min-w-0 truncate text-[15px] font-semibold leading-tight tracking-tight text-slate-900">
                    {report.location}
                  </p>
                </div>
                {meta && (
                  <p className="mt-0.5 truncate text-[12px] text-slate-500">{meta}</p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${STATUS_PILL[report.status]}`}
                >
                  {getStatusLabel(report.status, locale)}
                </span>
                {isSelected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-brand-blue"
                    aria-hidden
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <MetricsBento
            riskScore={report.riskScore}
            riskLevel={report.riskLevel}
            urgencyScore={report.urgencyScore}
            rainForecast={report.rainForecast}
            rainChancePercent={report.rainChancePercent}
            scoreLabel={t("dashboard.cardRiskLabel")}
            variant="inline"
          />
        </div>
      </button>
    );
  }
);
