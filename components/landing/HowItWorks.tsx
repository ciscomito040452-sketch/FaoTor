"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/app-context";
import { FadeIn } from "@/components/ui/FadeIn";
import { useReducedMotion } from "@/lib/motion";

export function HowItWorks() {
  const { t } = useApp();
  const reduced = useReducedMotion();

  const steps = [
    { num: "1", title: t("landing.step1") },
    { num: "2", title: t("landing.step2") },
    { num: "3", title: t("landing.step3") },
  ];

  return (
    <section>
      <FadeIn>
        <h2 className="mb-4 text-[22px] font-semibold text-slate-900">
          {t("landing.howItWorks")}
        </h2>
      </FadeIn>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <FadeIn key={step.num} index={index + 1}>
            <div className="bento-card flex items-center gap-4 p-4">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: index * 0.08, type: "spring", stiffness: 420, damping: 28 }
                }
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[17px] font-semibold text-white ${
                  index === 0 ? "bg-brand-blue" : index === 1 ? "bg-brand-orange" : "bg-brand-blue"
                }`}
              >
                {step.num}
              </motion.span>
              <p className="text-[17px] font-semibold text-slate-900">
                {step.title}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
