"use client";

import { useMemo, useState } from "react";
import { Modal, PageHeader, StatusBadge } from "@/components/ui";

const initialAppointmentRows = [
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
  {
    time: "14:15",
    pet: "Coco",
    owner: "Maya Price",
    vet: "Dr. Lewis",
    type: "Follow-up",
    status: "Confirmed",
  },
];

const quickBookingFields = [
  { key: "patient", label: "Patient", value: "Milo" },
  { key: "owner", label: "Owner", value: "Sophie Hart" },
  { key: "consultType", label: "Consult type", value: "Vaccination" },
  { key: "vet", label: "Vet", value: "Dr. Lewis" },
  { key: "date", label: "Date", value: "25 Aug 2026" },
  { key: "time", label: "Time", value: "09:00" },
] as const;

export default function AppointmentsPage() {
  const [appointmentRows, setAppointmentRows] = useState(
    initialAppointmentRows,
  );
  const [notice, setNotice] = useState("Demo booking ready.");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patient: "Milo",
    owner: "Sophie Hart",
    consultType: "Vaccination",
    vet: "Dr. Lewis",
    date: "25 Aug 2026",
    time: "09:00",
  });

  const summary = useMemo(
    () => [
      { label: "Today", value: String(appointmentRows.length) },
      {
        label: "Checked in",
        value: String(
          appointmentRows.filter((row) => row.status === "Checked in").length,
        ),
      },
      {
        label: "Pending",
        value: String(
          appointmentRows.filter((row) => row.status === "Pending").length,
        ),
      },
      { label: "No-shows", value: "2" },
    ],
    [appointmentRows],
  );

  const handleAddAppointment = () => {
    const newPatient = ["Mochi", "Scout", "Rosie", "Nori"][
      appointmentRows.length % 4
    ];

    setBookingForm({
      patient: newPatient,
      owner: "Demo Owner",
      consultType: "Check-up",
      vet: "Dr. Patel",
      date: "25 Aug 2026",
      time: "15:30",
    });

    setNotice(
      "New appointment form ready. Complete the details and confirm booking.",
    );
    setIsFormOpen(true);
  };

  const handleConfirmBooking = () => {
    const patient = bookingForm.patient || "Demo Pet";
    const owner = bookingForm.owner || "Demo Owner";
    const vet = bookingForm.vet || "Dr. Patel";
    const type = bookingForm.consultType || "Check-up";
    const time = bookingForm.time || "15:30";
    const date = bookingForm.date || "25 Aug 2026";

    setNotice(
      `Appointment confirmed for ${patient} with ${vet} on ${date} at ${time}.`,
    );
    setAppointmentRows((current) => [
      {
        time,
        pet: patient,
        owner,
        vet,
        type,
        status: "Confirmed",
      },
      ...current,
    ]);
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Operations"
          title="Appointments"
          action={
            <button
              onClick={handleAddAppointment}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
            >
              + New appointment
            </button>
          }
        />

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

        <Modal
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="New appointment"
        >
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {quickBookingFields.map((field) => (
                <label
                  key={field.label}
                  className="block text-sm text-slate-600"
                >
                  <span className="mb-2 block font-medium text-slate-700">
                    {field.label}
                  </span>
                  <input
                    value={bookingForm[field.key]}
                    onChange={(event) =>
                      setBookingForm((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white"
                  />
                </label>
              ))}
            </div>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Notes
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Owner requested a same-day check-in. Confirm room availability
                and notify the vet team.
              </p>
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
                onClick={handleConfirmBooking}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
              >
                Confirm booking
              </button>
            </div>
          </div>
        </Modal>

        <section className="mb-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Quick book
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  New appointment
                </h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                Live
              </span>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              Use the button in the header to open the booking form and create a
              demo appointment.
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Today
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  Surgery & consult schedule
                </h2>
              </div>
              <button className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                View full diary
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  time: "09:00",
                  title: "Vaccination • Milo",
                  room: "Room 1",
                  doctor: "Dr. Lewis",
                },
                {
                  time: "10:30",
                  title: "Consultation • Max",
                  room: "Room 2",
                  doctor: "Dr. Lewis",
                },
                {
                  time: "11:15",
                  title: "Dental review • Poppy",
                  room: "Treatment suite",
                  doctor: "Dr. Patel",
                },
                {
                  time: "13:30",
                  title: "Skin issue • Bella",
                  room: "Room 3",
                  doctor: "Dr. Singh",
                },
              ].map((slot) => (
                <div
                  key={slot.time}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sm font-semibold text-sky-700">
                      {slot.time.split(":")[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {slot.title}
                      </p>
                      <p className="text-sm text-slate-500">
                        {slot.doctor} • {slot.room}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                Day
              </button>
              <button className="rounded-xl bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-700">
                Week
              </button>
              <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                Month
              </button>
            </div>
            <div className="flex items-center gap-3">
              <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <option>All vets</option>
                <option>Dr. Lewis</option>
                <option>Dr. Patel</option>
              </select>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
                defaultValue="25 Aug 2026"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Pet</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Vet</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {appointmentRows.map((item) => (
                  <tr
                    key={`${item.time}-${item.pet}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {item.time}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {item.pet}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.owner}</td>
                    <td className="px-4 py-3 text-slate-600">{item.vet}</td>
                    <td className="px-4 py-3 text-slate-600">{item.type}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        variant={
                          item.status === "Confirmed"
                            ? "success"
                            : item.status === "Checked in"
                              ? "info"
                              : item.status === "In room"
                                ? "neutral"
                                : "warning"
                        }
                      >
                        {item.status}
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
