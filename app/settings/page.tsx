const policyItems = [
  { name: "Two-factor authentication", status: "Enabled" },
  { name: "Password rotation", status: "Required 90 days" },
  { name: "Data backup", status: "Daily" },
  { name: "Audit log retention", status: "7 years" },
];

const team = [
  { name: "Dr. Lewis", role: "Veterinarian", status: "Online" },
  { name: "Dr. Patel", role: "Veterinarian", status: "Online" },
  { name: "Dr. Singh", role: "Veterinarian", status: "Away" },
  { name: "Nina Clark", role: "Nurse", status: "Online" },
];

const featureToggles = [
  "Client portal",
  "Online booking",
  "Vaccination reminders",
  "SMS notifications",
  "Prescription audit trail",
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
            Administration
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Settings</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Security
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Practice policies
            </h2>

            <div className="mt-5 space-y-3">
              {policyItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Users
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Team access
            </h2>

            <div className="mt-5 space-y-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">{member.name}</p>
                    <p className="text-sm text-slate-500">{member.role}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${member.status === "Online" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
            Features
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            System modules
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {featureToggles.map((feature) => (
              <label
                key={feature}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3"
              >
                <span className="font-medium text-slate-700">{feature}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-emerald-600"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
