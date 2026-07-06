import { ShieldDropletIcon } from "./ShieldDropletIcon";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShieldDropletIcon className="mb-4 h-12 w-12 text-slate-400" />
      <p className="text-[17px] font-semibold text-slate-600">ยังไม่มีรายงาน</p>
      <p className="mt-2 max-w-xs text-[17px] text-slate-600">
        เมื่อชุมชนส่งรายงานเข้ามา รายการจะปรากฏที่นี่
      </p>
    </div>
  );
}
