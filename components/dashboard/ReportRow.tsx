"use client";

import type { Report } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { getStatusLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { RiskBadge } from "@/components/RiskBadge";

interface ReportRowProps {
  report: Report;
  onSelect: (report: Report) => void;
  isLast?: boolean;
  isPriority?: boolean;
}

export function ReportRow({ report, onSelect, isLast, isPriority }: ReportRowProps) {
  const { locale, t } = useApp();

  return (
    <button
      type="button"
      onClick={() => onSelect(report)}
      className={`flex min-h-[72px] w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-100/10 ${
        !isLast ? "border-b border-slate-100" : ""
      } ${isPriority ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={report.imageUrl}
        alt=""
        className="h-12 w-12 shrink-0 rounded-[8px] object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-[17px] font-semibold text-slate-900">
            {report.location}
          </p>
          {isPriority && (
            <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[11px] font-semibold text-white">
              {t("dashboard.priority")}
            </span>
          )}
        </div>
        <p className="text-[13px] text-slate-600">
          {report.district ? `${report.district} · ` : ""}
          {formatTimeAgo(report.createdAt, locale)}
        </p>
        <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
          {getStatusLabel(report.status, locale)}
        </span>
      </div>
      <span className="shrink-0 text-[17px] font-semibold text-slate-900">
        {report.riskScore}
      </span>
      <RiskBadge level={report.riskLevel} />
      <ChevronRight />
    </button>
  );
}

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0 text-slate-400"
      aria-hidden
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
