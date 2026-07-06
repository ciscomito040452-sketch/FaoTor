"use client";

import { AppShell } from "@/components/layout/AppShell";
import { UploadForm } from "@/components/UploadForm";
import { useApp } from "@/lib/app-context";

export default function ReportPage() {
  const { t } = useApp();

  return (
    <AppShell title={t("report.title")} showBack largeTitle variant="report">
      <UploadForm />
    </AppShell>
  );
}
