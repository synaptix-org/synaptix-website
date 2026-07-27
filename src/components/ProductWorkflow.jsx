import { FolderSearch, ListChecks, MapPinCheck, Inbox, PackageCheck, ShieldCheck, History } from 'lucide-react'
import Reveal from './Reveal'

const STEPS = [
  {
    icon: FolderSearch,
    title: 'Select the study',
    desc: "Hospital A selects an export from its existing clinical system.",
  },
  {
    icon: ListChecks,
    title: 'Confirm the contents',
    desc: 'Synaptix identifies the files that belong to the same clinical study.',
  },
  {
    icon: MapPinCheck,
    title: 'Verify the destination',
    desc: 'The sender selects the receiving hospital and exact department and confirms the destination before sending.',
  },
  {
    icon: Inbox,
    title: 'Receive securely',
    desc: "Hospital B receives the study through its authenticated organizational inbox.",
  },
]

const CAPABILITIES = [
  {
    icon: PackageCheck,
    title: 'Complete-study delivery',
    desc: 'Move all connected study files together.',
  },
  {
    icon: MapPinCheck,
    title: 'Verified destination',
    desc: 'Deliver to a specific hospital and department.',
  },
  {
    icon: ShieldCheck,
    title: 'Recipient-controlled access',
    desc: 'No shared package passwords or anonymous links.',
  },
  {
    icon: History,
    title: 'Chain of custody',
    desc: 'Track preparation, delivery, receipt, and access.',
  },
]

export default function ProductWorkflow() {
  return (
    <section id="product" className="px-6 py-24 bg-brand-50/30">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm font-medium text-brand-500 mb-3">The product</p>
          <h2 className="text-3xl font-semibold text-brand-900 tracking-tight mb-4 max-w-2xl">
            One workflow for the complete clinical study.
          </h2>
          <p className="text-brand-600 leading-relaxed max-w-2xl mb-14">
            Synaptix keeps recordings, video, reports, annotations, and metadata together
            from the sending hospital to the receiving department.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ol className="grid md:grid-cols-4 gap-6 mb-10">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-brand-100 bg-white p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-brand-400">0{i + 1}</span>
                  <step.icon size={16} className="text-brand-500" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-brand-900 mb-1.5">{step.title}</h3>
                <p className="text-xs text-brand-600 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-center text-brand-800 font-medium max-w-2xl mx-auto mb-16 border-y border-brand-100 py-6">
            Synaptix does not replace existing clinical systems. It replaces the manual
            transfer process between them.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="flex flex-col gap-2">
                <cap.icon size={18} className="text-brand-500" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-brand-900">{cap.title}</h3>
                <p className="text-xs text-brand-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
