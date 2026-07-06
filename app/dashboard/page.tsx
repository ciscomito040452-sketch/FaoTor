"use client";

import { useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { DetailSheet } from "@/components/DetailSheet";
import { EmptyState } from "@/components/EmptyState";
import { ReportTable } from "@/components/ReportTable";
import { StatCard } from "@/components/StatCard";
import { useReports } from "@/lib/reports-store";
import type { Report } from "@/lib/types";

export default function DashboardPage() {
  const { reports, updateStatus, isReady } = useReports();
  const [selected, setSelected] = useState<Report | null>(null);

  const stats = useMemo(
    () => ({
      total: reports.length,
      pending: reports.filter((r) => r.status === "รอดำเนินการ").length,
      severe: reports.filter((r) => r.riskLevel === "อุดตันหนัก").length,
    }),
    [reports]
  );

  if (!isReady) {
    return (
      <main className="mx-auto min-h-screen max-w-[1024px] px-6 py-8">
        <p className="text-slate-600">กำลังโหลด...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1024px] px-6 py-8">
      <AppHeader />
      <h1 className="mb-8 text-[34px] font-bold leading-[1.35] tracking-[-0.02em] text-slate-900">
        แดชบอร์ดเจ้าหน้าที่
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="ทั้งหมด" value={stats.total} />
        <StatCard label="รอดำเนินการ" value={stats.pending} />
        <StatCard label="อุดตันหนัก" value={stats.severe} />
      </div>

      {reports.length === 0 ? (
        <EmptyState />
      ) : (
        <ReportTable reports={reports} onSelect={setSelected} />
      )}

      <DetailSheet
        report={selected}
        onClose={() => setSelected(null)}
        onSave={updateStatus}
      />
    </main>
  );
}
