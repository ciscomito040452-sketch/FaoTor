"use client";

import type { ReactNode } from "react";

interface ListWorkspaceHeaderProps {
  title: string;
  subtitle: string;
  resultCount: number;
  showingLabel: string;
  controls: ReactNode;
}

export function ListWorkspaceHeader({
  title,
  subtitle,
  resultCount,
  showingLabel,
  controls,
}: ListWorkspaceHeaderProps) {
  return (
    <div className="shrink-0">
      <div className="flex items-start justify-between gap-3">
        <div className="border-l-4 border-brand-blue pl-3">
          <h2 className="text-[22px] font-bold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-1 text-[13px] text-slate-600">{subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-blue-soft px-3 py-1 text-[12px] font-semibold text-brand-blue">
          {showingLabel.replace("{count}", String(resultCount))}
        </span>
      </div>
      <div className="mt-4 rounded-[16px] bg-slate-50/80 p-4">{controls}</div>
    </div>
  );
}
