"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/lib/app-context";

export default function AboutPage() {
  const { t } = useApp();

  return (
    <AppShell title={t("about.title")} showBack>
      <div className="space-y-6">
        <section className="rounded-[16px] border border-slate-100 bg-white p-6 dark:bg-[var(--color-surface)]">
          <h2 className="text-[17px] font-semibold text-slate-900">
            {t("about.vision")}
          </h2>
          <p className="mt-2 text-[15px] leading-[1.5] text-slate-600">
            {t("about.visionBody")}
          </p>
        </section>

        <section className="rounded-[16px] border border-slate-100 bg-white p-6 dark:bg-[var(--color-surface)]">
          <h2 className="text-[17px] font-semibold text-blue-500">
            {t("about.phase1")}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600">{t("about.phase1Body")}</p>
        </section>

        <section className="rounded-[16px] border border-slate-100 bg-white p-6 dark:bg-[var(--color-surface)]">
          <h2 className="text-[17px] font-semibold text-slate-900">
            {t("about.phase2")}
          </h2>
          <p className="mt-2 text-[15px] text-slate-600">{t("about.phase2Body")}</p>
          <Link
            href="/line"
            className="mt-4 inline-flex text-[15px] font-semibold text-blue-500"
          >
            {t("settings.lineLink")} →
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
