"use client";

import { usePathname } from "next/navigation";
import { SideNav } from "./SideNav";
import { BottomNav } from "./BottomNav";
import { PageHeader } from "./PageHeader";

export type ShellVariant = "default" | "report" | "dashboard";

interface ResponsiveShellProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  showNav?: boolean;
  largeTitle?: boolean;
  variant?: ShellVariant;
}

export function ResponsiveShell({
  children,
  title,
  showBack = false,
  showNav = true,
  largeTitle = false,
  variant = "default",
}: ResponsiveShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const outerClass = "flex min-h-screen w-full lg:flex-row";

  const contentClass =
    variant === "report" ? "mx-auto w-full max-w-[480px]" : "w-full";

  const mainPadding = "px-6 xl:px-10";

  return (
    <div className={outerClass}>
      {showNav && !isHome && <SideNav />}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {!isHome && (
          <PageHeader title={largeTitle ? undefined : title} showBack={showBack} />
        )}
        <main
          className={`flex-1 ${mainPadding} pb-safe-nav lg:pb-8 ${
            isHome ? "pb-safe-nav pt-0" : "pt-4"
          }`}
        >
          <div className={contentClass}>
            {largeTitle && title && (
              <h1 className="mb-8 text-[34px] font-bold leading-[1.35] tracking-[-0.02em] text-slate-900">
                {title}
              </h1>
            )}
            {children}
          </div>
        </main>
        {showNav && !isHome && (
          <div className="lg:hidden">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
}
