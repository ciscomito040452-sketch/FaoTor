"use client";

import { useEffect, useState } from "react";
import type { Report, ReportStatus, RiskLevel } from "@/lib/types";
import { formatTimeAgo } from "@/lib/reports-store";
import { useApp } from "@/lib/app-context";
import { getRainLabel, getStatusLabel } from "@/lib/labels";
import { RiskBadge } from "./RiskBadge";
import { StatusSegmented } from "./StatusSegmented";
import { ScoreRing } from "./ui/ScoreRing";
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
  compact?: boolean;
}

const RING_COLORS: Record<RiskLevel, string> = {
  ปกติ: "#6B7280",
  เริ่มอุดตัน: "#F97316",
  อุดตันหนัก: "#EF4444",
};

const METRIC_BG: Record<RiskLevel, string> = {
  ปกติ: "bg-slate-50",
  เริ่มอุดตัน: "bg-brand-orange-soft",
  อุดตันหนัก: "bg-risk-red-bg/40",
};

function urgencyRingColor(score: number): string {
  if (score >= 85) return "#EF4444";
  if (score >= 70) return "#F97316";
  return "#3B82F6";
}

export function ReportDetailContent({
  report,
  labels,
  onSave,
  onClose,
  compact = false,
}: ReportDetailContentProps) {
  const { locale, t } = useApp();
  const [status, setStatus] = useState<ReportStatus>("รอดำเนินการ");

  useEffect(() => {
    setStatus(report.status);
  }, [report]);

  const ringSize = compact ? 72 : 88;
  const urgencyScore = report.urgencyScore ?? null;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-brand-blue">
            {t("dashboard.detailTitle")}
          </p>
          <p
            className={`mt-1 font-semibold text-slate-900 ${compact ? "text-[18px]" : "text-[22px]"}`}
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
          className={`w-full object-cover ${compact ? "aspect-[16/10] max-h-[200px]" : "aspect-[16/10] max-h-[260px]"}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          className={`flex flex-col items-center rounded-[16px] border border-slate-100 p-4 ${METRIC_BG[report.riskLevel]}`}
        >
          <ScoreRing
            value={report.riskScore}
            size={ringSize}
            strokeColor={RING_COLORS[report.riskLevel]}
            label={labels.score}
          />
          <div className="mt-3">
            <RiskBadge level={report.riskLevel} />
          </div>
        </div>

        <div
          className={`flex flex-col items-center justify-center rounded-[16px] border border-slate-100 p-4 ${
            urgencyScore != null && urgencyScore >= 70
              ? "bg-brand-orange-soft"
              : "bg-brand-blue-soft"
          }`}
        >
          {urgencyScore != null ? (
            <ScoreRing
              value={urgencyScore}
              size={ringSize}
              strokeColor={urgencyRingColor(urgencyScore)}
              label={t("report.urgencyScore")}
              sublabel={
                report.rainForecast
                  ? `${t("report.rainForecast")}: ${getRainLabel(report.rainForecast, locale)}`
                  : undefined
              }
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-4 text-center">
              <p className="text-[28px] font-bold text-slate-300">—</p>
              <p className="mt-2 text-[12px] text-slate-500">
                {t("report.urgencyScore")}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[16px] bg-brand-blue-soft p-4">
        <p className="text-[13px] font-semibold text-brand-blue">
          {labels.aiReason}
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
          {report.reason}
        </p>
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
