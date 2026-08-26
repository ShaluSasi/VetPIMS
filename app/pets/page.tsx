"use client";

import { useState } from "react";
import { Modal } from "@/components/ui";

const initialPets = [
  {
    name: "Milo",
    species: "Dog",
    breed: "Border Collie",
    owner: "Sophie Hart",
    age: "5 years",
    status: "Healthy",
  },
  {
    name: "Luna",
    species: "Cat",
    breed: "British Shorthair",
    owner: "Daniel Reed",
    age: "3 years",
    status: "Monitoring",
  },
  {
    name: "Bella",
    species: "Dog",
    breed: "Cocker Spaniel",
    owner: "Lucy Cole",
    age: "7 years",
    status: "Follow-up",
  },
  {
    name: "Poppy",
    species: "Rabbit",
    breed: "Mini Lop",
    owner: "James Ward",
    age: "2 years",
    status: "Healthy",
  },
];

function StatusPill({ value }: { value: string }) {
  const tones: Record<string, string> = {
    Healthy: "bg-emerald-100 text-emerald-700",
    Monitoring: "bg-amber-100 text-amber-700",
    "Follow-up": "bg-sky-100 text-sky-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tones[value] ?? "bg-slate-100 text-slate-700"}`}
    >
      {value}
    </span>
  );
}

export default function PetsPage() {
  const [pets, setPets] = useState(initialPets);
  const [notice, setNotice] = useState("Patient register is ready.");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [petForm, setPetForm] = useState({
    name: "Mochi",
    species: "Dog",
    breed: "Cavalier King Charles Spaniel",
    owner: "Demo Client",
    age: "1 year",
    status: "Healthy",
  });

  const handleAddPet = () => {
    setPetForm({
      name: "Mochi",
      species: "Dog",
      breed: "Cavalier King Charles Spaniel",
      owner: "Demo Client",
      age: "1 year",
      status: "Healthy",
    });
    setNotice("New pet form ready. Complete the details and add the patient.");
    setIsFormOpen(true);
  };

  const handleCreatePet = () => {
    const newPet = {
      name: petForm.name.trim() || "Mochi",
      species: petForm.species || "Dog",
      breed: petForm.breed || "Mixed breed",
      owner: petForm.owner || "Demo Client",
      age: petForm.age || "1 year",
      status: petForm.status || "Healthy",
    };

    setPets((current) => [newPet, ...current]);
    setNotice(`Patient ${newPet.name} has been added to the register.`);
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New pet"
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Pet name", key: "name" },
              { label: "Species", key: "species" },
              { label: "Breed", key: "breed" },
              { label: "Owner", key: "owner" },
              { label: "Age", key: "age" },
            ].map((field) => (
              <label key={field.key} className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">
                  {field.label}
                </span>
                <input
                  value={petForm[field.key as keyof typeof petForm]}
                  onChange={(event) =>
                    setPetForm((current) => ({
                      ...current,
                      [field.key]: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
                />
              </label>
            ))}

            <label className="block text-sm text-slate-600">
              <span className="mb-2 block font-medium text-slate-700">
                Status
              </span>
              <select
                value={petForm.status}
                onChange={(event) =>
                  setPetForm((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
              >
                <option>Healthy</option>
                <option>Monitoring</option>
                <option>Follow-up</option>
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
              onClick={handleCreatePet}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Add pet
            </button>
          </div>
        </div>
      </Modal>

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
              Pets
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Patient register
            </h1>
          </div>
          <button
            onClick={handleAddPet}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            + Add pet
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: "Registered pets", value: String(pets.length) },
            { label: "Vaccinations due", value: "14" },
            { label: "Active care plans", value: "11" },
            { label: "New this month", value: "9" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Pet</th>
                  <th className="px-4 py-3 font-medium">Species</th>
                  <th className="px-4 py-3 font-medium">Breed</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Age</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {pets.map((pet) => (
                  <tr
                    key={`${pet.name}-${pet.owner}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {pet.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{pet.species}</td>
                    <td className="px-4 py-3 text-slate-600">{pet.breed}</td>
                    <td className="px-4 py-3 text-slate-600">{pet.owner}</td>
                    <td className="px-4 py-3 text-slate-600">{pet.age}</td>
                    <td className="px-4 py-3">
                      <StatusPill value={pet.status} />
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
