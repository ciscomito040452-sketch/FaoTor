"use client";

import Link from "next/link";
import type { AnalyzeResult } from "@/lib/types";
import { RiskBadge } from "@/components/RiskBadge";
import { RiskScore } from "@/components/RiskScore";
import { UrgencyBadge } from "@/components/shared/UrgencyBadge";

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
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue dark:bg-blue-900/30">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
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
        <h2 className="text-[22px] font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-[15px] text-slate-600">{body}</p>
      </div>

      <div className="rounded-[16px] border border-slate-100 bg-white p-6 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[var(--color-surface)]">
        <p className="text-[13px] text-slate-600">{location}</p>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <RiskScore
            score={result.riskScore}
            level={result.riskLevel}
            label={scoreLabel}
          />
          <RiskBadge level={result.riskLevel} />
        </div>
        <div className="mt-4">
          <UrgencyBadge score={result.urgencyScore} rain={result.rainForecast} compact />
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
