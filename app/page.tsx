import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-12">
      <div className="text-center">
        <Image
          src="/logo.svg"
          alt="เฝ้าท่อ"
          width={96}
          height={96}
          className="mx-auto"
          priority
        />
        <h1
          className="mt-6 text-[34px] font-bold leading-[1.35] tracking-[-0.02em] text-slate-900"
        >
          เฝ้าท่อ
        </h1>
        <p className="mt-4 text-[17px] text-slate-600">
          ระบบให้ชุมชนรายงานสภาพท่อระบายน้ำ
          <br />
          AI วิเคราะห์ความเสี่ยง เจ้าหน้าที่จัดลำดับลอกท่อ
        </p>
        <p className="mt-2 text-[13px] text-slate-400">
          เวอร์ชัน Demo สำหรับนำเสนอ — ข้อมูลจำลอง
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <Link
          href="/report"
          className="flex h-[50px] items-center justify-center rounded-[12px] bg-blue-500 text-[17px] font-semibold text-white hover:bg-blue-700"
        >
          รายงานท่อ (ชุมชน)
        </Link>
        <Link
          href="/dashboard"
          className="flex h-[50px] items-center justify-center rounded-[12px] border border-slate-100 bg-white text-[17px] font-semibold text-slate-900 hover:bg-slate-50"
        >
          แดชบอร์ด (เจ้าหน้าที่)
        </Link>
      </div>
    </main>
  );
}
