"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { Report } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { getStatusLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { STATUS_PILL, THUMB_RING_CLASS } from "@/lib/status-colors";
import { MetricFocusBlock } from "@/components/shared/MetricFocusBlock";
import { useReducedMotion } from "@/lib/motion";

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
    const reduced = useReducedMotion();

    const meta = [report.district, formatTimeAgo(report.createdAt, locale)]
      .filter(Boolean)
      .join(" · ");

    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={() => onSelect(report)}
        whileTap={reduced ? undefined : { scale: 0.99 }}
        className={`box-border grid min-h-[72px] w-full min-w-0 grid-cols-[96px_minmax(0,1fr)_minmax(0,252px)] items-center gap-x-3 overflow-hidden rounded-xl px-3 py-2.5 text-left ${
          isSelected
            ? "bg-brand-blue-soft/40 ring-2 ring-brand-blue/50"
            : "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/70 hover:bg-slate-50/80 dark:bg-[var(--color-surface)]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={report.imageUrl}
          alt={report.location}
          className={`h-[56px] w-[96px] shrink-0 self-center rounded-[10px] object-cover ${THUMB_RING_CLASS}`}
        />

        <div className="min-w-0 py-0.5">
          {isPriority && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="animate-pulse-once mb-1 inline-flex rounded-md bg-brand-orange-soft px-1.5 py-0.5 text-[10px] font-semibold text-brand-orange-dark"
            >
              {t("dashboard.priority")}
            </motion.span>
          )}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center gap-1.5">
                {queueRank != null && (
                  <span className="shrink-0 text-[11px] font-semibold tabular-nums text-slate-400">
                    #{queueRank}
                  </span>
                )}
                <p className="min-w-0 truncate text-[16px] font-bold leading-snug tracking-tight text-slate-900">
                  {report.location}
                </p>
              </div>
              {meta && (
                <p className="mt-1 truncate text-[12px] text-slate-500">{meta}</p>
              )}
            </div>
            <span
              className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${STATUS_PILL[report.status]}`}
            >
              {getStatusLabel(report.status, locale)}
            </span>
          </div>
        </div>

        <MetricFocusBlock
          variant="list"
          riskScore={report.riskScore}
          riskLevel={report.riskLevel}
          urgencyScore={report.urgencyScore}
          rainForecast={report.rainForecast}
          rainChancePercent={report.rainChancePercent}
          scoreLabel={t("dashboard.cardRiskLabel")}
          className="min-w-0 justify-self-end"
        />
      </motion.button>
    );
  }
);
