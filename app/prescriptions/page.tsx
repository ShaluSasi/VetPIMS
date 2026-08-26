"use client";

import { useState } from "react";
import { Modal } from "@/components/ui";

const initialPrescriptions = [
  {
    pet: "Milo",
    owner: "Sophie Hart",
    drug: "Amoxicillin",
    dosage: "250mg",
    instructions: "Twice daily for 5 days",
    vet: "Dr. Lewis",
    status: "Issued",
  },
  {
    pet: "Luna",
    owner: "Daniel Reed",
    drug: "Flea treatment",
    dosage: "1 pipette",
    instructions: "Apply monthly",
    vet: "Dr. Patel",
    status: "Dispensed",
  },
  {
    pet: "Bella",
    owner: "Lucy Cole",
    drug: "Prednisolone",
    dosage: "5mg",
    instructions: "Reduce over 7 days",
    vet: "Dr. Singh",
    status: "Pending review",
  },
];

function StatusPill({ value }: { value: string }) {
  const tones: Record<string, string> = {
    Issued: "bg-emerald-100 text-emerald-700",
    Dispensed: "bg-sky-100 text-sky-700",
    "Pending review": "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tones[value] ?? "bg-slate-100 text-slate-700"}`}
    >
      {value}
    </span>
  );
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [notice, setNotice] = useState("Medication list is ready.");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [prescriptionForm, setPrescriptionForm] = useState({
    pet: "Rosie",
    owner: "Demo Client",
    drug: "Gabapentin",
    dosage: "100mg",
    instructions: "Twice daily for 3 days",
    vet: "Dr. Lewis",
    status: "Issued",
  });

  const handleAddPrescription = () => {
    setPrescriptionForm({
      pet: "Rosie",
      owner: "Demo Client",
      drug: "Gabapentin",
      dosage: "100mg",
      instructions: "Twice daily for 3 days",
      vet: "Dr. Lewis",
      status: "Issued",
    });
    setNotice("New prescription form ready. Complete the fields and issue it.");
    setIsFormOpen(true);
  };

  const handleCreatePrescription = () => {
    const newEntry = {
      pet: prescriptionForm.pet || "Rosie",
      owner: prescriptionForm.owner || "Demo Client",
      drug: prescriptionForm.drug || "Gabapentin",
      dosage: prescriptionForm.dosage || "100mg",
      instructions: prescriptionForm.instructions || "Twice daily for 3 days",
      vet: prescriptionForm.vet || "Dr. Lewis",
      status: prescriptionForm.status || "Issued",
    };

    setPrescriptions((current) => [newEntry, ...current]);
    setNotice(`Prescription issued for ${newEntry.pet}.`);
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New prescription"
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Pet", key: "pet" },
              { label: "Owner", key: "owner" },
              { label: "Drug", key: "drug" },
              { label: "Dosage", key: "dosage" },
              { label: "Vet", key: "vet" },
            ].map((field) => (
              <label key={field.key} className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">
                  {field.label}
                </span>
                <input
                  value={
                    prescriptionForm[field.key as keyof typeof prescriptionForm]
                  }
                  onChange={(event) =>
                    setPrescriptionForm((current) => ({
                      ...current,
                      [field.key]: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
                />
              </label>
            ))}

            <label className="block text-sm text-slate-600 xl:col-span-2">
              <span className="mb-2 block font-medium text-slate-700">
                Instructions
              </span>
              <textarea
                value={prescriptionForm.instructions}
                onChange={(event) =>
                  setPrescriptionForm((current) => ({
                    ...current,
                    instructions: event.target.value,
                  }))
                }
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
              />
            </label>

            <label className="block text-sm text-slate-600">
              <span className="mb-2 block font-medium text-slate-700">
                Status
              </span>
              <select
                value={prescriptionForm.status}
                onChange={(event) =>
                  setPrescriptionForm((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
              >
                <option>Issued</option>
                <option>Dispensed</option>
                <option>Pending review</option>
              </select>
            </label>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePrescription}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Issue prescription
            </button>
          </div>
        </div>
      </Modal>

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
              Medication
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Prescriptions
            </h1>
          </div>
          <button
            onClick={handleAddPrescription}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            + New prescription
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Pet</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Drug</th>
                  <th className="px-4 py-3 font-medium">Dosage</th>
                  <th className="px-4 py-3 font-medium">Instructions</th>
                  <th className="px-4 py-3 font-medium">Vet</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {prescriptions.map((item) => (
                  <tr
                    key={`${item.pet}-${item.drug}-${item.vet}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {item.pet}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.owner}</td>
                    <td className="px-4 py-3 text-slate-600">{item.drug}</td>
                    <td className="px-4 py-3 text-slate-600">{item.dosage}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.instructions}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.vet}</td>
                    <td className="px-4 py-3">
                      <StatusPill value={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
