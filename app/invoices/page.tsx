"use client";

import { useMemo, useState } from "react";
import { Modal } from "@/components/ui";

const initialInvoices = [
  {
    id: "INV-1047",
    client: "Sophie Hart",
    pet: "Milo",
    total: "£142.80",
    vat: "£23.80",
    status: "Paid",
  },
  {
    id: "INV-1048",
    client: "Daniel Reed",
    pet: "Luna",
    total: "£68.00",
    vat: "£11.33",
    status: "Partial",
  },
  {
    id: "INV-1049",
    client: "Lucy Cole",
    pet: "Bella",
    total: "£210.50",
    vat: "£35.08",
    status: "Outstanding",
  },
  {
    id: "INV-1050",
    client: "Aisha Khan",
    pet: "Max",
    total: "£96.40",
    vat: "£16.07",
    status: "Paid",
  },
];

function StatusPill({ value }: { value: string }) {
  const tones: Record<string, string> = {
    Paid: "bg-emerald-100 text-emerald-700",
    Partial: "bg-amber-100 text-amber-700",
    Outstanding: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tones[value] ?? "bg-slate-100 text-slate-700"}`}
    >
      {value}
    </span>
  );
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [notice, setNotice] = useState("Finance queue is ready.");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    client: "Demo Client",
    pet: "Mochi",
    total: "£180.00",
    vat: "£30.00",
    status: "Outstanding",
  });

  const summary = useMemo(
    () => [
      { label: "This week", value: "£6,420" },
      { label: "Collected", value: "£5,180" },
      { label: "Outstanding", value: "£1,240" },
      { label: "VAT due", value: "£410" },
    ],
    [invoices],
  );

  const handleAddInvoice = () => {
    setInvoiceForm({
      client: "Demo Client",
      pet: "Mochi",
      total: "£180.00",
      vat: "£30.00",
      status: "Outstanding",
    });
    setNotice("New invoice form ready. Complete the details and issue it.");
    setIsFormOpen(true);
  };

  const handleCreateInvoice = () => {
    const newInvoice = {
      id: `INV-${1000 + invoices.length + 1}`,
      client: invoiceForm.client || "Demo Client",
      pet: invoiceForm.pet || "Mochi",
      total: invoiceForm.total || "£180.00",
      vat: invoiceForm.vat || "£30.00",
      status: invoiceForm.status || "Outstanding",
    };

    setInvoices((current) => [newInvoice, ...current]);
    setNotice(`Invoice ${newInvoice.id} created for ${newInvoice.pet}.`);
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New invoice"
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Client", key: "client" },
              { label: "Pet", key: "pet" },
              { label: "Total", key: "total" },
              { label: "VAT", key: "vat" },
            ].map((field) => (
              <label key={field.key} className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">
                  {field.label}
                </span>
                <input
                  value={invoiceForm[field.key as keyof typeof invoiceForm]}
                  onChange={(event) =>
                    setInvoiceForm((current) => ({
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
                value={invoiceForm.status}
                onChange={(event) =>
                  setInvoiceForm((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
              >
                <option>Outstanding</option>
                <option>Paid</option>
                <option>Partial</option>
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
              onClick={handleCreateInvoice}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Issue invoice
            </button>
          </div>
        </div>
      </Modal>

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
              Finance
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Invoices</h1>
          </div>
          <button
            onClick={handleAddInvoice}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            + New invoice
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {summary.map((item) => (
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
                  <th className="px-4 py-3 font-medium">Invoice</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Pet</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">VAT</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {invoices.map((item) => (
                  <tr
                    key={`${item.id}-${item.pet}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.client}</td>
                    <td className="px-4 py-3 text-slate-600">{item.pet}</td>
                    <td className="px-4 py-3 text-slate-600">{item.total}</td>
                    <td className="px-4 py-3 text-slate-600">{item.vat}</td>
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
