import { Activity, Layers, Network } from 'lucide-react'
import Reveal from './Reveal'

const STAGES = [
  {
    icon: Activity,
    label: 'Today',
    desc: 'Clinical EEG and synchronized video',
  },
  {
    icon: Layers,
    label: 'Next',
    desc: 'Other large, multi-file clinical studies',
  },
  {
    icon: Network,
    label: 'Infrastructure',
    desc: 'Verified institution-to-institution exchange',
  },
]

export default function Vision() {
  return (
    <section id="vision" className="px-6 py-24 bg-brand-700 text-white">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight mb-6 max-w-2xl">
            Starting with EEG. Built for large clinical data.
          </h2>
          <p className="text-brand-100/90 leading-relaxed max-w-2xl mb-14">
            The same exchange infrastructure can support other clinical datasets that are too
            large, fragmented, or specialized for existing hospital workflows.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid sm:grid-cols-3 gap-6">
            {STAGES.map((stage) => (
              <div
                key={stage.label}
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-5"
              >
                <stage.icon size={18} className="text-accent mb-3" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-200 mb-1.5">
                  {stage.label}
                </p>
                <p className="text-sm text-white/90 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
