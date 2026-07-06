"use client";

import { AppShell } from "@/components/layout/AppShell";
import { LineFlowMock } from "@/components/line/LineFlowMock";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/lib/app-context";

export default function LinePage() {
  const { t } = useApp();

  return (
    <AppShell title={t("line.title")} subtitle={t("line.subtitle")} largeTitle>
      <Card padding="none" className="mx-auto max-w-md overflow-hidden">
        <LineFlowMock />
      </Card>
    </AppShell>
  );
}
