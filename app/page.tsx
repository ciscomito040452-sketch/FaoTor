"use client";

import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { HeroSection } from "@/components/landing/HeroSection";
import { LiveStatsTeaser } from "@/components/landing/LiveStatsTeaser";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { RoleCard } from "@/components/landing/RoleCard";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BottomNav } from "@/components/layout/BottomNav";
import { SideNav } from "@/components/layout/SideNav";

export default function HomePage() {
  const { t } = useApp();

  return (
    <div className="flex min-h-screen w-full lg:flex-row">
      <SideNav />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col pb-safe-nav lg:pb-8">
        <HeroSection />
        <div className="px-6 xl:px-10">
        <LiveStatsTeaser />
        <ProblemSection />

        <div className="mb-8 space-y-4">
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

        <HowItWorks />

        <footer className="mt-10 border-t border-slate-100 pt-6 pb-4">
          <Link
            href="/about"
            className="text-[15px] font-semibold text-blue-500 hover:text-blue-700"
          >
            {t("landing.footer.about")} →
          </Link>
        </footer>
        </div>
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
