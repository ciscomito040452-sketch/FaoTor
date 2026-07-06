"use client";

import { useEffect, useState } from "react";
import type { Report, ReportStatus } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { useApp } from "@/lib/app-context";
import { getRainLabel, getStatusLabel } from "@/lib/labels";
import { RiskBadge } from "./RiskBadge";
import { StatusSegmented } from "./StatusSegmented";
import { ScoreRing } from "./ui/ScoreRing";
import { Button } from "./ui/Button";
import {
  RISK_METRIC_BG,
  RISK_RING,
  urgencyRingColor,
} from "@/lib/risk-colors";

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
  showSaveButton?: boolean;
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
  showSaveButton = true,
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

  const ringSize = compact ? 64 : 96;
  const urgencyScore = report.urgencyScore ?? null;

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
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
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {report.district && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-600">
                {report.district}
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] text-slate-500">
              {formatTimeAgo(report.createdAt, locale)}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-600">
              {getStatusLabel(report.status, locale)}
            </span>
          </div>
          {onViewOnMap && (
            <button
              type="button"
              onClick={() => onViewOnMap(report)}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-brand-blue-soft px-3 py-1 text-[12px] font-semibold text-brand-blue hover:bg-brand-blue-soft/70"
            >
              <svg
                width="14"
                height="14"
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

      <div className="overflow-hidden rounded-[16px] border border-slate-100 bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={report.imageUrl}
          alt={report.location}
          className={`w-full object-cover ${compact ? "aspect-[16/10] max-h-[150px]" : "aspect-[16/10] max-h-[270px]"}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div
          className={`flex flex-col items-center rounded-[14px] border border-slate-100 p-3 ${RISK_METRIC_BG[report.riskLevel]}`}
        >
          <p className="w-full text-[12px] font-semibold text-slate-700">
            {labels.score}
          </p>
          <div className="mt-2 flex flex-col items-center">
            <ScoreRing
              value={report.riskScore}
              size={ringSize}
              strokeColor={RISK_RING[report.riskLevel]}
            />
            <div className="mt-2">
              <RiskBadge level={report.riskLevel} compact />
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col items-center rounded-[14px] border border-slate-100 p-3 ${
            urgencyScore != null && urgencyScore >= 70
              ? "bg-brand-orange-soft"
              : "bg-brand-blue-soft"
          }`}
        >
          <p className="w-full text-[12px] font-semibold text-slate-700">
            {t("report.urgencyScore")}
          </p>
          {urgencyScore != null ? (
            <div className="mt-2 flex flex-col items-center">
              <ScoreRing
                value={urgencyScore}
                size={ringSize}
                strokeColor={urgencyRingColor(urgencyScore)}
              />
              {report.rainForecast && (
                <p className="mt-2 max-w-full truncate rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                  {t("report.rainForecast")}: {getRainLabel(report.rainForecast, locale)}
                </p>
              )}
            </div>
          ) : (
            <div className="mt-2 flex items-center justify-center py-4 text-center">
              <p className="text-[13px] text-slate-500">
                {t("report.urgencyScore")} ?
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[16px] border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
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
          className={`mt-2.5 leading-[1.5] text-slate-600 ${compact ? "text-[13px]" : "text-[15px]"}`}
        >
          {report.reason}
        </p>
      </div>

      <div className="rounded-[14px] border border-slate-100 bg-slate-50/80 p-3.5">
        <p className="mb-3 text-[13px] font-semibold text-slate-700">
          {labels.changeStatus}
        </p>
        <StatusSegmented value={status} onChange={setStatus} />
      </div>

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
