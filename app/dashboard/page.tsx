"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DetailSheet } from "@/components/DetailSheet";
import { DashboardListWorkspace } from "@/components/dashboard/DashboardListWorkspace";
import { type Filter } from "@/components/dashboard/FilterTabs";
import { MapPreviewCard } from "@/components/dashboard/MapPreviewCard";
import { ReportDetailPanel } from "@/components/dashboard/ReportDetailPanel";
import { ReportCalendar } from "@/components/dashboard/ReportCalendar";
import { CalendarDayInsight } from "@/components/dashboard/CalendarDayInsight";
import { QueueTimeline } from "@/components/dashboard/QueueTimeline";
import { type SortOption } from "@/components/dashboard/DashboardToolbar";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card } from "@/components/ui/Card";
import { StaggerReveal } from "@/components/ui/StaggerList";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
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
import { useMediaQuery } from "@/lib/use-media-query";

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
  const isDesktop = useMediaQuery("(min-width: 1280px)");
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

  const pendingSorted = useMemo(() => {
    const pending = reports.filter((r) => r.status === "รอดำเนินการ");
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
    () => trendFromDaySeries(reports, 7, (r) => r.status === "รอดำเนินการ"),
    [reports]
  );
  const severeTrend = useMemo(
    () => trendFromDaySeries(reports, 7, (r) => r.riskLevel === "อุดตันหนัก"),
    [reports]
  );
  const resolvedTrend = useMemo(
    () => trendFromDaySeries(reports, 7, (r) => r.status === "แก้ไขแล้ว"),
    [reports]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...reports];
    if (filter === "pending") list = list.filter((r) => r.status === "รอดำเนินการ");
    else if (filter === "inProgress") list = list.filter((r) => r.status === "กำลังแก้ไข");
    else if (filter === "severe") list = list.filter((r) => r.riskLevel === "อุดตันหนัก");
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

  const listLabels = {
    listTitle: t("dashboard.listTitle"),
    listSubtitle: t("dashboard.listSubtitle"),
    search: t("dashboard.search"),
    searchPlaceholder: t("dashboard.searchPlaceholder"),
    showing: t("dashboard.showing"),
    sortLabel: t("dashboard.sortLabel"),
    sortRisk: t("dashboard.sortRisk"),
    sortNewest: t("dashboard.sortNewest"),
    sortUrgency: t("dashboard.sortUrgency"),
    filterLabel: t("dashboard.filterLabel"),
    filterAll: t("dashboard.filterAll"),
    filterPending: t("dashboard.filterPending"),
    filterInProgress: t("dashboard.filterInProgress"),
    filterSevere: t("dashboard.filterSevere"),
    noResults: t("dashboard.noResults"),
    noResultsHint: t("dashboard.noResultsHint"),
    clearFilters: t("dashboard.clearFilters"),
  };

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
      const delay = selectSource === "map" ? 500 : 0;
      window.setTimeout(() => {
        workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, delay);
    }

    setSelectSource(null);
  }, [selected?.id, selectSource]);

  function handleSave(id: string, status: ReportStatus) {
    updateStatus(id, status);
    showToast(t("toast.saved"), "success");
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
  }

  function handleStatClick(next: Filter) {
    setFilter((c) => (c === next ? "all" : next));
  }

  function handleClearFilters() {
    setFilter("all");
    setSearch("");
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
    document.getElementById("dashboard-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <DashboardSkeleton />
      </AppShell>
    );
  }

  return (
    <AppShell
      title={t("shell.greeting")}
      subtitle={t("dashboard.updated")}
      largeTitle
    >
      <StaggerReveal index={0}>
        <p className="mb-2 text-[12px] text-slate-500">{t("dashboard.kpiRowHint")}</p>
      </StaggerReveal>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StaggerReveal index={0}>
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
        </StaggerReveal>
        <StaggerReveal index={1}>
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
        </StaggerReveal>
        <StaggerReveal index={2}>
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
        </StaggerReveal>
        <StaggerReveal index={3}>
          <KpiCard
            label={t("dashboard.statResolved")}
            caption={t("dashboard.kpiCaptionResolved")}
            value={`${resolvedPct}%`}
            trend={resolvedTrend}
            chartType="donut"
            donutPercent={resolvedPct}
          />
        </StaggerReveal>
      </div>

      <StaggerReveal index={4}>
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
        <div className="flex h-full min-h-0 flex-col lg:col-span-1">
          <QueueTimeline
            reports={todayQueue}
            selectedId={selected?.id ?? null}
            onOpen={(report) => selectReport(report, "queue")}
            onViewAll={handleQueueViewAll}
          />
        </div>
        <div className="flex h-full min-h-0 flex-col lg:col-span-1">
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
      </StaggerReveal>

      <StaggerReveal index={5}>
      <section id="report-workspace" ref={workspaceRef}>
        <Card padding="lg" className="hidden overflow-hidden xl:block">
          <div className="grid max-h-[min(72vh,calc(100vh-14rem))] grid-cols-1 gap-6 overflow-hidden xl:grid-cols-[minmax(0,1fr)_minmax(520px,600px)] xl:grid-rows-[minmax(0,1fr)] xl:items-stretch">
            <DashboardListWorkspace
              reports={reports}
              filtered={filtered}
              isFilteredEmpty={isFilteredEmpty}
              filter={filter}
              sort={sort}
              search={search}
              filterCounts={filterCounts}
              selectedId={selected?.id}
              topUrgentId={topUrgentId}
              queueRankById={queueRankById}
              listRef={listRef}
              cardRefs={cardRefs}
              onSelect={(r) => selectReport(r, "list")}
              onSearchChange={setSearch}
              onSortChange={setSort}
              onFilterChange={setFilter}
              onClearFilters={handleClearFilters}
              labels={listLabels}
            />
            <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
              <ReportDetailPanel
                report={selected}
                onClose={() => setSelected(null)}
                onSave={handleSave}
                labels={detailLabels}
                onViewOnMap={handleViewOnMap}
              />
            </div>
          </div>
        </Card>

        <Card padding="lg" className="xl:hidden">
          <DashboardListWorkspace
            reports={reports}
            filtered={filtered}
            isFilteredEmpty={isFilteredEmpty}
            filter={filter}
            sort={sort}
            search={search}
            filterCounts={filterCounts}
            selectedId={selected?.id}
            topUrgentId={topUrgentId}
            queueRankById={queueRankById}
            onSelect={(r) => selectReport(r, "list")}
            onSearchChange={setSearch}
            onSortChange={setSort}
            onFilterChange={setFilter}
            onClearFilters={handleClearFilters}
            listClassName="mt-2 max-h-[min(60vh,520px)] space-y-2 overflow-y-auto pr-1"
            labels={listLabels}
          />
        </Card>
      </section>
      </StaggerReveal>

      {selected && !isDesktop && (
        <DetailSheet
          report={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
          labels={detailLabels}
          onViewOnMap={handleViewOnMap}
        />
      )}
    </AppShell>
  );
}
