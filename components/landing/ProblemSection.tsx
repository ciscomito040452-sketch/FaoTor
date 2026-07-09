"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/app-context";
import { useReports } from "@/lib/reports-store";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useReducedMotion } from "@/lib/motion";

export function ProblemSection() {
  const { t } = useApp();
  const { reports } = useReports();
  const reduced = useReducedMotion();

  const severeCount = useMemo(
    () => reports.filter((r) => r.riskLevel === "อุดตันหนัก").length,
    [reports]
  );

  return (
    <FadeIn index={0}>
      <section className="bento-card mb-10 p-6">
        <h2 className="text-[22px] font-semibold text-slate-900">
          {t("landing.problem.title")}
        </h2>
        <p className="mt-3 text-[15px] leading-[1.5] text-slate-600">
          {t("landing.problem.body")}
        </p>
        <p className="mt-4 text-[17px] font-semibold text-slate-900">
          <AnimatedCounter value={severeCount} /> {t("landing.stats.severe")}
        </p>
        <motion.div whileTap={reduced ? undefined : { scale: 0.98 }}>
          <Link
            href="/line"
            className="mt-4 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-brand-blue hover:text-brand-blue-dark"
          >
            {t("landing.problem.cta")} →
          </Link>
        </motion.div>
      </section>
    </FadeIn>
  );
}
