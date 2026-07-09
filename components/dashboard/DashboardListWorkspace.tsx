"use client";

import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EmptyState } from "@/components/EmptyState";
import { ReportCard } from "@/components/dashboard/ReportCard";
import {
  DashboardToolbar,
  type SortOption,
} from "@/components/dashboard/DashboardToolbar";
import type { Filter } from "@/components/dashboard/FilterTabs";
import type { Report } from "@/lib/types";
import {
  listItemVariants,
  popLayoutTransition,
  staggerChildren,
  useReducedMotion,
} from "@/lib/motion";

interface DashboardListWorkspaceProps {
  reports: Report[];
  filtered: Report[];
  isFilteredEmpty: boolean;
  filter: Filter;
  sort: SortOption;
  search: string;
  filterCounts: Record<Filter, number>;
  selectedId?: string | null;
  topUrgentId?: string | null;
  queueRankById: Map<string, number>;
  listRef?: RefObject<HTMLDivElement | null>;
  cardRefs?: RefObject<Record<string, HTMLButtonElement | null>>;
  onSelect: (report: Report) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: Filter) => void;
  onClearFilters: () => void;
  listClassName?: string;
  labels: {
    listTitle: string;
    listSubtitle: string;
    search: string;
    searchPlaceholder: string;
    showing: string;
    sortLabel: string;
    sortRisk: string;
    sortNewest: string;
    sortUrgency: string;
    filterLabel: string;
    filterAll: string;
    filterPending: string;
    filterInProgress: string;
    filterSevere: string;
    noResults: string;
    noResultsHint: string;
    clearFilters: string;
  };
}

export function DashboardListWorkspace({
  reports,
  filtered,
  isFilteredEmpty,
  filter,
  sort,
  search,
  filterCounts,
  selectedId,
  topUrgentId,
  queueRankById,
  listRef,
  cardRefs,
  onSelect,
  onSearchChange,
  onSortChange,
  onFilterChange,
  onClearFilters,
  listClassName = "mt-2 min-h-0 flex-1 space-y-2 overflow-x-hidden overflow-y-auto px-1 py-1 [scrollbar-gutter:stable]",
  labels,
}: DashboardListWorkspaceProps) {
  const reduced = useReducedMotion();

  return (
    <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
      <h2 className="text-[20px] font-semibold text-slate-900">
        {labels.listTitle}
      </h2>
      <p className="mt-1 text-[13px] text-slate-600">{labels.listSubtitle}</p>

      <div className="mt-3 shrink-0">
        <DashboardToolbar
          search={search}
          onSearchChange={onSearchChange}
          sort={sort}
          onSortChange={onSortChange}
          filter={filter}
          onFilterChange={onFilterChange}
          resultCount={filtered.length}
          filterCounts={filterCounts}
          labels={{
            search: labels.search,
            searchPlaceholder: labels.searchPlaceholder,
            showing: labels.showing,
            sortLabel: labels.sortLabel,
            sortRisk: labels.sortRisk,
            sortNewest: labels.sortNewest,
            sortUrgency: labels.sortUrgency,
            filterLabel: labels.filterLabel,
            filterAll: labels.filterAll,
            filterPending: labels.filterPending,
            filterInProgress: labels.filterInProgress,
            filterSevere: labels.filterSevere,
          }}
        />
      </div>

      {reports.length === 0 ? (
        <EmptyState />
      ) : isFilteredEmpty ? (
        <EmptyState
          title={labels.noResults}
          hint={labels.noResultsHint}
          actionLabel={labels.clearFilters}
          onAction={onClearFilters}
        />
      ) : (
        <div ref={listRef} className={listClassName}>
          <AnimatePresence mode="popLayout">
            {filtered.map((report, index) => (
              <motion.div
                key={report.id}
                layout
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  ...popLayoutTransition(reduced),
                  ...staggerChildren(Math.min(index, 19)),
                }}
                className="mb-2"
              >
                <ReportCard
                  ref={(el) => {
                    if (cardRefs?.current) cardRefs.current[report.id] = el;
                  }}
                  report={report}
                  onSelect={onSelect}
                  isSelected={selectedId === report.id}
                  isPriority={report.id === topUrgentId}
                  queueRank={queueRankById.get(report.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
