"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/app-context";

const TABS = [
  { href: "/", key: "nav.home" as const },
  { href: "/report", key: "nav.report" as const },
  { href: "/dashboard", key: "nav.dashboard" as const },
  { href: "/about", key: "nav.about" as const },
];

export function SideNav() {
  const pathname = usePathname();
  const { t } = useApp();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-100 bg-white dark:border-slate-100 dark:bg-[var(--color-surface)] lg:flex lg:flex-col">
      <div className="border-b border-slate-100 px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt={t("app.name")}
            width={44}
            height={44}
            className="shrink-0"
          />
          <div className="min-w-0">
            <p className="truncate text-[17px] font-semibold text-slate-900">
              {t("app.name")}
            </p>
            <p className="mt-0.5 text-[13px] text-slate-600">Demo</p>
          </div>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {TABS.map(({ href, key }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-[48px] items-center rounded-[12px] px-4 text-[15px] font-semibold ${
                active
                  ? "bg-blue-50 text-blue-500 dark:bg-blue-900/20"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t(key)}
            </Link>
          );
        })}
        <Link
          href="/line"
          className={`mt-2 flex min-h-[48px] items-center rounded-[12px] px-4 text-[15px] font-semibold ${
            pathname === "/line"
              ? "bg-blue-50 text-blue-500"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          {t("nav.line")}
        </Link>
      </nav>
    </aside>
  );
}
