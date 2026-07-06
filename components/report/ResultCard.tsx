"use client";

import Link from "next/link";
import type { AnalyzeResult } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { MetricsBento } from "@/components/shared/MetricsBento";

interface ResultCardProps {
  result: AnalyzeResult;
  location: string;
  scoreLabel: string;
  continueLabel: string;
  dashboardLabel: string;
  onContinue: () => void;
}

export function ResultCard({
  result,
  location,
  scoreLabel,
  continueLabel,
  dashboardLabel,
  onContinue,
}: ResultCardProps) {
  const { t } = useApp();

  return (
    <div className="space-y-4">
      <div className="rounded-[16px] border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[var(--color-surface)]">
        <MetricsBento
          riskScore={result.riskScore}
          riskLevel={result.riskLevel}
          urgencyScore={result.urgencyScore}
          rainForecast={result.rainForecast}
          scoreLabel={scoreLabel}
          variant="compact"
          className="!mt-0"
        />

        <p className="mt-2.5 text-[12px] font-medium text-slate-500">
          {t("report.urgencyExplain")}
        </p>

        <div className="mt-4 rounded-[14px] border border-slate-200/80 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold tracking-tight text-slate-900">
              {t("detail.aiReason")}
            </p>
            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
              AI
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-slate-600">{result.reason}</p>
        </div>
        <p className="mt-3 text-[13px] text-slate-400">{location}</p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="h-[50px] w-full rounded-[12px] bg-brand-blue text-[17px] font-semibold text-white hover:bg-brand-blue-dark"
      >
        {continueLabel}
      </button>
      <Link
        href="/dashboard"
        className="flex h-[50px] items-center justify-center rounded-[12px] border border-slate-100 text-[17px] font-semibold text-slate-900"
      >
        {dashboardLabel}
      </Link>
    </div>
  );
}
