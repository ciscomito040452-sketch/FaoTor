"use client";

import { useMemo } from "react";
import { useApp } from "@/lib/app-context";
import { useReports } from "@/lib/reports-store";

export function LiveStatsTeaser() {
  const { t } = useApp();
  const { reports } = useReports();

  const stats = useMemo(
    () => ({
      total: reports.length,
      pending: reports.filter((r) => r.status === "รอดำเนินการ").length,
      severe: reports.filter((r) => r.riskLevel === "อุดตันหนัก").length,
    }),
    [reports]
  );

  const items = [
    { label: t("landing.stats.reports"), value: stats.total },
    { label: t("landing.stats.pending"), value: stats.pending },
    { label: t("landing.stats.severe"), value: stats.severe, danger: true },
  ];

  return (
    <div className="mb-8 grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-[16px] border border-slate-100 p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
            item.danger && item.value > 0
              ? "bg-risk-red-bg/40"
              : "bg-white dark:bg-[var(--color-surface)]"
          }`}
        >
          <p className="text-[13px] text-slate-600">{item.label}</p>
          <p className="mt-2 text-[28px] font-semibold text-slate-900">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
