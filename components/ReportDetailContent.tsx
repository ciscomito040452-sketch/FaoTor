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
}

export function ReportDetailContent({
  report,
  labels,
  onSave,
  onClose,
  onViewOnMap,
  compact = false,
}: ReportDetailContentProps) {
  const { locale, t } = useApp();
  const [status, setStatus] = useState<ReportStatus>(report.status);

  useEffect(() => {
    setStatus(report.status);
  }, [report]);

  const ringSize = compact ? 86 : 96;
  const urgencyScore = report.urgencyScore ?? null;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-brand-blue">
            {t("dashboard.detailTitle")}
          </p>
          <p
            className={`mt-1 font-bold text-slate-900 ${compact ? "text-[22px]" : "text-[24px]"}`}
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
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue-soft px-3 py-1 text-[12px] font-semibold text-brand-blue hover:bg-brand-blue-soft/70"
            >
              <span aria-hidden>??</span>
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
          className={`w-full object-cover ${compact ? "aspect-[16/10] max-h-[210px]" : "aspect-[16/10] max-h-[270px]"}`}
        />
      </div>

      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
        <div
          className={`rounded-[16px] border border-slate-100 p-4 ${RISK_METRIC_BG[report.riskLevel]}`}
        >
          <p className="text-[13px] font-semibold text-slate-700">{labels.score}</p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-[32px] font-bold leading-none text-slate-900">
                {report.riskScore}
              </p>
              <div className="mt-2">
                <RiskBadge level={report.riskLevel} />
              </div>
            </div>
            <ScoreRing
              value={report.riskScore}
              size={ringSize}
              strokeColor={RISK_RING[report.riskLevel]}
            />
          </div>
        </div>

        <div
          className={`rounded-[16px] border border-slate-100 p-4 ${
            urgencyScore != null && urgencyScore >= 70
              ? "bg-brand-orange-soft"
              : "bg-brand-blue-soft"
          }`}
        >
          <p className="text-[13px] font-semibold text-slate-700">
            {t("report.urgencyScore")}
          </p>
          {urgencyScore != null ? (
            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-[32px] font-bold leading-none text-slate-900">
                  {urgencyScore}
                </p>
                {report.rainForecast && (
                  <p className="mt-2 rounded-full bg-white/80 px-2.5 py-1 text-[12px] font-medium text-slate-700">
                    {t("report.rainForecast")}: {getRainLabel(report.rainForecast, locale)}
                  </p>
                )}
              </div>
              <ScoreRing
                value={urgencyScore}
                size={ringSize}
                strokeColor={urgencyRingColor(urgencyScore)}
              />
            </div>
          ) : (
            <div className="mt-3 flex items-center justify-center py-6 text-center">
              <p className="text-[14px] text-slate-500">{t("report.urgencyScore")} —</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[16px] border-l-4 border-brand-blue bg-gradient-to-br from-brand-blue-soft to-white p-4">
        <p className="text-[15px] font-bold text-brand-blue">{labels.aiReason}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{report.reason}</p>
      </div>

      <div className="rounded-[16px] border border-slate-100 bg-slate-50/80 p-4">
        <p className="mb-3 text-[13px] font-semibold text-slate-700">
          {labels.changeStatus}
        </p>
        <StatusSegmented value={status} onChange={setStatus} />
      </div>

      <Button
        variant="primary"
        className="w-full"
        onClick={() => onSave(report.id, status)}
      >
        {labels.save}
      </Button>
    </div>
  );
}

