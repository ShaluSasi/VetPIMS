import Link from "next/link";
import { MetricCard, PageHeader, StatusBadge } from "@/components/ui";

const stats = [
  {
    label: "Today's appointments",
    value: "28",
    change: "+6.2%",
    tone: "emerald",
  },
  {
    label: "Open invoices",
    value: "£12,480",
    change: "+£1,240",
    tone: "sky",
  },
  {
    label: "Vaccination due",
    value: "14",
    change: "-3",
    tone: "amber",
  },
  {
    label: "Low stock items",
    value: "7",
    change: "2 urgent",
    tone: "rose",
  },
];

const appointments = [
  {
    time: "09:00",
    pet: "Milo",
    owner: "Sophie Hart",
    vet: "Dr. Lewis",
    type: "Vaccination",
    status: "Confirmed",
  },
  {
    time: "09:45",
    pet: "Luna",
    owner: "Daniel Reed",
    vet: "Dr. Patel",
    type: "Check-up",
    status: "Checked in",
  },
  {
    time: "10:30",
    pet: "Max",
    owner: "Aisha Khan",
    vet: "Dr. Lewis",
    type: "Consultation",
    status: "In room",
  },
  {
    time: "11:15",
    pet: "Poppy",
    owner: "James Ward",
    vet: "Dr. Patel",
    type: "Dental review",
    status: "Confirmed",
  },
  {
    time: "13:30",
    pet: "Bella",
    owner: "Lucy Cole",
    vet: "Dr. Singh",
    type: "Skin issue",
    status: "Pending",
  },
];

const reminders = [
  {
    name: "Milo Hart",
    type: "Vaccination due",
    due: "Today",
    status: "Scheduled",
  },
  {
    name: "Coco Price",
    type: "Follow-up call",
    due: "Tomorrow",
    status: "Pending",
  },
  {
    name: "Oscar Bell",
    type: "Invoice reminder",
    due: "2 days",
    status: "Queued",
  },
];

const patients = [
  {
    name: "Milo",
    type: "Dog",
    owner: "Sophie Hart",
    lastVisit: "12 Jul 2026",
    vet: "Dr. Lewis",
  },
  {
    name: "Luna",
    type: "Cat",
    owner: "Daniel Reed",
    lastVisit: "09 Jul 2026",
    vet: "Dr. Patel",
  },
  {
    name: "Freya",
    type: "Rabbit",
    owner: "Chloe Green",
    lastVisit: "03 Jul 2026",
    vet: "Dr. Singh",
  },
  {
    name: "Max",
    type: "Dog",
    owner: "Aisha Khan",
    lastVisit: "01 Jul 2026",
    vet: "Dr. Lewis",
  },
];

const stock = [
  {
    item: "Parvo vaccine",
    batch: "PV-2241",
    expiry: "12 Nov 2026",
    level: "18 boxes",
  },
  {
    item: "Flea treatment",
    batch: "FT-3398",
    expiry: "06 Sep 2026",
    level: "6 packs",
  },
  {
    item: "Amoxicillin 250mg",
    batch: "AMX-1209",
    expiry: "21 Aug 2026",
    level: "Low: 4 packs",
  },
  {
    item: "Analgesia gel",
    batch: "AG-4431",
    expiry: "19 Feb 2027",
    level: "12 bottles",
  },
];

const careFlow = [
  {
    stage: "Consultation",
    pet: "Milo",
    detail: "GI review • Dr. Lewis",
    status: "Complete",
    progress: "100%",
    tone: "emerald",
  },
  {
    stage: "Prescription",
    pet: "Luna",
    detail: "Skin treatment plan",
    status: "Ready",
    progress: "72%",
    tone: "sky",
  },
  {
    stage: "Treatment",
    pet: "Max",
    detail: "Post-op check • 3:10 pm",
    status: "Pending",
    progress: "48%",
    tone: "amber",
  },
  {
    stage: "Invoice",
    pet: "Poppy",
    detail: "Dental review balance",
    status: "Queued",
    progress: "26%",
    tone: "rose",
  },
];

export default function Home() {
  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Practice dashboard"
        action={
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            25 Aug 2026
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <MetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            tone={stat.tone as "emerald" | "sky" | "amber" | "rose"}
          />
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Schedule
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Today's appointments
              </h3>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              View calendar
            </button>
          </div>

          <div className="space-y-3">
            {appointments.map((appt) => (
              <div
                key={`${appt.time}-${appt.pet}`}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-sm font-semibold text-emerald-700">
                    {appt.time.split(":")[0]}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {appt.pet}
                    </p>
                    <p className="text-sm text-slate-500">
                      {appt.owner} • {appt.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:justify-end">
                  <div className="text-right text-sm text-slate-500">
                    <p>{appt.time}</p>
                    <p>{appt.vet}</p>
                  </div>
                  <StatusBadge
                    variant={
                      appt.status === "Confirmed"
                        ? "success"
                        : appt.status === "Checked in"
                          ? "info"
                          : appt.status === "In room"
                            ? "neutral"
                            : "warning"
                    }
                  >
                    {appt.status}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Actions
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Reminders
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {reminders.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.type}</p>
                  </div>
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                    {item.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                  <span>Due</span>
                  <span className="font-medium text-slate-700">{item.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Workflow
            </p>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">
              Care pathway overview
            </h3>
          </div>
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            View queue
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {careFlow.map((step) => (
            <div
              key={step.stage}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {step.stage}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    step.tone === "emerald"
                      ? "bg-emerald-100 text-emerald-700"
                      : step.tone === "sky"
                        ? "bg-sky-100 text-sky-700"
                        : step.tone === "amber"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {step.status}
                </span>
              </div>

              <p className="mt-4 text-lg font-bold text-slate-900">
                {step.pet}
              </p>
              <p className="mt-1 text-sm text-slate-600">{step.detail}</p>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-[0.14em] text-slate-400">
                  <span>Progress</span>
                  <span>{step.progress}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className={`h-2 rounded-full ${
                      step.tone === "emerald"
                        ? "bg-emerald-500"
                        : step.tone === "sky"
                          ? "bg-sky-500"
                          : step.tone === "amber"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                    }`}
                    style={{ width: step.progress }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Patients
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Recent records
              </h3>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              View all
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Pet</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Last visit</th>
                  <th className="px-4 py-3 font-medium">Vet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {patients.map((pet) => (
                  <tr key={pet.name} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {pet.name}
                      <span className="ml-2 text-xs text-slate-500">
                        {pet.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{pet.owner}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {pet.lastVisit}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{pet.vet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Inventory
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Stock alerts
              </h3>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Reorder
            </button>
          </div>

          <div className="space-y-3">
            {stock.map((item) => (
              <div
                key={item.item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.item}</p>
                    <p className="text-xs text-slate-500">
                      Batch: {item.batch}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      item.level.includes("Low")
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.level.includes("Low") ? "Urgent" : "Healthy"}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                  <span>Expiry</span>
                  <span className="font-medium text-slate-700">
                    {item.expiry}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
                  <span>Available</span>
                  <span className="font-medium text-slate-700">
                    {item.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
