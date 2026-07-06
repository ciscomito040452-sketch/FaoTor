"use client";

import Link from "next/link";
import { SettingsButton } from "./NavActions";

interface PageHeaderProps {
  title?: string;
  showBack?: boolean;
}

export function PageHeader({ title, showBack = true }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 pb-2 pt-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {showBack && (
          <Link
            href="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-slate-100 bg-white text-slate-600 dark:bg-[var(--color-surface)]"
            aria-label="Back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
        {title && (
          <span className="truncate text-[17px] font-semibold text-slate-900">
            {title}
          </span>
        )}
      </div>
      <SettingsButton />
    </header>
  );
}
