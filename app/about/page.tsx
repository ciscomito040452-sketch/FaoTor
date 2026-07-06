"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/lib/app-context";

export default function AboutPage() {
  const { t } = useApp();

  return (
    <AppShell title={t("about.title")} largeTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Card padding="lg">
          <h2 className="text-[17px] font-semibold text-slate-900">
            {t("about.vision")}
          </h2>
          <p className="mt-2 text-[15px] leading-[1.5] text-slate-600">
            {t("about.visionBody")}
          </p>
        </Card>

        <Card padding="lg" className="border-brand-blue/20 bg-brand-blue-soft">
          <h2 className="text-[17px] font-semibold text-brand-blue">
            {t("about.phase1")}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600">{t("about.phase1Body")}</p>
        </Card>

        <Card padding="lg" className="md:col-span-2">
          <h2 className="text-[17px] font-semibold text-slate-900">
            {t("about.phase2")}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600">{t("about.phase2Body")}</p>
          <Link
            href="/line"
            className="mt-4 inline-flex text-[15px] font-semibold text-brand-orange hover:text-brand-orange-dark"
          >
            {t("settings.lineLink")} →
          </Link>
        </Card>
      </div>
    </AppShell>
  );
}
