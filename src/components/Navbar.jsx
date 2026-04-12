import { Link, useLocation } from 'react-router-dom'
import { Activity, ChevronRight } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
            <Activity size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-900 text-[17px] tracking-tight">Synaptix</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          <Link to="/" className={`hover:text-slate-900 transition-colors ${isHome ? 'text-slate-900' : ''}`}>
            Product
          </Link>
          <a href="#workflow" className="hover:text-slate-900 transition-colors">How it works</a>
          <a href="#business" className="hover:text-slate-900 transition-colors">For Labs</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/analyze"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View demo
          </Link>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            Run Analysis
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
