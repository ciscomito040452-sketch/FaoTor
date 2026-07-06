"use client";

import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { AppShell } from "@/components/layout/AppShell";
import { LiveStatsTeaser } from "@/components/landing/LiveStatsTeaser";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { RoleCard } from "@/components/landing/RoleCard";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const { t } = useApp();

  return (
    <AppShell
      title={t("shell.greetingHome")}
      subtitle={t("app.tagline")}
      largeTitle
      actions={
        <Link href="/report">
          <Button variant="orange">{t("landing.ctaReport")}</Button>
        </Link>
      }
    >
      <LiveStatsTeaser />

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <RoleCard
          href="/report"
          variant="primary"
          title={t("landing.role.reporter.title")}
          description={t("landing.role.reporter.desc")}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          }
        />
        <RoleCard
          href="/dashboard"
          variant="secondary"
          title={t("landing.role.officer.title")}
          description={t("landing.role.officer.desc")}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          }
        />
      </div>

      <ProblemSection />
      <HowItWorks />

      <footer className="mt-10 border-t border-slate-100 pt-6">
        <Link
          href="/about"
          className="text-[15px] font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          {t("landing.footer.about")} →
        </Link>
        <p className="mt-2 text-[13px] text-slate-400">{t("app.demoNote")}</p>
      </footer>
    </AppShell>
  );
}
