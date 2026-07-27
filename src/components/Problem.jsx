import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const POINTS = [
  'Large files do not move cleanly through existing hospital systems.',
  'Connected study components often arrive separately.',
  'The sender may not know whether the correct department received a usable study.',
]

function FlowStep({ label, muted = false }) {
  return (
    <div
      className={`px-3 py-2 rounded-lg text-sm text-center border ${
        muted
          ? 'border-brand-100 bg-white text-brand-500'
          : 'border-brand-200 bg-brand-50 text-brand-800 font-medium'
      }`}
    >
      {label}
    </div>
  )
}

export default function Problem() {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm font-medium text-brand-500 mb-3">The problem</p>
          <h2 className="text-3xl font-semibold text-brand-900 tracking-tight mb-6 max-w-2xl">
            Large clinical studies still move through outdated workflows.
          </h2>
          <p className="text-brand-600 leading-relaxed max-w-2xl mb-14">
            A clinical study may contain hundreds of gigabytes of recordings, synchronized
            video, reports, annotations, and metadata. Existing hospital systems were not
            designed to move all of these components together between institutions.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid md:grid-cols-2 gap-8 mb-14">
            <div className="rounded-xl border border-brand-100 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-400 mb-4">
                Current workflow
              </p>
              <div className="flex flex-col gap-2">
                <FlowStep label="Hospital A" />
                <ArrowRight size={14} className="text-brand-300 mx-auto" aria-hidden="true" />
                <FlowStep label="Manual export" muted />
                <ArrowRight size={14} className="text-brand-300 mx-auto" aria-hidden="true" />
                <FlowStep label="CD, USB, fax, or separate file links" muted />
                <ArrowRight size={14} className="text-brand-300 mx-auto" aria-hidden="true" />
                <FlowStep label="Manual coordination" muted />
                <ArrowRight size={14} className="text-brand-300 mx-auto" aria-hidden="true" />
                <FlowStep label="Hospital B" />
              </div>
            </div>

            <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-500 mb-4">
                Synaptix workflow
              </p>
              <div className="flex flex-col gap-2 justify-center h-full">
                <FlowStep label="Hospital A" />
                <ArrowRight size={14} className="text-brand-400 mx-auto" aria-hidden="true" />
                <FlowStep label="Synaptix" />
                <ArrowRight size={14} className="text-brand-400 mx-auto" aria-hidden="true" />
                <FlowStep label="Verified Hospital B department" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <ul className="grid md:grid-cols-3 gap-6">
            {POINTS.map((point) => (
              <li key={point} className="text-sm text-brand-600 leading-relaxed border-t border-brand-100 pt-4">
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
