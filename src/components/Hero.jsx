import { ArrowRight } from 'lucide-react'
import ProductMockup from './ProductMockup'
import Reveal from './Reveal'
import { DEMO_URL } from '../lib/demoUrl'

export default function Hero() {
  return (
    <section id="top" className="px-6 pt-20 pb-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="text-sm font-medium text-brand-500 mb-4">
            Secure exchange infrastructure for clinical data
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-brand-900 tracking-tight leading-tight mb-6">
            Move large clinical studies between hospitals.
          </h1>
          <p className="text-lg text-brand-600 leading-relaxed mb-4 max-w-xl">
            Synaptix securely delivers complete clinical studies to verified hospital
            departments&mdash;without CDs, USB drives, faxed coordination, or fragmented
            file-sharing workflows.
          </p>
          <p className="text-base text-brand-500 mb-10">
            Starting with EEG and synchronized video.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={DEMO_URL || '#demo'}
              target={DEMO_URL ? '_blank' : undefined}
              rel={DEMO_URL ? 'noreferrer' : undefined}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-700 text-white font-medium hover:bg-brand-800 transition-colors"
            >
              View Product Demo
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#product"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-brand-200 text-brand-700 font-medium hover:bg-brand-50 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ProductMockup />
        </Reveal>
      </div>
    </section>
  )
}
