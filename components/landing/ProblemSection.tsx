"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useApp } from "@/lib/app-context";
import { useReports } from "@/lib/reports-store";

export function ProblemSection() {
  const { t } = useApp();
  const { reports } = useReports();

  const severeCount = useMemo(
    () => reports.filter((r) => r.riskLevel === "อุดตันหนัก").length,
    [reports]
  );

  return (
    <section className="bento-card mb-10 p-6">
      <h2 className="text-[22px] font-semibold text-slate-900">
        {t("landing.problem.title")}
      </h2>
      <p className="mt-3 text-[15px] leading-[1.5] text-slate-600">
        {t("landing.problem.body")}
      </p>
      <p className="mt-4 text-[17px] font-semibold text-slate-900">
        {severeCount} {t("landing.stats.severe")}
      </p>
      <Link
        href="/line"
        className="mt-4 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-brand-blue hover:text-brand-blue-dark"
      >
        {t("landing.problem.cta")} →
      </Link>
    </section>
  );
}
