const summary = [
  { label: "Revenue this month", value: "£24,680", change: "+12.5%" },
  { label: "Appointments booked", value: "612", change: "+9.1%" },
  { label: "Vaccinations completed", value: "138", change: "+6.3%" },
  { label: "Outstanding invoices", value: "£1,240", change: "-4.2%" },
];

const chartData = [
  { name: "Jan", revenue: 1400 },
  { name: "Feb", revenue: 1800 },
  { name: "Mar", revenue: 2300 },
  { name: "Apr", revenue: 2100 },
  { name: "May", revenue: 2600 },
  { name: "Jun", revenue: 3100 },
  { name: "Jul", revenue: 3540 },
];

const topServices = [
  { name: "Consultations", count: 189, revenue: "£8,610" },
  { name: "Vaccinations", count: 138, revenue: "£4,320" },
  { name: "Dental", count: 56, revenue: "£3,260" },
  { name: "Diagnostics", count: 42, revenue: "£2,240" },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
            Analytics
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Reports</h1>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <p className="text-3xl font-bold text-slate-900">
                  {item.value}
                </p>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Revenue
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  Monthly income
                </h2>
              </div>
              <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                Download
              </button>
            </div>

            <div className="flex h-64 items-end gap-3">
              {chartData.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <div className="flex w-full justify-center">
                    <div
                      className="w-full rounded-t-2xl bg-gradient-to-t from-emerald-600 to-emerald-400"
                      style={{ height: `${(item.revenue / 4000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Top services
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Revenue mix
            </h2>

            <div className="mt-5 space-y-4">
              {topServices.map((service) => (
                <div
                  key={service.name}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900">{service.name}</p>
                    <span className="text-sm font-medium text-slate-600">
                      {service.revenue}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                    <span>{service.count} visits</span>
                    <span>42%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${Math.min((service.count / 190) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
