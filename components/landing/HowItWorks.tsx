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
        {steps.map((step, index) => (
          <div
            key={step.num}
            className="bento-card flex items-center gap-4 p-4"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[17px] font-semibold text-white ${
                index === 0 ? "bg-brand-blue" : index === 1 ? "bg-brand-orange" : "bg-brand-blue"
              }`}
            >
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
