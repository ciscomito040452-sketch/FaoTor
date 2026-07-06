"use client";

import { forwardRef } from "react";
import type { Report, RiskLevel } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { getStatusLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { RiskBadge } from "@/components/RiskBadge";
import { ScoreRing } from "@/components/ui/ScoreRing";

const RING_COLORS: Record<RiskLevel, string> = {
  ปกติ: "#6B7280",
  เริ่มอุดตัน: "#F97316",
  อุดตันหนัก: "#EF4444",
};

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
    const { locale } = useApp();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onSelect(report)}
        className={`w-full rounded-[16px] border p-3 text-left transition hover:shadow-md ${
          isSelected
            ? "border-brand-blue bg-brand-blue-soft shadow-[0_0_0_1px_#3b82f6]"
            : "border-slate-100 bg-white hover:border-slate-200 dark:bg-[var(--color-surface)]"
        } ${isPriority && !isSelected ? "border-l-4 border-l-brand-orange" : ""}`}
      >
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={report.imageUrl}
            alt={report.location}
            className="h-[72px] w-[72px] shrink-0 rounded-[12px] object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {queueRank != null && (
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                  #{queueRank}
                </span>
              )}
              <p className="truncate text-[15px] font-semibold text-slate-900">
                {report.location}
              </p>
            </div>
            {report.district && (
              <p className="mt-0.5 truncate text-[12px] text-slate-500">
                {report.district}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <RiskBadge level={report.riskLevel} />
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                {getStatusLabel(report.status, locale)}
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              {formatTimeAgo(report.createdAt, locale)}
            </p>
          </div>

          <div className="shrink-0">
            <ScoreRing
              value={report.riskScore}
              size={52}
              strokeColor={RING_COLORS[report.riskLevel]}
            />
          </div>
        </div>
      </button>
    );
  }
);
