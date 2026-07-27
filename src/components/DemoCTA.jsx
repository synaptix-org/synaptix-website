import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { DEMO_URL } from '../lib/demoUrl'

export default function DemoCTA() {
  return (
    <section id="demo" className="px-6 py-24 bg-white">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-brand-100 bg-brand-50/40 px-8 py-16">
          <h2 className="text-3xl font-semibold text-brand-900 tracking-tight mb-4">
            See a complete EEG study move between hospitals.
          </h2>
          <p className="text-brand-600 leading-relaxed max-w-xl mx-auto mb-10">
            View the current prototype demonstrating study preparation, verified department
            delivery, encrypted cloud transfer, and recipient access.
          </p>
          <a
            href={DEMO_URL || '#'}
            target={DEMO_URL ? '_blank' : undefined}
            rel={DEMO_URL ? 'noreferrer' : undefined}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-brand-700 text-white font-medium hover:bg-brand-800 transition-colors"
          >
            Open Demo
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
