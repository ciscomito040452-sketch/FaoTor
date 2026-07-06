"use client";

import { forwardRef } from "react";
import type { Report } from "@/lib/types";
import { RISK_RING } from "@/lib/risk-colors";
import { formatTimeAgo } from "@/lib/reports-store";
import { getStatusLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { RiskBadge } from "@/components/RiskBadge";
import { ScoreRing } from "@/components/ui/ScoreRing";

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

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onSelect(report)}
        className={`w-full rounded-[20px] border p-4 text-left transition ${
          isSelected
            ? "border-brand-blue bg-brand-blue-soft/40 shadow-[0_0_0_1px_#3b82f6]"
            : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm dark:bg-[var(--color-surface)]"
        } ${isPriority && !isSelected ? "border-l-[3px] border-l-brand-orange pl-[calc(1rem-1px)]" : ""}`}
      >
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={report.imageUrl}
            alt={report.location}
            className="h-[72px] w-[72px] shrink-0 rounded-[14px] border-2 object-cover"
            style={{ borderColor: `${RISK_RING[report.riskLevel]}66` }}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  {queueRank != null && (
                    <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                      #{queueRank}
                    </span>
                  )}
                  <p className="truncate text-[16px] font-bold tracking-tight text-slate-900">
                    {report.location}
                  </p>
                </div>
                {report.district && (
                  <p className="mt-0.5 truncate text-[13px] text-slate-500">
                    {report.district}
                  </p>
                )}
              </div>

              <ScoreRing
                value={report.riskScore}
                size={40}
                strokeColor={RISK_RING[report.riskLevel]}
              />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <RiskBadge level={report.riskLevel} compact />
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                {getStatusLabel(report.status, locale)}
              </span>
              <span className="rounded-full bg-brand-orange-soft px-2 py-0.5 text-[10px] font-semibold text-brand-orange-dark">
                {t("dashboard.cardUrgent").replace("{score}", String(urgency))}
              </span>
            </div>

            <div className="mt-1.5 flex items-center justify-between">
              <p className="text-[11px] text-slate-400">
                {formatTimeAgo(report.createdAt, locale)}
              </p>
              <span className={`text-[16px] text-brand-blue transition ${isSelected ? "opacity-100" : "opacity-50"}`}>
                ›
              </span>
            </div>
          </div>
        </div>
      </button>
    );
  }
);


