"use client";

import { useState } from "react";
import { Modal } from "@/components/ui";

const initialInventory = [
  {
    item: "Parvo vaccine",
    batch: "PV-2241",
    expiry: "12 Nov 2026",
    stock: "18 boxes",
    supplier: "VetSupply UK",
    status: "Healthy",
  },
  {
    item: "Flea treatment",
    batch: "FT-3398",
    expiry: "06 Sep 2026",
    stock: "6 packs",
    supplier: "PetCare Ltd",
    status: "Healthy",
  },
  {
    item: "Amoxicillin 250mg",
    batch: "AMX-1209",
    expiry: "21 Aug 2026",
    stock: "4 packs",
    supplier: "VetSupply UK",
    status: "Low",
  },
  {
    item: "Analgesia gel",
    batch: "AG-4431",
    expiry: "19 Feb 2027",
    stock: "12 bottles",
    supplier: "PetCare Ltd",
    status: "Healthy",
  },
];

function StatusPill({ value }: { value: string }) {
  const tones: Record<string, string> = {
    Healthy: "bg-emerald-100 text-emerald-700",
    Low: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tones[value] ?? "bg-slate-100 text-slate-700"}`}
    >
      {value}
    </span>
  );
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [notice, setNotice] = useState("Stock list is ready.");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [stockForm, setStockForm] = useState({
    item: "Demo Antibiotic",
    batch: "DEMO-102",
    expiry: "18 Dec 2026",
    stock: "12 packs",
    supplier: "Demo Pharma",
    status: "Healthy",
  });

  const handleAddStock = () => {
    setStockForm({
      item: "Demo Antibiotic",
      batch: "DEMO-102",
      expiry: "18 Dec 2026",
      stock: "12 packs",
      supplier: "Demo Pharma",
      status: "Healthy",
    });
    setNotice("New stock form ready. Complete the details and add the item.");
    setIsFormOpen(true);
  };

  const handleCreateStock = () => {
    const newItem = {
      item: stockForm.item || "Demo Antibiotic",
      batch: stockForm.batch || "DEMO-102",
      expiry: stockForm.expiry || "18 Dec 2026",
      stock: stockForm.stock || "12 packs",
      supplier: stockForm.supplier || "Demo Pharma",
      status: stockForm.status || "Healthy",
    };

    setInventory((current) => [newItem, ...current]);
    setNotice(`${newItem.item} added to the pharmacy list.`);
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add stock item"
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Item", key: "item" },
              { label: "Batch", key: "batch" },
              { label: "Expiry", key: "expiry" },
              { label: "Stock", key: "stock" },
              { label: "Supplier", key: "supplier" },
            ].map((field) => (
              <label key={field.key} className="block text-sm text-slate-600">
                <span className="mb-2 block font-medium text-slate-700">
                  {field.label}
                </span>
                <input
                  value={stockForm[field.key as keyof typeof stockForm]}
                  onChange={(event) =>
                    setStockForm((current) => ({
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
                value={stockForm.status}
                onChange={(event) =>
                  setStockForm((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
              >
                <option>Healthy</option>
                <option>Low</option>
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
              onClick={handleCreateStock}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Add stock
            </button>
          </div>
        </div>
      </Modal>

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
              Pharmacy
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Inventory
            </h1>
          </div>
          <button
            onClick={handleAddStock}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            + Add stock
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {[
            { label: "Items tracked", value: String(inventory.length) },
            { label: "Low stock", value: "7" },
            { label: "Expiring soon", value: "11" },
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
                  <th className="px-4 py-3 font-medium">Item</th>
                  <th className="px-4 py-3 font-medium">Batch</th>
                  <th className="px-4 py-3 font-medium">Expiry</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Supplier</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {inventory.map((item) => (
                  <tr
                    key={`${item.item}-${item.batch}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {item.item}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.batch}</td>
                    <td className="px-4 py-3 text-slate-600">{item.expiry}</td>
                    <td className="px-4 py-3 text-slate-600">{item.stock}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.supplier}
                    </td>
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
