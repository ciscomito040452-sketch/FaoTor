interface StatCardProps {
  label: string;
  value: number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-[16px] border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <p className="text-[13px] text-slate-600">{label}</p>
      <p className="mt-2 text-[28px] font-semibold leading-[1.35] text-slate-900">
        {value}
      </p>
    </div>
  );
}
