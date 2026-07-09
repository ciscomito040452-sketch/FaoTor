"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AnalyzeResult } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { MetricsBento } from "@/components/shared/MetricsBento";
import { AiReasonCard } from "@/components/report/AiReasonCard";
import { FadeIn } from "@/components/ui/FadeIn";

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
      <FadeIn index={0}>
        <div className="rounded-[16px] border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[var(--color-surface)]">
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

          <p className="mt-2.5 text-[12px] font-medium text-slate-500">
            {t("report.urgencyExplain")}
          </p>

          <FadeIn index={2} className="mt-4">
            <AiReasonCard title={t("detail.aiReason")} body={result.reason} compact />
          </FadeIn>
          <p className="mt-3 text-[13px] text-slate-400">{location}</p>
        </div>
      </FadeIn>

      <motion.button
        type="button"
        onClick={onContinue}
        whileTap={{ scale: 0.98 }}
        className="h-[50px] w-full rounded-[12px] bg-brand-blue text-[17px] font-semibold text-white hover:bg-brand-blue-dark"
      >
        {continueLabel}
      </motion.button>
      <Link
        href="/dashboard"
        className="flex h-[50px] items-center justify-center rounded-[12px] border border-slate-100 text-[17px] font-semibold text-slate-900 transition hover:bg-slate-50"
      >
        {dashboardLabel}
      </Link>
    </div>
  );
}
