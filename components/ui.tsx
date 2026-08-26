import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-6 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {title}
          </h1>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    </header>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  change,
  tone = "emerald",
}: {
  label: string;
  value: string;
  change: string;
  tone?: "emerald" | "sky" | "amber" | "rose";
}) {
  const toneStyles: Record<typeof tone, string> = {
    emerald: "bg-emerald-100 text-emerald-700",
    sky: "bg-sky-100 text-sky-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{label}</p>
        <span
          className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${toneStyles[tone]}`}
        >
          {change}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>
        <span className="text-sm text-slate-400">↑</span>
      </div>
    </div>
  );
}

export function StatusBadge({
  children,
  variant = "neutral",
}: {
  children: ReactNode;
  variant?: "success" | "info" | "warning" | "neutral" | "danger";
}) {
  const variants: Record<typeof variant, string> = {
    success: "bg-emerald-100 text-emerald-700",
    info: "bg-sky-100 text-sky-700",
    warning: "bg-amber-100 text-amber-700",
    neutral: "bg-slate-100 text-slate-700",
    danger: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-3xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Create record
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
