"use client";

import Link from "next/link";
import type { AnalyzeResult } from "@/lib/types";
import { MetricsBento } from "@/components/shared/MetricsBento";
import { useApp } from "@/lib/app-context";

interface ThankYouCardProps {
  result: AnalyzeResult;
  location: string;
  title: string;
  body: string;
  scoreLabel: string;
  dashboardLabel: string;
  anotherLabel: string;
  onReset: () => void;
}

export function ThankYouCard({
  result,
  location,
  title,
  body,
  scoreLabel,
  dashboardLabel,
  anotherLabel,
  onReset,
}: ThankYouCardProps) {
  const { t } = useApp();

  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue dark:bg-blue-900/30">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path
            d="M8 16l5 5 11-12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-[20px] font-semibold text-slate-900">{title}</h2>
        <p className="mt-1.5 text-[15px] text-slate-600">{body}</p>
      </div>

      <div className="rounded-[16px] border border-slate-100 bg-white p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[var(--color-surface)]">
        <p className="text-[13px] text-slate-600">{location}</p>
        <div className="mt-3">
          <MetricsBento
            riskScore={result.riskScore}
            riskLevel={result.riskLevel}
            urgencyScore={result.urgencyScore}
            rainForecast={result.rainForecast}
            rainChancePercent={result.rainChancePercent}
            scoreLabel={scoreLabel}
            variant="panel"
            className="!mt-0"
          />
        </div>
        <div className="mt-3 rounded-[12px] border border-slate-200/80 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold tracking-tight text-slate-900">
              {t("detail.aiReason")}
            </p>
            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
              AI
            </span>
          </div>
          <p className="mt-1.5 text-[13px] leading-[1.45] text-slate-600">{result.reason}</p>
        </div>
      </div>

      <Link
        href="/dashboard"
        className="flex h-[50px] items-center justify-center rounded-[12px] bg-brand-blue text-[17px] font-semibold text-white hover:bg-brand-blue-dark"
      >
        {dashboardLabel}
      </Link>
      <button
        type="button"
        onClick={onReset}
        className="h-[50px] w-full rounded-[12px] border border-slate-100 bg-transparent text-[17px] font-semibold text-slate-900"
      >
        {anotherLabel}
      </button>
    </div>
  );
}
