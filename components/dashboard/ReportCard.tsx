"use client";

import { forwardRef } from "react";
import type { Report } from "@/lib/types";
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

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onSelect(report)}
        className={`w-full rounded-[16px] border p-3 text-left transition hover:shadow-md ${
          isSelected
            ? "border-blue-500 bg-blue-50/40 shadow-[0_0_0_1px_#2f6fed] dark:bg-blue-900/10"
            : "border-slate-100 bg-white hover:border-slate-200 dark:bg-[var(--color-surface)]"
        } ${isPriority && !isSelected ? "border-l-4 border-l-risk-red-text" : ""}`}
      >
        <div className="flex gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={report.imageUrl}
            alt={report.location}
            className="h-20 w-20 shrink-0 rounded-[12px] object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                {queueRank != null && (
                  <span className="text-[12px] font-semibold text-slate-400">
                    #{queueRank}
                  </span>
                )}
                <p className="truncate text-[17px] font-semibold text-slate-900">
                  {report.location}
                </p>
                {report.district && (
                  <p className="text-[13px] text-slate-600">{report.district}</p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[22px] font-bold leading-none text-slate-900">
                  {report.riskScore}
                </p>
                <p className="text-[11px] text-slate-400">{t("report.riskScore")}</p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <RiskBadge level={report.riskLevel} />
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                {getStatusLabel(report.status, locale)}
              </span>
            </div>

            <p className="mt-2 text-[12px] text-slate-600">
              {formatTimeAgo(report.createdAt, locale)}
            </p>
          </div>
        </div>
      </button>
    );
  }
);
