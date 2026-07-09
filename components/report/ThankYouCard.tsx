"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { AnalyzeResult } from "@/lib/types";
import { MetricsBento } from "@/components/shared/MetricsBento";
import { AiReasonCard } from "@/components/report/AiReasonCard";
import { useApp } from "@/lib/app-context";
import { FadeIn } from "@/components/ui/FadeIn";

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
      <FadeIn index={0}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue dark:bg-blue-900/30"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
            <motion.path
              d="M8 16l5 5 11-12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </svg>
        </motion.div>
      </FadeIn>
      <FadeIn index={1}>
        <div>
          <h2 className="text-[20px] font-semibold text-slate-900">{title}</h2>
          <p className="mt-1.5 text-[15px] text-slate-600">{body}</p>
        </div>
      </FadeIn>

      <FadeIn index={2}>
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
          <div className="mt-3">
            <AiReasonCard title={t("detail.aiReason")} body={result.reason} compact />
          </div>
        </div>
      </FadeIn>

      <Link
        href="/dashboard"
        className="flex h-[50px] items-center justify-center rounded-[12px] bg-brand-blue text-[17px] font-semibold text-white transition hover:bg-brand-blue-dark"
      >
        {dashboardLabel}
      </Link>
      <button
        type="button"
        onClick={onReset}
        className="pressable h-[50px] w-full rounded-[12px] border border-slate-100 bg-transparent text-[17px] font-semibold text-slate-900 hover:bg-slate-50"
      >
        {anotherLabel}
      </button>
    </div>
  );
}
