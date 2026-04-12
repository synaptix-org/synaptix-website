import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileUp, X, ChevronDown, Play, Info, Clock } from 'lucide-react'
import { SAMPLE_FILES, ANALYSIS_STEPS } from '../data/mockData'

const PROTOCOLS = ['Resting State', 'Cognitive Task (N-back)', 'Motor Imagery', 'Sleep Recording', 'Event-Related Potential (ERP)', 'Custom']
const ANALYSIS_MODES = [
  { id: 'research', label: 'Research', desc: 'Optimized for discovery — broader artifact flagging, conservative channel rejection' },
  { id: 'clinical', label: 'Clinical', desc: 'Stricter thresholds, emphasis on interpretability and documentation' },
]

function ProgressIndicator({ steps, currentStep, progress }) {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const state = i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending'
        return (
          <div key={step.id} className={`flex items-start gap-3 transition-opacity duration-300 ${state === 'pending' ? 'opacity-40' : ''}`}>
            <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
              state === 'done' ? 'bg-emerald-500' :
              state === 'active' ? 'bg-indigo-500 animate-pulse' :
              'bg-slate-200'
            }`}>
              {state === 'done' ? (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : state === 'active' ? (
                <div className="w-2 h-2 bg-white rounded-full" />
              ) : (
                <div className="w-2 h-2 bg-slate-300 rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${state === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>
                {step.label}
              </div>
              {state === 'active' && (
                <div className="text-xs text-slate-500 mt-0.5 animate-fade-in">{step.detail}</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Analyze() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState(null)
  const [useSample, setUseSample] = useState(null)
  const [protocol, setProtocol] = useState('Resting State')
  const [mode, setMode] = useState('research')
  const [sensitivity, setSensitivity] = useState(70)
  const [badChannelThreshold, setBadChannelThreshold] = useState(60)
  const [analyzing, setAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) { setFile(f); setUseSample(null) }
  }, [])

  const handleFileInput = (e) => {
    const f = e.target.files[0]
    if (f) { setFile(f); setUseSample(null) }
  }

  const handleSampleSelect = (sample) => {
    setUseSample(sample)
    setFile(null)
    setProtocol(sample.protocol)
  }

  const displayFile = file ? { name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + ' MB' } : useSample

  const runAnalysis = async () => {
    if (!displayFile) return
    setAnalyzing(true)
    setCurrentStep(0)
    setProgress(0)

    const totalDuration = ANALYSIS_STEPS.reduce((a, s) => a + s.duration, 0)
    let elapsed = 0

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setCurrentStep(i)
      const stepDuration = ANALYSIS_STEPS[i].duration
      const startProgress = (elapsed / totalDuration) * 100
      elapsed += stepDuration
      const endProgress = (elapsed / totalDuration) * 100

      // Animate progress for this step
      const steps = 20
      for (let j = 0; j <= steps; j++) {
        await new Promise(r => setTimeout(r, stepDuration / steps))
        setProgress(startProgress + ((endProgress - startProgress) * j) / steps)
      }
    }

    setCurrentStep(ANALYSIS_STEPS.length)
    setProgress(100)
    await new Promise(r => setTimeout(r, 600))
    navigate('/results')
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">EEG Quality Control</h1>
          <p className="text-slate-500 text-sm">Upload a recording and configure analysis settings to begin.</p>
        </div>

        {analyzing ? (
          /* Analysis progress */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Play size={18} className="text-indigo-600 fill-indigo-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Running Quality Control</div>
                <div className="text-xs text-slate-500 truncate max-w-xs">{displayFile?.name}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ProgressIndicator steps={ANALYSIS_STEPS} currentStep={currentStep} progress={progress} />

            <div className="mt-6 p-4 bg-indigo-50 rounded-xl text-xs text-indigo-700 flex items-start gap-2">
              <Clock size={14} className="mt-0.5 flex-shrink-0" />
              <span>Estimated completion: ~{Math.ceil((ANALYSIS_STEPS.reduce((a, s) => a + s.duration, 0) * (1 - progress / 100)) / 1000)} seconds remaining</span>
            </div>
          </div>

        ) : (
          <div className="grid md:grid-cols-5 gap-6">

            {/* Left column — Upload + Sample files */}
            <div className="md:col-span-3 space-y-6">

              {/* Upload zone */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800 text-sm">Recording File</h2>
                </div>
                <div className="p-6">
                  {displayFile ? (
                    <div className="flex items-center gap-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileUp size={18} className="text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 text-sm truncate">{displayFile.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                          <span>{displayFile.size}</span>
                          {displayFile.channels && <span>{displayFile.channels} channels · {displayFile.sampleRate} Hz</span>}
                          {displayFile.duration && <span>{displayFile.duration}</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => { setFile(null); setUseSample(null) }}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all p-10 text-center ${
                        dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".edf,.bdf,.fif,.set"
                        className="hidden"
                        onChange={handleFileInput}
                      />
                      <Upload size={28} className="text-slate-300 mx-auto mb-3" />
                      <div className="text-sm font-medium text-slate-700 mb-1">Drop your EEG file here</div>
                      <div className="text-xs text-slate-400">Supports .edf, .bdf, .fif · up to 2 GB</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sample files */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800 text-sm">Sample Recordings</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Use one of these to see a demo analysis</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {SAMPLE_FILES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleSampleSelect(s)}
                      className={`w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors ${useSample?.id === s.id ? 'bg-indigo-50' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${useSample?.id === s.id ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                        <FileUp size={14} className={useSample?.id === s.id ? 'text-indigo-600' : 'text-slate-400'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${useSample?.id === s.id ? 'text-indigo-700' : 'text-slate-800'}`}>{s.name}</div>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-400 mt-0.5">
                          <span>{s.channels} ch</span>
                          <span>{s.sampleRate} Hz</span>
                          <span>{s.duration}</span>
                          <span>{s.size}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-md mt-1 font-medium ${
                        s.status === 'needs_review' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {s.protocol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — Settings */}
            <div className="md:col-span-2 space-y-6">

              {/* Protocol */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800 text-sm">Protocol</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Recording Type</label>
                    <div className="relative">
                      <select
                        value={protocol}
                        onChange={e => setProtocol(e.target.value)}
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 pr-8 bg-white text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                      >
                        {PROTOCOLS.map(p => <option key={p}>{p}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Analysis Mode</label>
                    <div className="space-y-2">
                      {ANALYSIS_MODES.map(m => (
                        <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${mode === m.id ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                          <input
                            type="radio"
                            name="mode"
                            value={m.id}
                            checked={mode === m.id}
                            onChange={() => setMode(m.id)}
                            className="mt-0.5 accent-indigo-600"
                          />
                          <div>
                            <div className="text-xs font-semibold text-slate-800">{m.label}</div>
                            <div className="text-xs text-slate-500 mt-0.5 leading-snug">{m.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thresholds */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-800 text-sm">QC Thresholds</h2>
                    <div className="flex items-center gap-1 text-xs text-indigo-500 cursor-pointer">
                      <Info size={12} /> Advanced
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-2">
                      <span className="font-medium">Artifact Sensitivity</span>
                      <span className="font-mono text-indigo-600">{sensitivity}%</span>
                    </div>
                    <input
                      type="range"
                      min={20} max={100}
                      value={sensitivity}
                      onChange={e => setSensitivity(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Conservative</span><span>Aggressive</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-2">
                      <span className="font-medium">Bad Channel Threshold</span>
                      <span className="font-mono text-indigo-600">{badChannelThreshold}%</span>
                    </div>
                    <input
                      type="range"
                      min={20} max={100}
                      value={badChannelThreshold}
                      onChange={e => setBadChannelThreshold(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Permissive</span><span>Strict</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Run button */}
              <button
                onClick={runAnalysis}
                disabled={!displayFile}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  displayFile
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 hover:-translate-y-0.5'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Play size={16} className={displayFile ? 'fill-white' : 'fill-slate-400'} />
                Run Quality Control
              </button>

              {!displayFile && (
                <p className="text-xs text-center text-slate-400">Select a file or sample recording to begin</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
