"use client";

import { useState } from "react";
import { Modal, PageHeader, StatusBadge } from "@/components/ui";

const initialClients = [
  {
    name: "Sophie Hart",
    pets: 2,
    phone: "07700 900123",
    email: "sophie.hart@example.com",
    lastVisit: "12 Jul 2026",
    status: "Active",
  },
  {
    name: "Daniel Reed",
    pets: 1,
    phone: "07370 112233",
    email: "daniel.reed@example.com",
    lastVisit: "09 Jul 2026",
    status: "Active",
  },
  {
    name: "Aisha Khan",
    pets: 2,
    phone: "07766 445566",
    email: "aisha.khan@example.com",
    lastVisit: "01 Jul 2026",
    status: "Due follow-up",
  },
  {
    name: "James Ward",
    pets: 1,
    phone: "07999 110022",
    email: "james.ward@example.com",
    lastVisit: "18 Jun 2026",
    status: "Active",
  },
  {
    name: "Lucy Cole",
    pets: 3,
    phone: "07888 334455",
    email: "lucy.cole@example.com",
    lastVisit: "06 Jul 2026",
    status: "Active",
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState(initialClients);
  const [notice, setNotice] = useState("Client list is ready.");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [clientForm, setClientForm] = useState({
    name: "Demo Client",
    pets: "1",
    phone: "07700 000000",
    email: "demo.client@example.com",
    lastVisit: "Today",
    status: "Active",
  });

  const handleNewClient = () => {
    const nextName = `Client ${clients.length + 1}`;
    setClientForm({
      name: nextName,
      pets: "1",
      phone: "07700 000000",
      email: `${nextName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      lastVisit: "Today",
      status: "Active",
    });
    setNotice(
      "New client form ready. Complete the details and add the profile.",
    );
    setIsFormOpen(true);
  };

  const handleCreateClient = () => {
    const name = clientForm.name.trim() || "Demo Client";
    const newClient = {
      name,
      pets: Number(clientForm.pets) || 1,
      phone: clientForm.phone || "07700 000000",
      email:
        clientForm.email ||
        `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      lastVisit: clientForm.lastVisit || "Today",
      status: clientForm.status || "Active",
    };

    setClients((current) => [newClient, ...current]);
    setNotice(`Client profile created for ${name}.`);
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New client"
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Client name", key: "name" },
              { label: "Pets", key: "pets" },
              { label: "Phone", key: "phone" },
              { label: "Email", key: "email" },
              { label: "Last visit", key: "lastVisit" },
            ].map((field) => (
              <label key={field.key} className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">
                  {field.label}
                </span>
                <input
                  value={clientForm[field.key as keyof typeof clientForm]}
                  onChange={(event) =>
                    setClientForm((current) => ({
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
                value={clientForm.status}
                onChange={(event) =>
                  setClientForm((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
              >
                <option>Active</option>
                <option>Due follow-up</option>
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
              onClick={handleCreateClient}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Add client
            </button>
          </div>
        </div>
      </Modal>

      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Clients"
          title="Client records"
          action={
            <button
              onClick={handleNewClient}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              + New client
            </button>
          }
        />

        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none md:max-w-md"
              placeholder="Search client or pet name"
            />
            <div className="flex gap-3">
              <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <option>All status</option>
                <option>Active</option>
                <option>Due follow-up</option>
              </select>
              <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700">
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Pets</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Last visit</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {clients.map((client) => (
                  <tr
                    key={`${client.name}-${client.email}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {client.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{client.pets}</td>
                    <td className="px-4 py-3 text-slate-600">{client.phone}</td>
                    <td className="px-4 py-3 text-slate-600">{client.email}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {client.lastVisit}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        variant={
                          client.status === "Active" ? "success" : "warning"
                        }
                      >
                        {client.status}
                      </StatusBadge>
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
