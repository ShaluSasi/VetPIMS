import { PageHeader, Panel } from "@/components/ui";

const contactEmail = "noveltratechnologies@gmail.com";

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Support" title="Contact Us" />

      <Panel className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
          Email
        </p>
        <a
          href={`mailto:${contactEmail}`}
          className="mt-3 inline-block text-lg font-semibold text-emerald-700 hover:text-emerald-800"
        >
          {contactEmail}
        </a>
      </Panel>
    </>
  );
}
