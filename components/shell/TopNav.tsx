"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { DemoBadge } from "@/components/shared/DemoBadge";
import { SettingsButton } from "@/components/layout/NavActions";
import { AvatarChip } from "@/components/ui/AvatarChip";
import { useReducedMotion } from "@/lib/motion";

const TABS = [
  { href: "/", key: "nav.home" as const },
  { href: "/report", key: "nav.report" as const },
  { href: "/dashboard", key: "nav.dashboard" as const },
  { href: "/about", key: "nav.about" as const },
  { href: "/line", key: "nav.line" as const },
];

export function TopNav() {
  const pathname = usePathname();
  const { t } = useApp();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6 xl:px-8">
        <motion.div whileTap={reduced ? undefined : { scale: 0.96 }}>
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image src="/logo.svg" alt={t("app.name")} width={36} height={36} />
            <span className="hidden text-[17px] font-bold text-slate-900 sm:inline">
              {t("app.name")}
            </span>
            <span className="sm:hidden">
              <DemoBadge />
            </span>
          </Link>
        </motion.div>

        <nav className="hidden flex-1 justify-center lg:flex">
          <div className="relative inline-flex rounded-full bg-slate-50 p-1">
            {TABS.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative z-10 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                    active ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {active && !reduced && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-brand-blue shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  {active && reduced && (
                    <span className="absolute inset-0 rounded-full bg-brand-blue shadow-sm" />
                  )}
                  <span className="relative">{t(key)}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline">
            <DemoBadge />
          </span>
          <SettingsButton />
          <AvatarChip />
        </div>
      </div>
    </header>
  );
}
