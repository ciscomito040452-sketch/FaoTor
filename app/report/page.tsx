"use client";

import { AppShell } from "@/components/layout/AppShell";
import { UploadForm } from "@/components/UploadForm";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/lib/app-context";

export default function ReportPage() {
  const { t } = useApp();

  return (
    <AppShell title={t("report.title")} subtitle={t("report.subtitle")} largeTitle>
      <div className="mx-auto max-w-[560px]">
        <Card padding="lg">
          <UploadForm />
        </Card>
      </div>
    </AppShell>
  );
}
