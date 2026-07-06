"use client";

import type { Report } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { RiskBadge } from "./RiskBadge";

interface ReportTableProps {
  reports: Report[];
  onSelect: (report: Report) => void;
}

export function ReportTable({ reports, onSelect }: ReportTableProps) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {reports.map((report, index) => (
        <button
          key={report.id}
          type="button"
          onClick={() => onSelect(report)}
          className={`flex min-h-[64px] w-full items-center gap-4 px-4 py-3 text-left transition hover:bg-slate-50 ${
            index < reports.length - 1 ? "border-b border-slate-100" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={report.imageUrl}
            alt=""
            className="h-12 w-12 shrink-0 rounded-[8px] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[17px] font-semibold text-slate-900">
              {report.location}
            </p>
            <p className="text-[13px] text-slate-600">
              {formatTimeAgo(report.createdAt)}
            </p>
          </div>
          <RiskBadge level={report.riskLevel} />
          <ChevronRight />
        </button>
      ))}
    </div>
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
        strokeLinejoin="round"
      />
    </svg>
  );
}
