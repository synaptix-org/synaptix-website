import { useMemo } from 'react'

function generatePath(seed, width, height, amplitude = 0.35) {
  const points = 80
  const step = width / points
  let path = ''
  for (let i = 0; i <= points; i++) {
    const t = i / points
    const y = height / 2 +
      Math.sin(t * Math.PI * 8 + seed) * height * amplitude * 0.6 +
      Math.sin(t * Math.PI * 20 + seed * 1.3) * height * amplitude * 0.3 +
      Math.sin(t * Math.PI * 40 + seed * 0.7) * height * amplitude * 0.1
    path += i === 0 ? `M 0 ${y}` : ` L ${i * step} ${y}`
  }
  return path
}

export default function EEGMiniViz({ animated = true, channels = 6, height = 80 }) {
  const paths = useMemo(() =>
    Array.from({ length: channels }, (_, i) => ({
      path: generatePath(i * 2.3, 400, height / channels),
      seed: i,
    }))
  , [channels, height])

  const channelH = height / channels

  return (
    <svg
      viewBox={`0 0 400 ${height}`}
      className="w-full"
      style={{ height }}
      preserveAspectRatio="none"
    >
      {paths.map(({ path, seed }, i) => (
        <g key={i} transform={`translate(0, ${i * channelH})`}>
          <path
            d={path}
            fill="none"
            stroke={`hsl(${240 + seed * 15}, 70%, 60%)`}
            strokeWidth="1.2"
            opacity="0.7"
          />
        </g>
      ))}
    </svg>
  )
}
