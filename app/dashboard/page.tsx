"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DetailSheet } from "@/components/DetailSheet";
import { EmptyState } from "@/components/EmptyState";
import { StatCard } from "@/components/StatCard";
import { FilterTabs, type Filter } from "@/components/dashboard/FilterTabs";
import { MapPreviewCard } from "@/components/dashboard/MapPreviewCard";
import { ReportCard } from "@/components/dashboard/ReportCard";
import { TodayQueue } from "@/components/dashboard/TodayQueue";
import { ReportDetailPanel } from "@/components/dashboard/ReportDetailPanel";
import {
  DashboardToolbar,
  type SortOption,
} from "@/components/dashboard/DashboardToolbar";
import { useApp } from "@/lib/app-context";
import { useReports } from "@/lib/reports-store";
import type { Report, ReportStatus } from "@/lib/types";

function sortReports(list: Report[], sort: SortOption): Report[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "urgencyDesc":
      return copy.sort(
        (a, b) =>
          (b.urgencyScore ?? b.riskScore) - (a.urgencyScore ?? a.riskScore)
      );
    case "riskDesc":
    default:
      return copy.sort((a, b) => b.riskScore - a.riskScore);
  }
}

export default function DashboardPage() {
  const { t, showToast } = useApp();
  const { reports, updateStatus, isReady } = useReports();
  const [selected, setSelected] = useState<Report | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortOption>("riskDesc");
  const [search, setSearch] = useState("");
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const stats = useMemo(
    () => ({
      total: reports.length,
      pending: reports.filter((r) => r.status === "รอดำเนินการ").length,
      inProgress: reports.filter((r) => r.status === "กำลังแก้ไข").length,
      severe: reports.filter((r) => r.riskLevel === "อุดตันหนัก").length,
    }),
    [reports]
  );

  const filterCounts = useMemo(
    () => ({
      all: reports.length,
      pending: stats.pending,
      inProgress: stats.inProgress,
      severe: stats.severe,
    }),
    [reports.length, stats.pending, stats.inProgress, stats.severe]
  );

  const todayQueue = useMemo(() => {
    const pending = reports.filter((r) => r.status === "รอดำเนินการ");
    return sortReports(pending, "urgencyDesc").slice(0, 3);
  }, [reports]);

  const queueRankById = useMemo(() => {
    const map = new Map<string, number>();
    todayQueue.forEach((r, i) => map.set(r.id, i + 1));
    return map;
  }, [todayQueue]);

  const topUrgentId = todayQueue[0]?.id ?? null;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...reports];
    if (filter === "pending") {
      list = list.filter((r) => r.status === "รอดำเนินการ");
    } else if (filter === "inProgress") {
      list = list.filter((r) => r.status === "กำลังแก้ไข");
    } else if (filter === "severe") {
      list = list.filter((r) => r.riskLevel === "อุดตันหนัก");
    }
    if (q) {
      list = list.filter(
        (r) =>
          r.location.toLowerCase().includes(q) ||
          (r.district?.toLowerCase().includes(q) ?? false)
      );
    }
    return sortReports(list, sort);
  }, [reports, filter, search, sort]);

  const isFilteredEmpty = filtered.length === 0 && reports.length > 0;

  useEffect(() => {
    if (!selected?.id) return;
    const el = cardRefs.current[selected.id];
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selected?.id]);

  function handleSave(id: string, status: ReportStatus) {
    updateStatus(id, status);
    showToast(t("toast.saved"));
    setSelected((prev) =>
      prev?.id === id ? { ...prev, status } : prev
    );
  }

  function handleSelect(report: Report) {
    setSelected(report);
  }

  function handleStatClick(next: Filter) {
    setFilter((current) => (current === next ? "all" : next));
  }

  function clearFilters() {
    setFilter("all");
    setSearch("");
  }

  const detailLabels = {
    location: t("detail.location"),
    aiReason: t("detail.aiReason"),
    changeStatus: t("detail.changeStatus"),
    save: t("detail.save"),
    score: t("report.riskScore"),
    close: t("common.close"),
  };

  if (!isReady) {
    return (
      <AppShell title={t("dashboard.title")} showBack variant="dashboard">
        <p className="text-slate-600">{t("common.loading")}</p>
      </AppShell>
    );
  }

  return (
    <AppShell title={t("dashboard.title")} showBack largeTitle variant="dashboard">
      <p className="-mt-4 mb-6 text-[13px] text-slate-600">
        {t("dashboard.updated")}
      </p>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatCard
          label={t("dashboard.statTotal")}
          value={stats.total}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <StatCard
          label={t("dashboard.statPending")}
          value={stats.pending}
          active={filter === "pending"}
          onClick={() => handleStatClick("pending")}
        />
        <StatCard
          label={t("dashboard.statInProgress")}
          value={stats.inProgress}
          variant="warning"
          active={filter === "inProgress"}
          onClick={() => handleStatClick("inProgress")}
        />
        <StatCard
          label={t("dashboard.statSevere")}
          value={stats.severe}
          variant="danger"
          active={filter === "severe"}
          onClick={() => handleStatClick("severe")}
        />
      </div>

      <TodayQueue
        reports={todayQueue}
        onOpen={handleSelect}
        selectedId={selected?.id ?? null}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <section className="xl:col-span-7">
          <MapPreviewCard
            title={t("dashboard.mapTitle")}
            caption={t("dashboard.mapCaption")}
            reports={reports}
            selectedId={selected?.id ?? null}
            pinCount={reports.length}
            onPinClick={handleSelect}
          />
        </section>

        <section className="flex min-h-0 flex-col xl:col-span-5 xl:max-h-[calc(100vh-10rem)]">
          <div className="mb-4 shrink-0">
            <h2 className="text-[22px] font-semibold text-slate-900">
              {t("dashboard.listTitle")}
            </h2>
            <p className="text-[13px] text-slate-600">
              {t("dashboard.listSubtitle")}
            </p>
          </div>

          <div className="shrink-0">
            <DashboardToolbar
              search={search}
              onSearchChange={setSearch}
              sort={sort}
              onSortChange={setSort}
              resultCount={filtered.length}
              labels={{
                search: t("dashboard.search"),
                searchPlaceholder: t("dashboard.searchPlaceholder"),
                showing: t("dashboard.showing"),
                sortLabel: t("dashboard.sortLabel"),
                sortRisk: t("dashboard.sortRisk"),
                sortNewest: t("dashboard.sortNewest"),
                sortUrgency: t("dashboard.sortUrgency"),
              }}
            />

            <FilterTabs
              value={filter}
              onChange={setFilter}
              labels={{
                all: t("dashboard.filterAll"),
                pending: t("dashboard.filterPending"),
                inProgress: t("dashboard.filterInProgress"),
                severe: t("dashboard.filterSevere"),
              }}
              counts={filterCounts}
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4">
            {reports.length === 0 ? (
              <EmptyState />
            ) : isFilteredEmpty ? (
              <EmptyState
                title={t("dashboard.noResults")}
                hint={t("dashboard.noResultsHint")}
                actionLabel={t("dashboard.clearFilters")}
                onAction={clearFilters}
              />
            ) : (
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                {filtered.map((report) => (
                  <ReportCard
                    key={report.id}
                    ref={(el) => {
                      cardRefs.current[report.id] = el;
                    }}
                    report={report}
                    onSelect={handleSelect}
                    isSelected={selected?.id === report.id}
                    isPriority={report.id === topUrgentId}
                    queueRank={queueRankById.get(report.id)}
                  />
                ))}
              </div>
            )}

            <div className="hidden shrink-0 xl:block">
              <ReportDetailPanel
                report={selected}
                onClose={() => setSelected(null)}
                onSave={handleSave}
                labels={detailLabels}
              />
            </div>
          </div>
        </section>
      </div>

      {selected && (
        <div className="xl:hidden">
          <DetailSheet
            report={selected}
            onClose={() => setSelected(null)}
            onSave={handleSave}
            labels={detailLabels}
          />
        </div>
      )}
    </AppShell>
  );
}
