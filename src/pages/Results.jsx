import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts'
import {
  CheckCircle2, AlertTriangle, XCircle, Download, FileText,
  Eye, Activity, Move, Zap, Heart, Info, ArrowRight,
  TrendingUp, Shield, ChevronDown, ChevronUp
} from 'lucide-react'
import { MOCK_RESULTS, generateSpectrumData } from '../data/mockData'
import QCBadge from '../components/QCBadge'

const ARTIFACT_ICONS = { eye: Eye, activity: Activity, move: Move, zap: Zap, heart: Heart }
const SEVERITY_COLOR = { high: 'text-red-600 bg-red-50 border-red-100', moderate: 'text-amber-600 bg-amber-50 border-amber-100', mild: 'text-blue-600 bg-blue-50 border-blue-100', low: 'text-emerald-600 bg-emerald-50 border-emerald-100' }

const spectrumData = generateSpectrumData()

function ScoreGauge({ score, verdict }) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference
  const color = verdict === 'PASS' ? '#10b981' : verdict === 'REVIEW' ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="54"
          fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-900">{score}</span>
        <span className="text-xs text-slate-400">/ 100</span>
      </div>
    </div>
  )
}

function SegmentTimeline({ segments }) {
  const [selected, setSelected] = useState(null)
  const total = segments[segments.length - 1]?.end || 312

  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        {segments.map(seg => (
          <button
            key={seg.id}
            onClick={() => setSelected(selected?.id === seg.id ? null : seg)}
            style={{ width: `${((seg.end - seg.start) / total) * 100}%`, minWidth: 20 }}
            className={`h-8 rounded-md transition-all relative group ${
              seg.status === 'flagged'
                ? 'bg-amber-200 hover:bg-amber-300'
                : 'bg-emerald-100 hover:bg-emerald-200'
            } ${selected?.id === seg.id ? 'ring-2 ring-indigo-400' : ''}`}
            title={`${seg.start}s–${seg.end}s: ${seg.status}`}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>0:00</span>
        <span>2:36</span>
        <span>5:12</span>
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" /> Clean epoch</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-200 border border-amber-300" /> Flagged epoch</span>
      </div>
      {selected && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs animate-fade-in">
          <span className="font-semibold text-amber-800">Segment {selected.id}</span>
          <span className="text-amber-600 ml-2">{selected.start}s – {selected.end}s</span>
          {selected.artifacts.length > 0 && (
            <div className="mt-1 text-amber-700">Detected: {selected.artifacts.join(', ')}</div>
          )}
        </div>
      )}
    </div>
  )
}

function FrequencyBandRow({ band }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
      <div className="w-14 text-xs font-semibold text-slate-700">{band.band}</div>
      <div className="text-xs text-slate-400 w-20">{band.range}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${band.relPower * 2.5}%`, backgroundColor: band.color }}
            />
          </div>
          <span className="text-xs font-mono text-slate-600 w-8 text-right">{band.relPower}%</span>
        </div>
      </div>
      <div className="w-56 text-xs text-slate-500 leading-snug hidden md:block">{band.interpretation}</div>
    </div>
  )
}

export default function Results() {
  const r = MOCK_RESULTS
  const [expandedExplanation, setExpandedExplanation] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Link to="/analyze" className="hover:text-slate-600 transition-colors">Analysis</Link>
              <span>/</span>
              <span className="text-slate-600 font-mono">{r.fileInfo.name}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Quality Control Results</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <FileText size={14} /> Preview Report
            </Link>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <Download size={14} /> Export PDF
            </Link>
          </div>
        </div>

        {/* Top cards row */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">

          {/* QC Score card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">QC Score</div>
            <ScoreGauge score={r.qcScore.score} verdict={r.qcScore.verdict} />
            <div className="mt-5 text-center">
              <QCBadge verdict={r.qcScore.verdict} size="lg" />
              <div className="text-xs text-slate-400 mt-2">
                Confidence: {Math.round(r.qcScore.confidence * 100)}%
              </div>
            </div>
          </div>

          {/* Signal quality metrics */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Signal Quality</div>
            <div className="space-y-4">
              {[
                { label: 'Clean Data Retained', value: `${r.signalQuality.cleanDataRetained}%`, bar: r.signalQuality.cleanDataRetained, color: 'bg-emerald-500' },
                { label: 'Channel Coverage', value: `${r.signalQuality.channelCoverage}%`, bar: r.signalQuality.channelCoverage, color: 'bg-indigo-500' },
                { label: 'Impedance Pass', value: `${r.signalQuality.impedancePass}/${r.signalQuality.impedanceTotal}`, bar: (r.signalQuality.impedancePass / r.signalQuality.impedanceTotal) * 100, color: 'bg-violet-500' },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600">{m.label}</span>
                    <span className="font-semibold text-slate-800 font-mono">{m.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.bar}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <TrendingUp size={14} className="text-slate-400" />
                <span className="text-xs text-slate-500">{r.signalQuality.snr} {r.signalQuality.snrLabel}</span>
              </div>
            </div>
          </div>

          {/* File info */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Recording Info</div>
            <div className="space-y-3">
              {[
                { label: 'File', value: r.fileInfo.name, mono: true, truncate: true },
                { label: 'Protocol', value: r.fileInfo.protocol },
                { label: 'Duration', value: r.fileInfo.duration },
                { label: 'Channels', value: `${r.fileInfo.channels} · ${r.fileInfo.sampleRate} Hz` },
                { label: 'Mode', value: r.fileInfo.analysisMode },
                { label: 'Analyzed', value: new Date(r.fileInfo.analyzedAt).toLocaleString() },
              ].map(info => (
                <div key={info.label} className="flex gap-3">
                  <span className="text-xs text-slate-400 w-16 flex-shrink-0 pt-px">{info.label}</span>
                  <span className={`text-xs font-medium text-slate-700 ${info.truncate ? 'truncate' : ''} ${info.mono ? 'font-mono' : ''}`}>
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-5 gap-5 mb-5">

          {/* Artifact Summary */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Artifacts Detected</div>
              <span className="text-xs text-slate-500">
                {r.artifactSummary.flaggedEpochs} / {r.artifactSummary.totalEpochs} epochs flagged
              </span>
            </div>

            {/* Donut-like summary */}
            <div className="flex items-center gap-5 mb-6 p-4 bg-slate-50 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{r.artifactSummary.cleanPercent}%</div>
                <div className="text-xs text-slate-400">clean</div>
              </div>
              <div className="flex-1 h-3 bg-amber-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${r.artifactSummary.cleanPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {r.artifactSummary.artifacts.map(a => {
                const Icon = ARTIFACT_ICONS[a.icon] || Activity
                return (
                  <div key={a.type} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: a.color + '18' }}>
                      <Icon size={13} style={{ color: a.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-800">{a.type}</div>
                      <div className="text-xs text-slate-400">{a.count} occurrences</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium border ${SEVERITY_COLOR[a.severity]}`}>
                      {a.severity}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Frequency spectrum */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-5">Power Spectral Density</div>
            <div className="h-44 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spectrumData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="specGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="freq" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} label={{ value: 'Hz', position: 'insideRight', fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 10px' }}
                    formatter={(v) => [`${v} µV²/Hz`, 'Power']}
                    labelFormatter={(l) => `${l} Hz`}
                  />
                  <Area type="monotone" dataKey="power" stroke="#6366f1" strokeWidth={2} fill="url(#specGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="text-xs text-slate-400 mb-3">Frequency band breakdown</div>
              {MOCK_RESULTS.frequencyBands.map(b => (
                <FrequencyBandRow key={b.band} band={b} />
              ))}
            </div>
          </div>
        </div>

        {/* Bad channels + segment timeline */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">

          {/* Bad channels */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Flagged Channels</div>
              <span className="text-xs bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-md font-medium">
                {r.badChannels.length} of {r.fileInfo.channels}
              </span>
            </div>
            <div className="space-y-3">
              {r.badChannels.map(ch => (
                <div key={ch.channel} className="flex items-start gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold flex-shrink-0 ${
                    ch.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {ch.channel}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-800">{ch.reason}</div>
                    {ch.impedance !== 'N/A' && (
                      <div className="text-xs text-slate-400 mt-0.5">Impedance: {ch.impedance}</div>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium border flex-shrink-0 ${SEVERITY_COLOR[ch.severity]}`}>
                    {ch.severity}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-slate-400 flex items-start gap-1.5">
              <Info size={12} className="mt-0.5 flex-shrink-0" />
              Flagged channels may need interpolation or exclusion before ICA decomposition.
            </div>
          </div>

          {/* Segment timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Segment-Level View</div>
              <span className="text-xs text-slate-400">{r.artifactSummary.cleanEpochs} clean / {r.artifactSummary.totalEpochs} total</span>
            </div>
            <SegmentTimeline segments={r.segments} />
          </div>
        </div>

        {/* AI explanation + recommendations */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-50 rounded-md flex items-center justify-center">
                <Shield size={13} className="text-indigo-600" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">QC Summary & Recommendations</div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 mb-5 border border-slate-100">
            <p className="text-sm text-slate-700 leading-relaxed">{r.qcScore.summary}</p>
          </div>

          <div className="space-y-2.5">
            {r.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-px text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-indigo-900 mb-1">Ready to export this analysis?</div>
            <div className="text-sm text-indigo-700">Generate a structured QC report suitable for lab notebooks, IRB documentation, or team review.</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <FileText size={15} /> Export Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
