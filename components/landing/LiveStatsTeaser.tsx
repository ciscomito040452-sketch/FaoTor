"use client";

import { useMemo } from "react";
import { useApp } from "@/lib/app-context";
import { useReports } from "@/lib/reports-store";
import { reportsByDay } from "@/lib/dashboard-analytics";
import { KpiCard } from "@/components/ui/KpiCard";

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

  const bars = useMemo(() => reportsByDay(reports, 7), [reports]);

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <KpiCard
        label={t("landing.stats.reports")}
        value={stats.total}
        chartType="bar"
        chartData={bars}
      />
      <KpiCard
        label={t("landing.stats.pending")}
        value={stats.pending}
        chartType="bar"
        chartData={bars}
      />
      <KpiCard
        label={t("landing.stats.severe")}
        value={stats.severe}
        chartType="sparkline"
        chartData={bars}
      />
    </div>
  );
}
