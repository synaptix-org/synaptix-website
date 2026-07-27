import { Clock, HardDrive, Layers } from 'lucide-react'
import Reveal from './Reveal'

const LABELS = [
  { icon: Clock, label: 'Hours or days of recording' },
  { icon: HardDrive, label: 'Hundreds of gigabytes' },
  { icon: Layers, label: 'Multiple synchronized file types' },
]

export default function WhyEEG() {
  return (
    <section id="why-eeg" className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm font-medium text-brand-500 mb-3">Starting point</p>
          <h2 className="text-3xl font-semibold text-brand-900 tracking-tight mb-6 max-w-2xl">
            Why start with EEG?
          </h2>
          <p className="text-brand-600 leading-relaxed max-w-2xl mb-14">
            EEG is one of the clearest examples of a large clinical data exchange problem. A
            single study can combine hours or days of waveforms, synchronized video,
            annotations, reports, and vendor-specific files. Hospitals need to move all of it
            together, yet many still rely on physical media and manual coordination.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {LABELS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-brand-100 px-5 py-4"
              >
                <item.icon size={18} className="text-brand-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-brand-800">{item.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-sm text-brand-400">
            EEG is the starting point, not the limit of the platform.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
