"use client";

import { useApp } from "@/lib/app-context";

export function AvatarChip() {
  const { t } = useApp();
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-[14px] font-semibold text-white">
        จ
      </div>
      <div className="text-left">
        <p className="text-[13px] font-semibold text-slate-900">
          {t("shell.officerName")}
        </p>
        <p className="text-[11px] text-slate-600">{t("shell.officerRole")}</p>
      </div>
    </div>
  );
}
