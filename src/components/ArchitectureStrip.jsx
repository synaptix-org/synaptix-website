import { ArrowRight, Lock, UserCheck, FileCheck2, History } from 'lucide-react'
import Reveal from './Reveal'

const FLOW = [
  'Hospital A',
  'Prepare and encrypt',
  'Synaptix Cloud',
  'Verified Hospital B department',
  'Existing hospital storage or clinical system',
]

const PRINCIPLES = [
  { icon: Lock, label: 'Encryption before cloud storage' },
  { icon: UserCheck, label: 'Recipient-specific access' },
  { icon: FileCheck2, label: 'File integrity verification' },
  { icon: History, label: 'Transfer audit history' },
]

export default function ArchitectureStrip() {
  return (
    <section className="px-6 py-16 bg-technical border-y border-technical-border">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 mb-10 text-sm font-mono text-brand-700">
            {FLOW.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-md bg-white border border-technical-border">
                  {step}
                </span>
                {i < FLOW.length - 1 && (
                  <ArrowRight size={14} className="text-brand-300" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {PRINCIPLES.map((p) => (
              <div key={p.label} className="flex items-center gap-2.5">
                <p.icon size={16} className="text-brand-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-brand-700">{p.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="text-xs text-brand-400 max-w-2xl">
          The current prototype demonstrates the product workflow and encrypted transfer
          architecture. Production hospital deployments will require identity, key-management,
          security, and compliance integrations.
        </p>
      </div>
    </section>
  )
}
