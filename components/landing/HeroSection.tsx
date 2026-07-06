"use client";

import Image from "next/image";
import { useApp } from "@/lib/app-context";
import { DemoPill, SettingsButton } from "@/components/layout/NavActions";

export function HeroSection() {
  const { t } = useApp();

  return (
    <div className="hero-gradient mb-8 w-full rounded-b-[24px] px-6 pb-10 pt-4 xl:px-10">
      <div className="mb-8 flex items-center justify-between">
        <DemoPill />
        <SettingsButton />
      </div>
      <div className="text-center">
        <Image
          src="/logo.svg"
          alt={t("app.name")}
          width={112}
          height={112}
          className="mx-auto drop-shadow-sm"
          priority
        />
        <h1 className="mt-6 text-[34px] font-bold leading-[1.35] tracking-[-0.02em] text-slate-900">
          {t("app.name")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] text-slate-600">
          {t("app.tagline")}
        </p>
        <p className="mt-2 text-[13px] text-slate-400">{t("app.demoNote")}</p>
      </div>
    </div>
  );
}
