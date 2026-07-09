"use client";

import type { Filter } from "./FilterTabs";

export type SortOption = "riskDesc" | "newest" | "urgencyDesc";

interface DashboardToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  filter: Filter;
  onFilterChange: (value: Filter) => void;
  resultCount: number;
  labels: {
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
  };
  filterCounts: {
    all: number;
    pending: number;
    inProgress: number;
    severe: number;
  };
  showResultCount?: boolean;
}

const fieldClass =
  "h-10 w-full rounded-[10px] border border-slate-100 bg-white px-3 text-[13px] text-slate-900 outline-none focus:border-2 focus:border-brand-blue dark:bg-[var(--color-surface)]";

export function DashboardToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  filter,
  onFilterChange,
  resultCount,
  labels,
  filterCounts,
  showResultCount = true,
}: DashboardToolbarProps) {
  const filterOptions: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: labels.filterAll, count: filterCounts.all },
    { key: "pending", label: labels.filterPending, count: filterCounts.pending },
    {
      key: "inProgress",
      label: labels.filterInProgress,
      count: filterCounts.inProgress,
    },
    { key: "severe", label: labels.filterSevere, count: filterCounts.severe },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor="dashboard-search">
            {labels.search}
          </label>
          <input
            id="dashboard-search"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className={fieldClass}
          />
        </div>
        <div className="flex shrink-0 gap-2">
          <div className="min-w-[148px] flex-1 sm:flex-none">
            <label className="sr-only" htmlFor="dashboard-filter">
              {labels.filterLabel}
            </label>
            <select
              id="dashboard-filter"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value as Filter)}
              className={`${fieldClass} sm:min-w-[148px]`}
            >
              {filterOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[132px] flex-1 sm:flex-none">
            <label className="sr-only" htmlFor="dashboard-sort">
              {labels.sortLabel}
            </label>
            <select
              id="dashboard-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className={`${fieldClass} sm:min-w-[132px]`}
            >
              <option value="riskDesc">{labels.sortRisk}</option>
              <option value="newest">{labels.sortNewest}</option>
              <option value="urgencyDesc">{labels.sortUrgency}</option>
            </select>
          </div>
        </div>
      </div>
      {showResultCount && (
        <p className="text-[12px] text-slate-500">
          {labels.showing.replace("{count}", String(resultCount))}
        </p>
      )}
    </div>
  );
}


