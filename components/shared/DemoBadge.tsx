"use client";

import { useApp } from "@/lib/app-context";
import { MOCK_MODE } from "@/lib/mock-data";

export function DemoBadge() {
  const { t } = useApp();

  if (!MOCK_MODE) return null;

  return (
    <span className="inline-flex items-center rounded-full border border-brand-orange/25 bg-brand-orange-soft px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-orange-dark">
      {t("app.demoBadge")}
    </span>
  );
}
