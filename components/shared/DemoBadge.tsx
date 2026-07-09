"use client";

import { MOCK_MODE } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export function DemoBadge() {
  const { t } = useApp();

  if (!MOCK_MODE) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-500">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
        aria-hidden
      />
      {t("app.demoBadge")}
    </span>
  );
}
