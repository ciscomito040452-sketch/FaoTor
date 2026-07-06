import { AppHeader } from "@/components/AppHeader";
import { UploadForm } from "@/components/UploadForm";

export default function ReportPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] px-6 py-8">
      <AppHeader />
      <h1 className="mb-8 text-[34px] font-bold leading-[1.35] tracking-[-0.02em] text-slate-900">
        รายงานท่อระบายน้ำ
      </h1>
      <UploadForm />
    </main>
  );
}
