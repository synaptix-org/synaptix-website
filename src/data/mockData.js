// Mock EEG analysis results for demo purposes

export const SAMPLE_FILES = [
  {
    id: 'S001',
    name: 'subject_001_rest_eyes_open.edf',
    size: '24.3 MB',
    duration: '5 min 12 sec',
    channels: 64,
    sampleRate: 512,
    date: '2026-04-10',
    protocol: 'Resting State',
    status: 'analyzed',
  },
  {
    id: 'S002',
    name: 'pilot_02_N-back_task.bdf',
    size: '18.7 MB',
    duration: '8 min 44 sec',
    channels: 32,
    sampleRate: 256,
    date: '2026-04-09',
    protocol: 'Cognitive Task',
    status: 'analyzed',
  },
  {
    id: 'S003',
    name: 'P004_sleep_stage2.edf',
    size: '41.2 MB',
    duration: '12 min 00 sec',
    channels: 19,
    sampleRate: 256,
    date: '2026-04-08',
    protocol: 'Sleep Recording',
    status: 'needs_review',
  },
]

export const ANALYSIS_STEPS = [
  { id: 1, label: 'Parsing file headers', detail: 'Reading channel metadata and electrode positions', duration: 600 },
  { id: 2, label: 'Validating signal integrity', detail: 'Checking sampling rate, amplitude range, and continuity', duration: 800 },
  { id: 3, label: 'Running artifact detection', detail: 'Scanning for eye blinks, muscle noise, and motion artifacts', duration: 1200 },
  { id: 4, label: 'Identifying bad channels', detail: 'Evaluating impedance, flatlines, and high-variance channels', duration: 900 },
  { id: 5, label: 'Computing frequency bands', detail: 'FFT decomposition across delta, theta, alpha, beta, gamma', duration: 700 },
  { id: 6, label: 'Scoring segment quality', detail: 'Applying lab-calibrated QC thresholds to each 2-second epoch', duration: 800 },
  { id: 7, label: 'Generating QC report', detail: 'Compiling findings and preparing structured output', duration: 500 },
]

export const MOCK_RESULTS = {
  fileInfo: {
    name: 'subject_001_rest_eyes_open.edf',
    recordingDate: '2026-04-10T09:24:00',
    duration: '5 min 12 sec',
    channels: 64,
    sampleRate: 512,
    protocol: 'Resting State — Eyes Open',
    analysisMode: 'Research',
    analyzedAt: '2026-04-12T14:32:00',
  },

  qcScore: {
    verdict: 'REVIEW', // PASS | REVIEW | FAIL
    score: 71,
    confidence: 0.88,
    summary: 'Recording shows adequate signal quality across most channels. Two channels flagged for elevated noise; one segment contains prominent eye-movement artifact. Recommend brief manual inspection before downstream analysis.',
  },

  artifactSummary: {
    totalEpochs: 156,
    cleanEpochs: 118,
    flaggedEpochs: 38,
    cleanPercent: 75.6,
    artifacts: [
      { type: 'Eye Blinks / EOG', count: 22, severity: 'moderate', icon: 'eye', color: '#f59e0b' },
      { type: 'Muscle / EMG Noise', count: 8, severity: 'mild', icon: 'activity', color: '#3b82f6' },
      { type: 'Motion / Movement', count: 4, severity: 'mild', icon: 'move', color: '#8b5cf6' },
      { type: 'Line Noise (60 Hz)', count: 3, severity: 'mild', icon: 'zap', color: '#06b6d4' },
      { type: 'Cardiac (BCG)', count: 1, severity: 'low', icon: 'heart', color: '#10b981' },
    ],
  },

  badChannels: [
    { channel: 'FT9', reason: 'High variance (σ = 142 µV)', severity: 'high', impedance: '>50 kΩ' },
    { channel: 'TP10', reason: 'Intermittent flatline (3.2s)', severity: 'high', impedance: 'N/A' },
    { channel: 'AF7', reason: 'Elevated broadband noise', severity: 'moderate', impedance: '38 kΩ' },
  ],

  signalQuality: {
    overall: 71,
    snr: 18.4,
    snrLabel: 'dB SNR',
    channelCoverage: 95.3,
    cleanDataRetained: 75.6,
    impedancePass: 61,
    impedanceTotal: 64,
  },

  frequencyBands: [
    { band: 'Delta', range: '0.5–4 Hz', power: 28, relPower: 22, interpretation: 'Slightly elevated — possible drowsiness', color: '#8b5cf6' },
    { band: 'Theta', range: '4–8 Hz', power: 18, relPower: 14, interpretation: 'Within expected resting range', color: '#6366f1' },
    { band: 'Alpha', range: '8–13 Hz', power: 42, relPower: 34, interpretation: 'Strong alpha peak at 10.2 Hz — eyes open suppression confirmed', color: '#0ea5e9' },
    { band: 'Beta', range: '13–30 Hz', power: 25, relPower: 20, interpretation: 'Normal resting beta activity', color: '#10b981' },
    { band: 'Gamma', range: '30–100 Hz', power: 13, relPower: 10, interpretation: 'Low-level; consistent with clean resting state', color: '#f59e0b' },
  ],

  segments: [
    { id: 1, start: 0, end: 30, status: 'clean', artifacts: [] },
    { id: 2, start: 30, end: 60, status: 'clean', artifacts: [] },
    { id: 3, start: 60, end: 90, status: 'flagged', artifacts: ['Eye Blinks'] },
    { id: 4, start: 90, end: 120, status: 'clean', artifacts: [] },
    { id: 5, start: 120, end: 150, status: 'flagged', artifacts: ['Eye Blinks', 'Muscle Noise'] },
    { id: 6, start: 150, end: 180, status: 'clean', artifacts: [] },
    { id: 7, start: 180, end: 210, status: 'clean', artifacts: [] },
    { id: 8, start: 210, end: 240, status: 'clean', artifacts: [] },
    { id: 9, start: 240, end: 270, status: 'flagged', artifacts: ['Motion'] },
    { id: 10, start: 270, end: 300, status: 'clean', artifacts: [] },
    { id: 11, start: 300, end: 312, status: 'flagged', artifacts: ['Eye Blinks'] },
  ],

  recommendations: [
    'Manually inspect FT9 and TP10 — both channels likely require interpolation or exclusion.',
    'Review epochs 3, 5, and 9 for artifact rejection before ICA decomposition.',
    'Eye-movement components should be clearly separable via ICA given strong EOG signal.',
    'Consider applying 60 Hz notch filter if further line noise removal is needed.',
    '75.6% clean data retained — sufficient for most resting-state analyses.',
  ],
}

// Simulated EEG waveform data for visualization
export const generateWaveformData = (channels = 8, points = 200) => {
  const channelNames = ['Fp1', 'Fp2', 'F3', 'F4', 'C3', 'C4', 'P3', 'P4', 'O1', 'O2', 'F7', 'F8']
  return channelNames.slice(0, channels).map((name, ci) => ({
    name,
    data: Array.from({ length: points }, (_, i) => {
      const t = i / points
      const alpha = Math.sin(2 * Math.PI * 10 * t + ci) * (ci < 2 ? 40 : 15)
      const beta = Math.sin(2 * Math.PI * 20 * t + ci * 0.5) * 8
      const noise = (Math.random() - 0.5) * 12
      const artifact = (ci === 0 && i > 60 && i < 70) ? Math.sin((i - 60) * 0.5) * 80 : 0
      return alpha + beta + noise + artifact
    }),
  }))
}

// Recharts-compatible frequency spectrum data
export const generateSpectrumData = () => {
  return Array.from({ length: 50 }, (_, i) => {
    const freq = i * 2 + 1
    let power = 0
    if (freq < 4) power = 30 + Math.random() * 10 // delta
    else if (freq < 8) power = 18 + Math.random() * 8 // theta
    else if (freq < 13) power = 35 + Math.random() * 15 + (freq > 9 && freq < 12 ? 20 : 0) // alpha peak
    else if (freq < 30) power = 12 + Math.random() * 6 // beta
    else power = 5 + Math.random() * 4 // gamma
    return { freq, power: Math.round(power * 10) / 10 }
  })
}
