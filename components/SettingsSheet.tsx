"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/lib/app-context";
import { useReports } from "@/lib/reports-store";
import { AnimatedSheet } from "@/components/ui/AnimatedSheet";
import { springTransition, useReducedMotion } from "@/lib/motion";

function SegmentedToggle<T extends string>({
  value,
  options,
  onChange,
  layoutId,
  renderLabel,
}: {
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
  layoutId: string;
  renderLabel: (v: T) => string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex rounded-[12px] bg-slate-100 p-1">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`relative min-h-[44px] flex-1 rounded-[10px] text-[15px] font-semibold ${
              active ? "text-brand-blue" : "text-slate-600"
            }`}
          >
            {active && !reduced && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                transition={springTransition(reduced)}
              />
            )}
            {active && reduced && (
              <span className="absolute inset-0 rounded-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]" />
            )}
            <span className="relative">{renderLabel(option)}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SettingsSheet() {
  const {
    settingsOpen,
    closeSettings,
    locale,
    setLocale,
    theme,
    setTheme,
    t,
    showToast,
  } = useApp();
  const { resetReports } = useReports();

  function handleReset() {
    resetReports();
    showToast(t("toast.reset"), "success");
    closeSettings();
  }

  return (
    <AnimatedSheet
      open={settingsOpen}
      onClose={closeSettings}
      closeLabel={t("common.close")}
      align="center"
      panelClassName="w-full max-w-lg rounded-t-[16px] bg-white p-6 dark:bg-[var(--color-surface)] sm:rounded-[16px]"
    >
      <h2 className="mb-6 text-[22px] font-semibold text-slate-900">
        {t("settings.title")}
      </h2>

      <div className="space-y-4">
        <div className="rounded-[16px] border border-slate-100 p-4 dark:border-slate-100">
          <p className="mb-3 text-[13px] text-slate-600">{t("settings.language")}</p>
          <SegmentedToggle
            value={locale}
            options={["th", "en"] as const}
            onChange={setLocale}
            layoutId="settings-locale-pill"
            renderLabel={(lang) => (lang === "th" ? "ไทย" : "English")}
          />
        </div>

        <div className="rounded-[16px] border border-slate-100 p-4 dark:border-slate-100">
          <p className="mb-3 text-[13px] text-slate-600">{t("settings.theme")}</p>
          <SegmentedToggle
            value={theme}
            options={["light", "dark"] as const}
            onChange={setTheme}
            layoutId="settings-theme-pill"
            renderLabel={(mode) =>
              mode === "light" ? t("settings.themeLight") : t("settings.themeDark")
            }
          />
        </div>

        <div className="rounded-[16px] border border-slate-100 p-4 dark:border-slate-100">
          <p className="mb-1 text-[15px] font-semibold text-slate-900">
            {t("settings.reset")}
          </p>
          <p className="mb-3 text-[13px] text-slate-600">{t("settings.resetHint")}</p>
          <button
            type="button"
            onClick={handleReset}
            className="pressable h-[44px] w-full rounded-[12px] border border-slate-100 text-[15px] font-semibold text-slate-900 hover:bg-slate-50"
          >
            {t("settings.reset")}
          </button>
        </div>

        <Link
          href="/line"
          onClick={closeSettings}
          className="flex h-[50px] items-center justify-center rounded-[12px] bg-brand-blue-soft text-[15px] font-semibold text-brand-blue transition hover:bg-brand-blue-soft/80 dark:bg-blue-900/20"
        >
          {t("settings.lineLink")}
        </Link>
      </div>
    </AnimatedSheet>
  );
}
