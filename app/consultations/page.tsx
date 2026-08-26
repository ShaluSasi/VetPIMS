"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui";

const templates = [
  "Routine exam",
  "Vaccination",
  "Skin complaint",
  "Dental review",
  "Follow-up",
  "Post-op check",
];

const soap = [
  {
    label: "Subjective",
    value:
      "Dog mildly lethargic, less active than usual over the past 2 days. Owner reports reduced appetite.",
  },
  {
    label: "Objective",
    value:
      "Temp 39.3°C. Mild dehydration. No obvious respiratory distress. Lymph nodes normal on palpation.",
  },
  {
    label: "Assessment",
    value:
      "Likely mild gastrointestinal upset; rule out dietary indiscretion or early infection.",
  },
  {
    label: "Plan",
    value:
      "Continue bland diet for 48 hours, monitor hydration, recheck in 3 days if symptoms continue.",
  },
];

export default function ConsultationPage() {
  const [saved, setSaved] = useState(false);
  const [consultForm, setConsultForm] = useState({
    reason: "Reduced appetite and mild lethargy",
    diagnosis: "GI upset / monitoring",
    subjective:
      "Dog mildly lethargic, less active than usual over the past 2 days. Owner reports reduced appetite.",
    objective:
      "Temp 39.3°C. Mild dehydration. No obvious respiratory distress. Lymph nodes normal on palpation.",
    assessment:
      "Likely mild gastrointestinal upset; rule out dietary indiscretion or early infection.",
    plan: "Continue bland diet for 48 hours, monitor hydration, recheck in 3 days if symptoms continue.",
    treatment:
      "Bland diet, hydration monitoring, oral rehydration if needed, recheck in 3 days.",
    followUp: "03 Sep 2026 • 10:30",
  });

  const handleFieldChange = (
    field: keyof typeof consultForm,
    value: string,
  ) => {
    setConsultForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Clinical"
          title="Consultation"
          action={
            <button
              onClick={() => setSaved(true)}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Save note
            </button>
          }
        />

        {saved ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Consultation note saved successfully. The patient chart is now ready
            for review.
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Patient
            </p>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <h2 className="text-xl font-bold text-slate-900">Milo</h2>
              <p className="mt-1 text-sm text-slate-600">
                Dog • Border Collie • 5 years
              </p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-900">Owner:</span>{" "}
                  Sophie Hart
                </p>
                <p>
                  <span className="font-medium text-slate-900">Vet:</span> Dr.
                  Lewis
                </p>
                <p>
                  <span className="font-medium text-slate-900">
                    Last visit:
                  </span>{" "}
                  12 Jul 2026
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-slate-700">Templates</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {templates.map((template) => (
                  <button
                    key={template}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Reason for visit
                </label>
                <input
                  value={consultForm.reason}
                  onChange={(event) =>
                    handleFieldChange("reason", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Diagnosis
                </label>
                <input
                  value={consultForm.diagnosis}
                  onChange={(event) =>
                    handleFieldChange("diagnosis", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {[
                { label: "Subjective", key: "subjective" },
                { label: "Objective", key: "objective" },
                { label: "Assessment", key: "assessment" },
                { label: "Plan", key: "plan" },
              ].map((section) => (
                <div key={section.label}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {section.label}
                  </label>
                  <textarea
                    rows={4}
                    value={consultForm[section.key as keyof typeof consultForm]}
                    onChange={(event) =>
                      handleFieldChange(
                        section.key as keyof typeof consultForm,
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Treatment plan
                </label>
                <textarea
                  rows={4}
                  value={consultForm.treatment}
                  onChange={(event) =>
                    handleFieldChange("treatment", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Follow-up
                </label>
                <input
                  value={consultForm.followUp}
                  onChange={(event) =>
                    handleFieldChange("followUp", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
