"use client";

import { useRef, useState } from "react";
import { mockAnalyzeImage } from "@/lib/mock-analyze";
import { useReports } from "@/lib/reports-store";
import type { AnalyzeResult } from "@/lib/types";
import { RiskBadge } from "./RiskBadge";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorBanner } from "./ErrorBanner";

type Step = "form" | "loading" | "result";

export function UploadForm() {
  const { addReport } = useReports();
  const fileRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("form");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = Boolean(preview && location.trim());

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!preview || !location.trim()) return;

    setError(null);
    setStep("loading");

    try {
      const analysis = await mockAnalyzeImage(preview);
      setResult(analysis);
      addReport({
        imageUrl: preview,
        location: location.trim(),
        riskLevel: analysis.riskLevel,
        riskScore: analysis.riskScore,
        reason: analysis.reason,
      });
      setStep("result");
    } catch {
      setError("ไม่สามารถวิเคราะห์ภาพได้ กรุณาถ่ายใหม่ให้เห็นท่อชัดขึ้น");
      setStep("form");
    }
  }

  function handleReset() {
    setStep("form");
    setResult(null);
    setPreview(null);
    setLocation("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-6">
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {step === "loading" && (
        <div className="flex items-center justify-center gap-3 py-12">
          <LoadingSpinner />
          <span className="text-[15px] text-slate-600">กำลังวิเคราะห์ภาพ...</span>
        </div>
      )}

      {step === "result" && result && (
        <div className="space-y-6">
          <div className="rounded-[16px] border border-slate-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <RiskBadge level={result.riskLevel} />
            <p className="mt-4 text-[15px] leading-[1.35] text-slate-600">
              {result.reason}
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="h-[50px] w-full rounded-[12px] border border-slate-100 bg-transparent text-[17px] font-semibold text-slate-900"
          >
            ส่งรายงานอีกจุด
          </button>
        </div>
      )}

      {step === "form" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex h-[200px] w-full items-center justify-center overflow-hidden rounded-[12px] border-2 border-dashed border-slate-100 bg-white"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="ตัวอย่างรูปท่อ"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[15px] text-slate-600">
                แตะเพื่อถ่ายรูป/เลือกรูป
              </span>
            )}
          </button>

          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-[13px] text-slate-600"
            >
              ตำแหน่ง
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="เช่น ซอยลาดพร้าว 42"
              className="h-[50px] w-full rounded-[12px] border border-slate-100 bg-white px-4 text-[17px] text-slate-900 outline-none focus:border-2 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`h-[50px] w-full rounded-[12px] text-[17px] font-semibold text-white ${
              canSubmit
                ? "bg-blue-500 hover:bg-blue-700"
                : "cursor-not-allowed bg-slate-100 text-slate-400"
            }`}
          >
            ส่งรายงาน
          </button>
        </form>
      )}
    </div>
  );
}
