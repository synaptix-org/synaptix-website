import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Download, ArrowLeft, Printer, Activity, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react'
import { MOCK_RESULTS } from '../data/mockData'
import QCBadge from '../components/QCBadge'

const SEVERITY_LABELS = { high: '🔴 High', moderate: '🟡 Moderate', mild: '🔵 Mild', low: '🟢 Low' }

export default function Report() {
  const r = MOCK_RESULTS
  const printRef = useRef(null)

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-slate-100 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Action bar */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link to="/results" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft size={15} /> Back to Results
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Printer size={14} /> Print
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <Download size={14} /> Export PDF
            </button>
          </div>
        </div>

        {/* Report card */}
        <div ref={printRef} className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden print:shadow-none print:rounded-none">

          {/* Report header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-8 text-white">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                    <Activity size={14} className="text-white" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">Synaptix</span>
                  <span className="text-indigo-200 text-sm">EEG Quality Control Report</span>
                </div>
                <h1 className="text-xl font-semibold leading-tight mb-1">{r.fileInfo.name}</h1>
                <div className="text-indigo-200 text-sm">
                  {r.fileInfo.protocol} · {r.fileInfo.duration} · {r.fileInfo.channels} channels at {r.fileInfo.sampleRate} Hz
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-4xl font-bold">{r.qcScore.score}</div>
                <div className="text-indigo-200 text-xs">QC score</div>
                <div className="mt-2">
                  <QCBadge verdict={r.qcScore.verdict} size="lg" />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-indigo-200 text-xs mb-1">Recording Date</div>
                <div>{new Date(r.fileInfo.recordingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div>
                <div className="text-indigo-200 text-xs mb-1">Analysis Mode</div>
                <div>{r.fileInfo.analysisMode} · v2.1</div>
              </div>
              <div>
                <div className="text-indigo-200 text-xs mb-1">Report Generated</div>
                <div>{new Date(r.fileInfo.analyzedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Report body */}
          <div className="p-8 space-y-8">

            {/* Summary box */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Summary</h2>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed">
                {r.qcScore.summary}
              </div>
            </div>

            {/* Key metrics */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Key Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Clean data retained', value: `${r.signalQuality.cleanDataRetained}%`, sub: `${r.artifactSummary.cleanEpochs}/${r.artifactSummary.totalEpochs} epochs` },
                  { label: 'Signal-to-noise ratio', value: `${r.signalQuality.snr} dB`, sub: 'broadband SNR' },
                  { label: 'Impedance pass rate', value: `${r.signalQuality.impedancePass}/${r.signalQuality.impedanceTotal}`, sub: 'channels ≤ 25 kΩ' },
                  { label: 'Flagged channels', value: `${r.badChannels.length}`, sub: `of ${r.fileInfo.channels} total` },
                ].map(m => (
                  <div key={m.label} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-xs text-slate-400 mb-1">{m.label}</div>
                    <div className="text-xl font-bold text-slate-900">{m.value}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Artifact summary */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Artifact Detection</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2.5 text-xs font-semibold text-slate-400">Artifact Type</th>
                    <th className="text-center py-2.5 text-xs font-semibold text-slate-400">Occurrences</th>
                    <th className="text-center py-2.5 text-xs font-semibold text-slate-400">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {r.artifactSummary.artifacts.map(a => (
                    <tr key={a.type} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 text-slate-700">{a.type}</td>
                      <td className="py-3 text-center font-mono text-slate-600">{a.count}</td>
                      <td className="py-3 text-center text-xs">{SEVERITY_LABELS[a.severity]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Flagged channels */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Flagged Channels</h2>
              {r.badChannels.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <CheckCircle2 size={16} /> No channels flagged for rejection.
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2.5 text-xs font-semibold text-slate-400">Channel</th>
                      <th className="text-left py-2.5 text-xs font-semibold text-slate-400">Reason</th>
                      <th className="text-center py-2.5 text-xs font-semibold text-slate-400">Impedance</th>
                      <th className="text-center py-2.5 text-xs font-semibold text-slate-400">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.badChannels.map(ch => (
                      <tr key={ch.channel} className="border-b border-slate-100 last:border-0">
                        <td className="py-3 font-mono font-bold text-slate-800">{ch.channel}</td>
                        <td className="py-3 text-slate-600">{ch.reason}</td>
                        <td className="py-3 text-center text-slate-500 font-mono text-xs">{ch.impedance}</td>
                        <td className="py-3 text-center text-xs">{SEVERITY_LABELS[ch.severity]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Frequency bands */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Frequency Band Analysis</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2.5 text-xs font-semibold text-slate-400">Band</th>
                    <th className="text-left py-2.5 text-xs font-semibold text-slate-400">Range</th>
                    <th className="text-center py-2.5 text-xs font-semibold text-slate-400">Relative Power</th>
                    <th className="text-left py-2.5 text-xs font-semibold text-slate-400">Interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  {r.frequencyBands.map(b => (
                    <tr key={b.band} className="border-b border-slate-100 last:border-0">
                      <td className="py-3">
                        <span className="font-semibold text-slate-800">{b.band}</span>
                      </td>
                      <td className="py-3 text-slate-400 font-mono text-xs">{b.range}</td>
                      <td className="py-3 text-center font-mono text-slate-700">{b.relPower}%</td>
                      <td className="py-3 text-slate-500 text-xs leading-relaxed">{b.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Flagged segments */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Flagged Segments</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {r.segments.filter(s => s.status === 'flagged').map(seg => (
                  <div key={seg.id} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-amber-800">Segment {seg.id}</div>
                      <div className="text-xs text-amber-600">{seg.start}s – {seg.end}s</div>
                      <div className="text-xs text-amber-700 mt-0.5">{seg.artifacts.join(', ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Recommended Next Steps</h2>
              <ol className="space-y-3">
                {r.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-px">{i + 1}</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{rec}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Disclaimer */}
            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-start gap-2 p-4 bg-slate-50 rounded-xl text-xs text-slate-500 leading-relaxed">
                <Info size={13} className="flex-shrink-0 mt-px text-slate-400" />
                <p>
                  This report was generated by Synaptix AI-assisted EEG Quality Control (v2.1). It is intended to support researcher decision-making and does not replace expert review. All preprocessing decisions remain the responsibility of the qualified researcher or clinician. Synaptix is a research tool and is not validated for clinical diagnosis.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-indigo-500 to-violet-600 rounded" />
                <span className="font-semibold text-slate-500">Synaptix</span>
                <span>·</span>
                <span>AI-Powered EEG Quality Control</span>
              </div>
              <span>Report ID: SYN-{r.fileInfo.name.slice(0, 6).toUpperCase()}-{Date.now().toString(36).toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Back CTA */}
        <div className="mt-6 text-center print:hidden">
          <Link to="/results" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            ← Return to full results view
          </Link>
        </div>
      </div>
    </div>
  )
}
