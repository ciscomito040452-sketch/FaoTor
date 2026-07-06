"use client";

import { useApp } from "@/lib/app-context";

export function HowItWorks() {
  const { t } = useApp();

  const steps = [
    { num: "1", title: t("landing.step1") },
    { num: "2", title: t("landing.step2") },
    { num: "3", title: t("landing.step3") },
  ];

  return (
    <section>
      <h2 className="mb-4 text-[22px] font-semibold text-slate-900">
        {t("landing.howItWorks")}
      </h2>
      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-center gap-4 rounded-[16px] border border-slate-100 bg-white p-4 dark:bg-[var(--color-surface)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[17px] font-semibold text-white">
              {step.num}
            </span>
            <p className="text-[17px] font-semibold text-slate-900">
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
