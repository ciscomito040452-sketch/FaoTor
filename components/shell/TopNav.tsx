"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { DemoPill, SettingsButton } from "@/components/layout/NavActions";
import { AvatarChip } from "@/components/ui/AvatarChip";

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

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6 xl:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.svg" alt={t("app.name")} width={36} height={36} />
          <span className="hidden text-[17px] font-bold text-slate-900 sm:inline">
            {t("app.name")}
          </span>
        </Link>

        <nav className="hidden flex-1 justify-center lg:flex">
          <div className="inline-flex rounded-full bg-slate-50 p-1">
            {TABS.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-2 text-[14px] font-semibold transition ${
                    active
                      ? "bg-brand-blue text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <DemoPill />
          <SettingsButton />
          <AvatarChip />
        </div>
      </div>
    </header>
  );
}
