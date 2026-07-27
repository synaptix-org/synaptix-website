const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#why-eeg', label: 'Why EEG' },
  { href: '#vision', label: 'Vision' },
  { href: '#demo', label: 'Demo' },
  { href: 'https://www.linkedin.com/company/synaptix-co', label: 'LinkedIn', external: true },
]

export default function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-brand-100 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div>
          <p className="font-semibold text-brand-800 mb-2">Synaptix</p>
          <p className="text-sm text-brand-500 max-w-xs">
            Secure exchange infrastructure for large clinical data.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-600">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="hover:text-brand-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="max-w-5xl mx-auto mt-10 text-xs text-brand-400">
        © 2026 Synaptix. All rights reserved.
      </p>
    </footer>
  )
}
