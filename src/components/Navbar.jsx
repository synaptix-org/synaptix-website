import { DEMO_URL } from '../lib/demoUrl'

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#why-eeg', label: 'Why EEG' },
  { href: '#vision', label: 'Vision' },
  { href: '#demo', label: 'Demo' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-brand-100">
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Primary"
      >
        <a href="#top" className="font-semibold text-brand-700 text-lg tracking-tight">
          Synaptix
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-600">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-brand-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={DEMO_URL || '#demo'}
          target={DEMO_URL ? '_blank' : undefined}
          rel={DEMO_URL ? 'noreferrer' : undefined}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
        >
          View Demo
        </a>
      </nav>
    </header>
  )
}
