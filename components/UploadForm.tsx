"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { mockAnalyzeImage } from "@/lib/mock-analyze";
import { SAMPLE_IMAGES } from "@/lib/mock-data";
import { useReports } from "@/lib/reports-store";
import { useApp } from "@/lib/app-context";
import type { AnalyzeResult } from "@/lib/types";
import {
  fadeUpVariants,
  motionTransition,
  scaleFadeVariants,
  slideLeftVariants,
  useReducedMotion,
} from "@/lib/motion";
import { ErrorBanner } from "./ErrorBanner";
import { StepIndicator } from "./report/StepIndicator";
import { PhotoUploadZone } from "./report/PhotoUploadZone";
import { AnalysisProgress } from "./report/AnalysisProgress";
import { ResultCard } from "./report/ResultCard";
import { ThankYouCard } from "./report/ThankYouCard";

const LocationMapPicker = dynamic(
  () =>
    import("./report/LocationMapPicker").then((m) => m.LocationMapPicker),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[200px] items-center justify-center rounded-[12px] border border-slate-100 bg-slate-50 text-[13px] text-slate-600">
        …
      </div>
    ),
  }
);

type Step = 1 | 2 | 3 | 4;
type PreviewSource = "none" | "file" | "sample";

export function UploadForm() {
  const { t, showToast } = useApp();
  const reduced = useReducedMotion();
  const { addReport } = useReports();
  const fileRef = useRef<HTMLInputElement>(null);
  const reportSavedRef = useRef(false);
  const [locationNote, setLocationNote] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [mapKey, setMapKey] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewSource, setPreviewSource] = useState<PreviewSource>("none");
  const [step, setStep] = useState<Step>(1);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [pendingResult, setPendingResult] = useState<AnalyzeResult | null>(null);

  const locationLabel =
    locationNote.trim() ||
    (coords
      ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
      : "");

  const canSubmit = Boolean(preview && coords);

  const handleCoordsChange = useCallback((lat: number, lng: number) => {
    setCoords({ lat, lng });
  }, []);

  const stepLabels: [string, string, string, string] = [
    t("report.step.photo"),
    t("report.step.analyze"),
    t("report.step.result"),
    t("report.step.thanks"),
  ];

  const analyzeSteps: [string, string, string] = [
    t("report.analyzeStep1"),
    t("report.analyzeStep2"),
    t("report.analyzeStep3"),
  ];

  const sampleLabels: [string, string, string] = [
    t("report.sampleSevere"),
    t("report.samplePartial"),
    t("report.sampleNormal"),
  ];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      setPreviewSource("file");
    };
    reader.readAsDataURL(file);
  }

  function handleSampleSelect(url: string) {
    setPreview(url);
    setPreviewSource("sample");
    if (fileRef.current) fileRef.current.value = "";
  }

  useEffect(() => {
    if (
      !animationDone ||
      !pendingResult ||
      !preview ||
      !coords ||
      reportSavedRef.current
    ) {
      return;
    }
    reportSavedRef.current = true;
    setResult(pendingResult);
    setStep(3);
    setAnalyzing(false);
    addReport({
      imageUrl: preview,
      location: locationLabel,
      riskLevel: pendingResult.riskLevel,
      riskScore: pendingResult.riskScore,
      urgencyScore: pendingResult.urgencyScore,
      rainForecast: pendingResult.rainForecast,
      rainChancePercent: pendingResult.rainChancePercent,
      reason: pendingResult.reason,
      lat: coords.lat,
      lng: coords.lng,
    });
    showToast(t("toast.reportSaved"), "success");
  }, [
    animationDone,
    pendingResult,
    preview,
    coords,
    locationLabel,
    addReport,
    showToast,
    t,
  ]);

  async function runAnalysis() {
    if (!preview || !coords) return;
    setError(null);
    setStep(2);
    setAnalyzing(true);
    setAnimationDone(false);
    setPendingResult(null);

    try {
      const analysis = await mockAnalyzeImage(preview);
      setPendingResult(analysis);
    } catch {
      setError(t("report.error"));
      setStep(1);
      setAnalyzing(false);
      setAnimationDone(false);
      setPendingResult(null);
    }
  }

  const handleAnalysisComplete = useCallback(() => {
    setAnimationDone(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runAnalysis();
  }

  function handleReset() {
    reportSavedRef.current = false;
    setStep(1);
    setResult(null);
    setPreview(null);
    setPreviewSource("none");
    setLocationNote("");
    setCoords(null);
    setMapKey((k) => k + 1);
    setAnalyzing(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  const stepVariants =
    step === 2
      ? slideLeftVariants
      : step >= 3
        ? scaleFadeVariants
        : fadeUpVariants;

  return (
    <div className="space-y-6">
      <StepIndicator current={step} labels={stepLabels} />
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={stepVariants}
          transition={motionTransition(reduced)}
        >
          {step === 2 && analyzing && (
            <AnalysisProgress
              title={t("report.analyzing")}
              steps={analyzeSteps}
              onComplete={handleAnalysisComplete}
            />
          )}

          {step === 3 && result && (
            <ResultCard
              result={result}
              location={locationLabel}
              scoreLabel={t("report.riskScore")}
              continueLabel={t("report.step.thanks")}
              dashboardLabel={t("report.viewDashboard")}
              onContinue={() => setStep(4)}
            />
          )}

          {step === 4 && result && (
            <ThankYouCard
              result={result}
              location={locationLabel}
              title={t("report.thanksTitle")}
              body={t("report.thanksBody")}
              scoreLabel={t("report.riskScore")}
              dashboardLabel={t("report.viewDashboard")}
              anotherLabel={t("report.submitAnother")}
              onReset={handleReset}
            />
          )}

          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />
              <PhotoUploadZone
                preview={preview}
                previewSource={previewSource}
                hint={t("report.photoHint")}
                tipItems={[
                  t("report.photoTipClear"),
                  t("report.photoTipLight"),
                  t("report.photoTipSharp"),
                ]}
                samples={SAMPLE_IMAGES}
                sampleLabels={sampleLabels}
                uploadLabel={t("report.uploadPhoto")}
                changeLabel={t("report.changePhoto")}
                sampleSectionLabel={t("report.sampleSection")}
                sampleBadgeLabel={t("report.sampleBadge")}
                onSelect={() => fileRef.current?.click()}
                onSampleSelect={handleSampleSelect}
              />

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-900">
                  {t("report.location")}
                </label>
                <LocationMapPicker
                  key={mapKey}
                  coords={coords}
                  onCoordsChange={handleCoordsChange}
                  labels={{
                    hint: t("report.locationHint"),
                    useMyLocation: t("report.useMyLocation"),
                    coords: t("report.coordsLabel"),
                    loading: t("common.loading"),
                  }}
                />
                <label
                  htmlFor="location-note"
                  className="mb-2 mt-4 block text-[13px] text-slate-600"
                >
                  {t("report.locationNote")}
                </label>
                <input
                  id="location-note"
                  type="text"
                  value={locationNote}
                  onChange={(e) => setLocationNote(e.target.value)}
                  placeholder={t("report.locationPlaceholder")}
                  className="h-[50px] w-full rounded-[12px] border border-slate-100 bg-white px-4 text-[17px] text-slate-900 outline-none focus:border-2 focus:border-brand-blue dark:bg-[var(--color-surface)]"
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`pressable h-[50px] w-full rounded-[12px] text-[17px] font-semibold text-white transition ${
                  canSubmit
                    ? "bg-brand-blue hover:bg-brand-blue-dark"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                {t("report.submit")}
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
