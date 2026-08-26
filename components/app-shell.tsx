"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Appointments", href: "/appointments" },
  { label: "Clients", href: "/clients" },
  { label: "Pets", href: "/pets" },
  { label: "Consultations", href: "/consultations" },
  { label: "Prescriptions", href: "/prescriptions" },
  { label: "Inventory", href: "/inventory" },
  { label: "Invoices", href: "/invoices" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-72 shrink-0 rounded-3xl bg-slate-900 p-5 text-slate-100 shadow-xl lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3 border-b border-slate-700 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-lg font-bold text-slate-900">
              V
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Clinic
              </p>
              <h1 className="text-xl font-semibold">VETPIMS</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs">•</span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-700 bg-slate-800/80 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Today
            </p>
            <p className="mt-2 text-2xl font-bold">28</p>
            <p className="mt-1 text-sm text-slate-300">
              appointments scheduled
            </p>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 lg:hidden">
            <div className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
