import { CheckCircle2, FileText, Video, Activity, ClipboardList, HardDrive } from 'lucide-react'

const CONTENTS = [
  { icon: Activity, label: '72 h 14 m EEG' },
  { icon: Activity, label: '32 channels' },
  { icon: Video, label: 'Synchronized video' },
  { icon: FileText, label: 'Clinical report' },
  { icon: ClipboardList, label: 'Annotations' },
  { icon: HardDrive, label: '986.4 GB' },
]

const STATUS_STEPS = ['Prepared', 'Encrypted', 'Delivered', 'Received']

export default function ProductMockup() {
  return (
    <div className="relative">
      <div
        className="rounded-2xl border border-brand-200 bg-white shadow-sm overflow-hidden"
        role="img"
        aria-label="Illustrative product preview showing an EEG study being transferred from Hospital A to Hospital B's Epilepsy Monitoring Unit"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-brand-100 bg-brand-50/60">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Incoming Clinical Study
          </span>
          <span className="text-xs font-mono text-brand-400">EEG-2026-014</span>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-brand-400 mb-1">Source</div>
              <div className="text-sm font-medium text-brand-800">Hospital A</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-brand-400 mb-1">Destination</div>
              <div className="text-sm font-medium text-brand-800">Hospital B</div>
              <div className="text-xs text-brand-500">Epilepsy Monitoring Unit</div>
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wide text-brand-400 mb-2">Contents</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {CONTENTS.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-xs text-brand-700">
                  <item.icon size={13} className="text-brand-400 flex-shrink-0" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wide text-brand-400 mb-2">Status</div>
            <div className="flex items-center">
              {STATUS_STEPS.map((step, i) => (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 rounded-full bg-brand-700 flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-white" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] text-brand-500">{step}</span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className="flex-1 h-px bg-brand-200 mx-1 mb-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-technical border border-technical-border px-4 py-3">
            <div className="text-sm font-medium text-brand-800">Complete study delivered</div>
            <div className="text-xs text-technical-text mt-0.5">Recipient department verified</div>
            <div className="text-xs text-technical-text">41 of 41 files verified</div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-brand-400">
        Illustrative product preview. Hospital names are fictional.
      </p>
    </div>
  )
}
