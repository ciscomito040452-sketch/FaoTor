"use client";

import { useEffect, useState } from "react";
import type { Report, ReportStatus } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { useApp } from "@/lib/app-context";
import { getStatusLabel } from "@/lib/labels";
import { computeUrgencyScore, resolveRainForecast } from "@/lib/mock-weather";
import { STATUS_PILL } from "@/lib/status-colors";
import {
  MetricsBento,
  type MetricsBentoVariant,
} from "@/components/shared/MetricsBento";
import { StatusSegmented } from "./StatusSegmented";
import { Button } from "./ui/Button";

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
  onViewOnMap?: (report: Report) => void;
  compact?: boolean;
  metricsVariant?: MetricsBentoVariant;
  showSaveButton?: boolean;
  showStatusSection?: boolean;
  status?: ReportStatus;
  onStatusChange?: (status: ReportStatus) => void;
}

export function ReportDetailContent({
  report,
  labels,
  onSave,
  onClose,
  onViewOnMap,
  compact = false,
  metricsVariant,
  showSaveButton = true,
  showStatusSection = true,
  status: controlledStatus,
  onStatusChange,
}: ReportDetailContentProps) {
  const { locale, t } = useApp();
  const [internalStatus, setInternalStatus] = useState<ReportStatus>(report.status);
  const status = controlledStatus ?? internalStatus;

  function setStatus(next: ReportStatus) {
    if (onStatusChange) onStatusChange(next);
    else setInternalStatus(next);
  }

  useEffect(() => {
    if (onStatusChange) onStatusChange(report.status);
    else setInternalStatus(report.status);
  }, [report.id, report.status, onStatusChange]);

  const rainForecast = resolveRainForecast(report.rainForecast);
  const urgencyScore =
    report.urgencyScore ?? computeUrgencyScore(report.riskScore, rainForecast);
  const bentoVariant: MetricsBentoVariant =
    metricsVariant ?? (compact ? "compact" : "panel");

  return (
    <div className={compact ? "space-y-2.5" : "space-y-4"}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-brand-blue">
            {t("dashboard.detailTitle")}
          </p>
          <p
            className={`mt-1 font-bold text-slate-900 ${compact ? "text-[18px] leading-snug" : "text-[24px]"}`}
          >
            {report.location}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {report.district && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {report.district}
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
              {formatTimeAgo(report.createdAt, locale)}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${STATUS_PILL[status]}`}
            >
              {getStatusLabel(status, locale)}
            </span>
          </div>
          {onViewOnMap && (
            <button
              type="button"
              onClick={() => onViewOnMap(report)}
              className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-brand-blue hover:bg-slate-50"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {t("detail.viewOnMap")}
            </button>
          )}
        </div>
        {onClose && (
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
        )}
      </div>

      <div className="overflow-hidden rounded-[14px] border border-slate-100 bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={report.imageUrl}
          alt={report.location}
          className={`w-full object-cover ${compact ? "aspect-[16/9] max-h-[120px]" : "aspect-[16/10] max-h-[270px]"}`}
        />
      </div>

      <MetricsBento
        riskScore={report.riskScore}
        riskLevel={report.riskLevel}
        urgencyScore={urgencyScore}
        rainForecast={rainForecast}
        rainChancePercent={report.rainChancePercent}
        scoreLabel={labels.score}
        variant={bentoVariant}
      />

      <div className="rounded-[14px] border border-slate-200/80 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-semibold tracking-tight text-slate-900 ${compact ? "text-[13px]" : "text-[14px]"}`}
          >
            {labels.aiReason}
          </p>
          <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
            AI
          </span>
        </div>
        <p
          className={`mt-2 leading-[1.5] text-slate-600 ${compact ? "text-[13px]" : "text-[15px]"}`}
        >
          {report.reason}
        </p>
      </div>

      {showStatusSection && (
        <div className="rounded-[14px] border border-slate-100 bg-slate-50/80 p-3.5">
          <p className="mb-3 text-[13px] font-semibold text-slate-700">
            {labels.changeStatus}
          </p>
          <StatusSegmented value={status} onChange={setStatus} />
        </div>
      )}

      {showSaveButton && (
        <Button
          variant="primary"
          className="w-full"
          onClick={() => onSave(report.id, status)}
        >
          {labels.save}
        </Button>
      )}
    </div>
  );
}
