"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DetailSheet } from "@/components/DetailSheet";
import { EmptyState } from "@/components/EmptyState";
import { FilterTabs, type Filter } from "@/components/dashboard/FilterTabs";
import { MapPreviewCard } from "@/components/dashboard/MapPreviewCard";
import { ReportCard } from "@/components/dashboard/ReportCard";
import { ReportDetailPanel } from "@/components/dashboard/ReportDetailPanel";
import { ReportCalendar } from "@/components/dashboard/ReportCalendar";
import { CalendarDayInsight } from "@/components/dashboard/CalendarDayInsight";
import { QueueTimeline } from "@/components/dashboard/QueueTimeline";
import {
  DashboardToolbar,
  type SortOption,
} from "@/components/dashboard/DashboardToolbar";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/lib/app-context";
import { useReports } from "@/lib/reports-store";
import {
  reportsByDay,
  reportsByDayPending,
  reportsByDaySevere,
  resolutionRate,
  trendFromDaySeries,
} from "@/lib/dashboard-analytics";
import type { Report, ReportStatus } from "@/lib/types";

type SelectSource = "list" | "map" | "queue";

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
  const [selectSource, setSelectSource] = useState<SelectSource | null>(null);
  const [calendarDay, setCalendarDay] = useState(() => new Date().getDate());
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLElement>(null);

  const stats = useMemo(
    () => ({
      total: reports.length,
      pending: reports.filter((r) => r.status === "\u0e23\u0e2d\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e01\u0e32\u0e23").length,
      inProgress: reports.filter((r) => r.status === "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e41\u0e01\u0e49\u0e44\u0e02").length,
      severe: reports.filter((r) => r.riskLevel === "\u0e2d\u0e38\u0e14\u0e15\u0e31\u0e19\u0e2b\u0e19\u0e31\u0e01").length,
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

  const pendingSorted = useMemo(() => {
    const pending = reports.filter((r) => r.status === "\u0e23\u0e2d\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e01\u0e32\u0e23");
    return sortReports(pending, "urgencyDesc");
  }, [reports]);

  const todayQueue = useMemo(() => pendingSorted.slice(0, 8), [pendingSorted]);

  const queueRankById = useMemo(() => {
    const map = new Map<string, number>();
    pendingSorted.forEach((r, i) => map.set(r.id, i + 1));
    return map;
  }, [pendingSorted]);

  const topUrgentId = pendingSorted[0]?.id ?? null;

  const totalBars = useMemo(() => reportsByDay(reports, 7), [reports]);
  const pendingBars = useMemo(() => reportsByDayPending(reports, 7), [reports]);
  const severeBars = useMemo(() => reportsByDaySevere(reports, 7), [reports]);
  const resolvedPct = useMemo(() => resolutionRate(reports), [reports]);

  const totalTrend = useMemo(
    () => trendFromDaySeries(reports, 7, () => true),
    [reports]
  );
  const pendingTrend = useMemo(
    () => trendFromDaySeries(reports, 7, (r) => r.status === "\u0e23\u0e2d\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e01\u0e32\u0e23"),
    [reports]
  );
  const severeTrend = useMemo(
    () => trendFromDaySeries(reports, 7, (r) => r.riskLevel === "\u0e2d\u0e38\u0e14\u0e15\u0e31\u0e19\u0e2b\u0e19\u0e31\u0e01"),
    [reports]
  );
  const resolvedTrend = useMemo(
    () => trendFromDaySeries(reports, 7, (r) => r.status === "\u0e41\u0e01\u0e49\u0e44\u0e02\u0e41\u0e25\u0e49\u0e27"),
    [reports]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...reports];
    if (filter === "pending") list = list.filter((r) => r.status === "\u0e23\u0e2d\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e01\u0e32\u0e23");
    else if (filter === "inProgress") list = list.filter((r) => r.status === "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e41\u0e01\u0e49\u0e44\u0e02");
    else if (filter === "severe") list = list.filter((r) => r.riskLevel === "\u0e2d\u0e38\u0e14\u0e15\u0e31\u0e19\u0e2b\u0e19\u0e31\u0e01");
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

  function selectReport(report: Report, source: SelectSource) {
    setSelected(report);
    setSelectSource(source);
  }

  useEffect(() => {
    if (!selected?.id || !selectSource) return;

    if (selectSource === "map" || selectSource === "queue") {
      const el = cardRefs.current[selected.id];
      const container = listRef.current;
      if (el && container) {
        const offset = el.offsetTop - container.offsetTop;
        container.scrollTo({ top: Math.max(0, offset - 16), behavior: "smooth" });
      }
      if (selectSource === "queue" || selectSource === "map") {
        const delay = selectSource === "map" ? 500 : 0;
        window.setTimeout(() => {
          workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, delay);
      }
    }

    setSelectSource(null);
  }, [selected?.id, selectSource]);

  function handleSave(id: string, status: ReportStatus) {
    updateStatus(id, status);
    showToast(t("toast.saved"));
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
  }

  function handleStatClick(next: Filter) {
    setFilter((c) => (c === next ? "all" : next));
  }

  function handleQueueViewAll() {
    setFilter("pending");
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDayInsightViewList() {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDayInsightSelect(report: Report) {
    selectReport(report, "map");
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleMapViewSelectedDetail() {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleViewOnMap(report: Report) {
    setSelected(report);
    setSelectSource("list");
    const mapEl = document.getElementById("dashboard-map");
    mapEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const calendarNow = new Date();

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
      <AppShell title={t("dashboard.title")} largeTitle>
        <p className="text-slate-600">{t("common.loading")}</p>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={t("shell.greeting")}
      subtitle={t("dashboard.updated")}
      largeTitle
    >
      <p className="mb-2 text-[12px] text-slate-500">{t("dashboard.kpiRowHint")}</p>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label={t("dashboard.statTotal")}
          caption={t("dashboard.kpiCaptionTotal")}
          value={stats.total}
          trend={totalTrend}
          chartType="bar"
          chartData={totalBars}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <KpiCard
          label={t("dashboard.statPending")}
          caption={t("dashboard.kpiCaptionPending")}
          value={stats.pending}
          trend={pendingTrend}
          chartType="bar"
          chartData={pendingBars}
          active={filter === "pending"}
          onClick={() => handleStatClick("pending")}
        />
        <KpiCard
          label={t("dashboard.statSevere")}
          caption={t("dashboard.kpiCaptionSevere")}
          value={stats.severe}
          trend={severeTrend}
          chartType="bar"
          chartData={severeBars}
          barVariant="severe"
          active={filter === "severe"}
          onClick={() => handleStatClick("severe")}
        />
        <KpiCard
          label={t("dashboard.statResolved")}
          caption={t("dashboard.kpiCaptionResolved")}
          value={`${resolvedPct}%`}
          trend={resolvedTrend}
          chartType="donut"
          donutPercent={resolvedPct}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
        <div className="flex min-h-0 flex-col gap-4 lg:col-span-1">
          <ReportCalendar
            reports={reports}
            selectedDay={calendarDay}
            onSelectDay={setCalendarDay}
          />
          <CalendarDayInsight
            reports={reports}
            year={calendarNow.getFullYear()}
            month={calendarNow.getMonth()}
            selectedDay={calendarDay}
            onViewList={handleDayInsightViewList}
            onSelectReport={handleDayInsightSelect}
          />
        </div>
        <div className="lg:col-span-1 lg:self-start">
          <QueueTimeline
            reports={todayQueue}
            selectedId={selected?.id ?? null}
            onOpen={(report) => selectReport(report, "queue")}
            onViewAll={handleQueueViewAll}
          />
        </div>
        <div className="flex lg:col-span-1">
          <MapPreviewCard
            title={t("dashboard.mapTitle")}
            caption={t("dashboard.mapCaption")}
            reports={reports}
            selectedId={selected?.id ?? null}
            pinCount={reports.length}
            onPinClick={(report) => selectReport(report, "map")}
            onViewSelectedDetail={handleMapViewSelectedDetail}
          />
        </div>
      </div>

      <section id="report-workspace" ref={workspaceRef}>
        <Card padding="lg" className="hidden xl:block">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(380px,520px)]">
            <div className="flex min-h-0 flex-col">
              <h2 className="text-[20px] font-semibold text-slate-900">
                {t("dashboard.listTitle")}
              </h2>
              <p className="mt-1 text-[13px] text-slate-600">{t("dashboard.listSubtitle")}</p>

              <div className="mt-4 shrink-0">
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

              {reports.length === 0 ? (
                <EmptyState />
              ) : isFilteredEmpty ? (
                <EmptyState
                  title={t("dashboard.noResults")}
                  hint={t("dashboard.noResultsHint")}
                  actionLabel={t("dashboard.clearFilters")}
                  onAction={() => {
                    setFilter("all");
                    setSearch("");
                  }}
                />
              ) : (
                <div
                  ref={listRef}
                  className="mt-4 max-h-[min(520px,55vh)] space-y-3 overflow-y-auto pr-1"
                >
                  {filtered.map((report) => (
                    <ReportCard
                      key={report.id}
                      ref={(el) => {
                        cardRefs.current[report.id] = el;
                      }}
                      report={report}
                      onSelect={(r) => selectReport(r, "list")}
                      isSelected={selected?.id === report.id}
                      isPriority={report.id === topUrgentId}
                      queueRank={queueRankById.get(report.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            <ReportDetailPanel
              report={selected}
              onClose={() => setSelected(null)}
              onSave={handleSave}
              labels={detailLabels}
              onViewOnMap={handleViewOnMap}
            />
          </div>
        </Card>

        <Card padding="lg" className="xl:hidden">
          <h2 className="text-[20px] font-semibold text-slate-900">
            {t("dashboard.listTitle")}
          </h2>
          <p className="mt-1 text-[13px] text-slate-600">{t("dashboard.listSubtitle")}</p>

          <div className="mt-4 shrink-0">
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

          {reports.length === 0 ? (
            <EmptyState />
          ) : isFilteredEmpty ? (
            <EmptyState
              title={t("dashboard.noResults")}
              hint={t("dashboard.noResultsHint")}
              actionLabel={t("dashboard.clearFilters")}
              onAction={() => {
                setFilter("all");
                setSearch("");
              }}
            />
          ) : (
            <div className="mt-4 space-y-3">
              {filtered.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onSelect={(r) => selectReport(r, "list")}
                  isSelected={selected?.id === report.id}
                  isPriority={report.id === topUrgentId}
                  queueRank={queueRankById.get(report.id)}
                />
              ))}
            </div>
          )}
        </Card>
      </section>

      {selected && (
        <div className="xl:hidden">
          <DetailSheet
            report={selected}
            onClose={() => setSelected(null)}
            onSave={handleSave}
            labels={detailLabels}
            onViewOnMap={handleViewOnMap}
          />
        </div>
      )}
    </AppShell>
  );
}







