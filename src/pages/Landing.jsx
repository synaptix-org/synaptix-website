import { Link } from 'react-router-dom'
import {
  ArrowRight, Clock, CheckCircle2, BarChart3, FileText,
  Zap, Shield, Users, TrendingUp, AlertTriangle,
  Brain, ChevronRight, Star
} from 'lucide-react'
import EEGMiniViz from '../components/EEGMiniViz'

const PAIN_POINTS = [
  { icon: Clock, text: '1–3 hours per recording on manual QC and artifact review', accent: 'text-red-500' },
  { icon: AlertTriangle, text: 'Inconsistent screening decisions across team members', accent: 'text-amber-500' },
  { icon: Users, text: 'No standardized documentation or audit trail', accent: 'text-orange-500' },
  { icon: Zap, text: 'Hardware variation and electrode impedance issues go undetected', accent: 'text-red-500' },
]

const BENEFITS = [
  {
    icon: Clock,
    title: 'QC in under 15 minutes',
    desc: 'Automated artifact detection and channel-quality scoring reduces preprocessing bottlenecks dramatically.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: CheckCircle2,
    title: 'Standardized across your lab',
    desc: 'Define custom QC thresholds once. Every recording is evaluated against the same criteria, every time.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: FileText,
    title: 'One-click structured reports',
    desc: 'Generate shareable, reviewable QC summaries suitable for lab notebooks, IRB records, or collaborator review.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: BarChart3,
    title: 'Frequency-aware QC',
    desc: 'Artifact detection designed to preserve meaningful frequency-band information, not just flag raw amplitude.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Shield,
    title: 'Explainable, not a black box',
    desc: 'Every flag comes with a plain-English rationale. Researchers stay in control of all preprocessing decisions.',
    color: 'bg-slate-100 text-slate-600',
  },
  {
    icon: TrendingUp,
    title: 'Built to scale with your team',
    desc: 'Track QC metrics across studies, compare sessions, and identify recurring data quality issues.',
    color: 'bg-cyan-50 text-cyan-600',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Upload your recording', desc: 'Drag and drop an EDF or BDF file. Synaptix reads channel metadata automatically.' },
  { step: '02', title: 'Configure your protocol', desc: 'Select analysis mode, artifact sensitivity, and lab-specific thresholds — or use defaults.' },
  { step: '03', title: 'Run Quality Control', desc: 'AI-assisted analysis flags artifacts, scores channels, and computes frequency band metrics.' },
  { step: '04', title: 'Review and export', desc: 'Get a structured QC report with recommended actions. Download or share directly.' },
]

const TESTIMONIALS = [
  {
    quote: "We were spending 2+ hours on QC for every session. A tool like this would let us focus on the science instead.",
    name: "Dr. M. Chen",
    role: "Cognitive Neuroscience Lab, Stanford",
  },
  {
    quote: "The biggest issue in our multi-site trial is consistency. Standardized QC reporting would be game-changing.",
    name: "R. Torres",
    role: "EEG Technician, UCSF Memory & Aging Center",
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 pointer-events-none" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-700 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Built for neuroscience research labs
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
            EEG Quality Control,{' '}
            <span className="gradient-text">done in minutes.</span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Synaptix assists researchers with artifact screening, bad-channel detection, and standardized QC reporting — reducing preprocessing time from hours to under 15 minutes per recording.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
            >
              Run Sample Analysis
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/results"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-sm"
            >
              View Demo Results
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* EEG viz preview card */}
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-slate-400 font-mono">subject_001_rest_eyes_open.edf — Synaptix QC</span>
              </div>
              <div className="p-4 bg-slate-950">
                <div className="flex gap-3 mb-3">
                  {['Fp1','F3','C3','P3','O1','Cz'].map((ch, i) => (
                    <span key={ch} className="text-xs font-mono text-slate-500">{ch}</span>
                  ))}
                </div>
                <EEGMiniViz channels={8} height={120} />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
                  <span className="text-xs font-mono text-slate-500">0s</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/15 text-amber-400 text-xs font-medium rounded">
                      ⚠ 3 artifacts flagged
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/15 text-emerald-400 text-xs font-medium rounded">
                      QC: Review
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">5:12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '< 15 min', label: 'per recording' },
            { value: '95%+', label: 'artifact detection coverage' },
            { value: '64', label: 'channel capacity' },
            { value: '3', label: 'artifact types detected' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem section */}
      <section className="py-24 px-6 max-w-5xl mx-auto" id="workflow">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">The Problem</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-snug">
              EEG preprocessing is a bottleneck in every neuroscience lab.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Before any analysis begins, researchers spend hours reviewing raw recordings, manually flagging artifacts, and making subjective judgment calls — with no standardized documentation and no easy way to ensure consistency across researchers or sessions.
            </p>
            <ul className="space-y-4">
              {PAIN_POINTS.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <p.icon size={18} className={`mt-0.5 flex-shrink-0 ${p.accent}`} />
                  <span className="text-slate-600 text-sm leading-relaxed">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6 text-sm font-mono">
            <div className="text-slate-400 mb-4 text-xs">// typical lab preprocessing log</div>
            <div className="space-y-2">
              <div className="text-slate-300">09:12 — <span className="text-amber-400">Opened recording</span>. 64ch, 5min.</div>
              <div className="text-slate-300">09:44 — <span className="text-red-400">FT9 looks noisy?</span> Hard to tell.</div>
              <div className="text-slate-300">10:03 — <span className="text-amber-400">Flagging epochs 3,5,9</span> manually.</div>
              <div className="text-slate-300">10:31 — <span className="text-slate-400">Re-checking alpha...</span></div>
              <div className="text-slate-300">10:58 — <span className="text-slate-400">Still uncertain about TP10.</span></div>
              <div className="text-slate-300">11:22 — <span className="text-emerald-400">Done? Probably fine.</span></div>
              <div className="text-slate-500 mt-4 text-xs border-t border-slate-700 pt-4">
                Total time: 2h 10min · No documentation · Researcher-dependent
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">Workflow</div>
            <h2 className="text-3xl font-bold text-slate-900">From upload to report in four steps.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-px bg-slate-200 z-0" style={{ width: 'calc(100% - 20px)', left: '60%' }} />
                )}
                <div className="relative z-10 bg-white rounded-xl p-5 border border-slate-200 shadow-sm card-hover">
                  <span className="text-xs font-bold text-indigo-400 font-mono">{step.step}</span>
                  <h3 className="font-semibold text-slate-900 mt-2 mb-2 text-sm">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all text-sm shadow-md shadow-indigo-200"
            >
              Try it with sample data <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">Why Synaptix</div>
            <h2 className="text-3xl font-bold text-slate-900">Designed for research-grade signal fidelity.</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Synaptix is not a generic anomaly detector. It's built around how neuroscientists actually think about EEG quality.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm card-hover">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${b.color} mb-4`}>
                  <b.icon size={18} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business / credibility section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-indigo-950" id="business">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">For Research Labs</div>
              <h2 className="text-3xl font-bold text-white mb-6 leading-snug">
                Built for academic labs first, with clinical expansion ahead.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                Synaptix starts where the pain is greatest: academic neuroscience labs running high-throughput EEG studies with small teams and limited preprocessing resources. As the platform matures, it expands into hospital-based clinical EEG workflows.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Who pays today', value: 'Research labs, university neuroscience centers' },
                  { label: 'Business model', value: 'Annual lab subscription · institutional license' },
                  { label: 'Why they buy', value: 'Save 10–15 hrs/week in preprocessing per researcher' },
                  { label: 'Expansion path', value: 'Hospital EEG depts, clinical trial CROs, neurotech companies' },
                ].map(item => (
                  <div key={item.label} className="flex gap-4 py-3 border-b border-white/10">
                    <span className="text-xs text-indigo-400 font-medium w-36 flex-shrink-0">{item.label}</span>
                    <span className="text-sm text-slate-300">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Brain size={22} className="text-indigo-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">Why now?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  EEG hardware is getting cheaper and more accessible. Lab cohorts are growing. Multi-site studies are becoming standard. The bottleneck has shifted from data collection to preprocessing — and no tool has addressed it specifically for research-grade signal quality.
                </p>
              </div>
              <div className="space-y-3">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, s) => <Star key={s} size={12} className="text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">"{t.quote}"</p>
                    <div>
                      <div className="text-white text-xs font-semibold">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            See what Synaptix finds in your data.
          </h2>
          <p className="text-slate-500 mb-10 leading-relaxed text-sm">
            Upload a sample recording and run your first analysis in under 2 minutes. No account required for the demo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-7 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
            >
              Start Free Analysis <ArrowRight size={18} />
            </Link>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all shadow-sm"
            >
              <FileText size={16} /> Preview a report
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 px-6 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-md" />
            <span className="font-semibold text-slate-600">Synaptix</span>
            <span className="text-slate-300">·</span>
            <span>AI-Powered EEG Quality Control</span>
          </div>
          <span>For research use. Not a clinical diagnostic tool.</span>
        </div>
      </footer>
    </div>
  )
}
