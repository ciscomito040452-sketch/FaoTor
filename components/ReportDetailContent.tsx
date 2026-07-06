"use client";

import { useEffect, useState } from "react";
import type { Report, ReportStatus } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { useApp } from "@/lib/app-context";
import { RiskBadge } from "./RiskBadge";
import { RiskScore } from "./RiskScore";
import { StatusSegmented } from "./StatusSegmented";
import { UrgencyBadge } from "./shared/UrgencyBadge";

export interface ReportDetailLabels {
  location: string;
  aiReason: string;
  changeStatus: string;
  save: string;
  score: string;
  close?: string;
}

interface ReportDetailContentProps {
  report: Report;
  labels: ReportDetailLabels;
  onSave: (id: string, status: ReportStatus) => void;
  onClose?: () => void;
  compact?: boolean;
}

export function ReportDetailContent({
  report,
  labels,
  onSave,
  onClose,
  compact = false,
}: ReportDetailContentProps) {
  const { locale } = useApp();
  const [status, setStatus] = useState<ReportStatus>("รอดำเนินการ");

  useEffect(() => {
    setStatus(report.status);
  }, [report]);

  return (
    <>
      {onClose && (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[13px] text-slate-600">{labels.location}</p>
            <p
              className={`mt-1 font-semibold text-slate-900 ${compact ? "text-[17px]" : "text-[22px]"}`}
            >
              {report.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
            aria-label={labels.close ?? "Close"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {!onClose && (
        <>
          <p className="text-[13px] text-slate-600">{labels.location}</p>
          <p className="mt-1 text-[22px] font-semibold text-slate-900">
            {report.location}
          </p>
        </>
      )}

      {report.district && (
        <p className="mt-1 text-[13px] text-slate-600">{report.district}</p>
      )}
      <p className="mt-1 text-[13px] text-slate-400">
        {formatTimeAgo(report.createdAt, locale)}
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={report.imageUrl}
        alt={report.location}
        className={`mt-4 w-full rounded-[12px] object-cover ${compact ? "max-h-[140px]" : "max-h-[240px]"}`}
      />

      <div className={`flex items-start justify-between gap-4 ${compact ? "mt-4" : "mt-6"}`}>
        <RiskScore
          score={report.riskScore}
          level={report.riskLevel}
          label={labels.score}
        />
        <RiskBadge level={report.riskLevel} />
      </div>

      {report.urgencyScore != null && (
        <div className="mt-4">
          <UrgencyBadge
            score={report.urgencyScore}
            rain={report.rainForecast}
            compact
          />
        </div>
      )}

      <div
        className={`rounded-[12px] border-l-4 border-blue-500 bg-blue-50/50 p-4 dark:bg-blue-900/10 ${compact ? "mt-4" : "mt-6"}`}
      >
        <p className="mb-2 text-[13px] font-semibold text-slate-600">
          {labels.aiReason}
        </p>
        <p className="text-[15px] text-slate-600">{report.reason}</p>
      </div>

      <p className={`mb-3 text-[13px] text-slate-600 ${compact ? "mt-4" : "mt-6"}`}>
        {labels.changeStatus}
      </p>
      <StatusSegmented value={status} onChange={setStatus} />

      <button
        type="button"
        onClick={() => onSave(report.id, status)}
        className={`w-full rounded-[12px] bg-blue-500 font-semibold text-white hover:bg-blue-700 ${compact ? "mt-4 h-[44px] text-[15px]" : "mt-6 h-[50px] text-[17px]"}`}
      >
        {labels.save}
      </button>
    </>
  );
}
