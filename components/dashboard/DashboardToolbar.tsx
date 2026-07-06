"use client";

export type SortOption = "riskDesc" | "newest" | "urgencyDesc";

interface DashboardToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  resultCount: number;
  labels: {
    search: string;
    searchPlaceholder: string;
    showing: string;
    sortLabel: string;
    sortRisk: string;
    sortNewest: string;
    sortUrgency: string;
  };
}

export function DashboardToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  resultCount,
  labels,
}: DashboardToolbarProps) {
  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
            className="h-[48px] w-full rounded-[12px] border border-slate-100 bg-white px-4 text-[15px] text-slate-900 outline-none focus:border-2 focus:border-brand-blue dark:bg-[var(--color-surface)]"
          />
        </div>
        <div className="shrink-0">
          <label className="sr-only" htmlFor="dashboard-sort">
            {labels.sortLabel}
          </label>
          <select
            id="dashboard-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-[48px] w-full rounded-[12px] border border-slate-100 bg-white px-4 text-[15px] text-slate-900 outline-none focus:border-2 focus:border-brand-blue sm:w-auto dark:bg-[var(--color-surface)]"
          >
            <option value="riskDesc">{labels.sortRisk}</option>
            <option value="newest">{labels.sortNewest}</option>
            <option value="urgencyDesc">{labels.sortUrgency}</option>
          </select>
        </div>
      </div>
      <p className="text-[13px] text-slate-600">
        {labels.showing.replace("{count}", String(resultCount))}
      </p>
    </div>
  );
}
