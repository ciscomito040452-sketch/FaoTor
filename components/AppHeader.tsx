import Image from "next/image";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/Logo.svg" alt="เฝ้าท่อ" width={40} height={40} />
        <span className="text-[17px] font-semibold text-slate-900">เฝ้าท่อ</span>
      </Link>
      <span className="rounded-full bg-blue-50 px-3 py-1 text-[13px] font-medium text-blue-500">
        Demo
      </span>
    </header>
  );
}
