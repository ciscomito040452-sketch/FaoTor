"use client";

import { forwardRef } from "react";
import type { Report } from "@/lib/types";
import { RISK_BADGE, RISK_RING } from "@/lib/risk-colors";
import { formatTimeAgo } from "@/lib/reports-store";
import { getStatusLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { RiskBadge } from "@/components/RiskBadge";

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
    const urgency = report.urgencyScore ?? report.riskScore;
    const riskStyle = RISK_BADGE[report.riskLevel];
    const ringColor = RISK_RING[report.riskLevel];

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
            ? "bg-slate-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
            : "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/70 hover:bg-slate-50/80 dark:bg-[var(--color-surface)]"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={report.imageUrl}
            alt={report.location}
            className="h-14 w-14 shrink-0 rounded-xl object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-1.5">
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
                  <p className="truncate text-[15px] font-semibold leading-tight tracking-tight text-slate-900">
                    {report.location}
                  </p>
                </div>
                {meta && (
                  <p className="mt-0.5 truncate text-[12px] text-slate-500">{meta}</p>
                )}
              </div>

              <div
                className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${ringColor}18`,
                  boxShadow: `inset 0 0 0 2px ${ringColor}`,
                }}
              >
                <span className="text-[13px] font-bold leading-none text-slate-900">
                  {report.riskScore}
                </span>
              </div>
            </div>

            <div className="mt-2 flex min-w-0 flex-wrap items-center gap-1.5">
              <RiskBadge level={report.riskLevel} compact />
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {getStatusLabel(report.status, locale)}
              </span>
              {urgency >= 70 && (
                <span
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${riskStyle.bg} ${riskStyle.text}`}
                >
                  {t("dashboard.cardUrgent").replace("{score}", String(urgency))}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    );
  }
);
