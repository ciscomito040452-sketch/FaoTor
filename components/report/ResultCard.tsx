import Link from "next/link";
import type { AnalyzeResult } from "@/lib/types";
import { RiskBadge } from "@/components/RiskBadge";
import { RiskScore } from "@/components/RiskScore";
import { UrgencyBadge } from "@/components/shared/UrgencyBadge";

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
  return (
    <div className="space-y-4">
      <div className="rounded-[16px] border border-slate-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[var(--color-surface)]">
        <div className="flex items-start justify-between gap-4">
          <RiskScore
            score={result.riskScore}
            level={result.riskLevel}
            label={scoreLabel}
            size="lg"
          />
          <RiskBadge level={result.riskLevel} />
        </div>
        <div className="mt-4">
          <UrgencyBadge score={result.urgencyScore} rain={result.rainForecast} compact />
        </div>
        <p className="mt-6 border-l-4 border-brand-blue pl-4 text-[15px] leading-[1.35] text-slate-600">
          {result.reason}
        </p>
        <p className="mt-4 text-[13px] text-slate-400">{location}</p>
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
