"use client";

import { AppShell } from "@/components/layout/AppShell";
import { LineFlowMock } from "@/components/line/LineFlowMock";
import { useApp } from "@/lib/app-context";

export default function LinePage() {
  const { t } = useApp();

  return (
    <AppShell title={t("line.title")} showBack variant="report">
      <p className="-mt-4 mb-8 text-[15px] text-slate-600">{t("line.subtitle")}</p>
      <LineFlowMock />
    </AppShell>
  );
}
