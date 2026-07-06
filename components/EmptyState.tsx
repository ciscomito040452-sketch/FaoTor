"use client";

import { ShieldDropletIcon } from "./ShieldDropletIcon";
import { useApp } from "@/lib/app-context";

interface EmptyStateProps {
  title?: string;
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  hint,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { t } = useApp();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShieldDropletIcon className="mb-4 h-12 w-12 text-slate-400" />
      <p className="text-[17px] font-semibold text-slate-600">
        {title ?? t("dashboard.empty")}
      </p>
      <p className="mt-2 max-w-xs text-[17px] text-slate-600">
        {hint ?? t("dashboard.emptyHint")}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 text-[15px] font-semibold text-blue-500 hover:text-blue-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
