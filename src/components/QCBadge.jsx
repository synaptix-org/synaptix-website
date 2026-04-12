export default function QCBadge({ verdict, size = 'md' }) {
  const config = {
    PASS: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'Pass',
    },
    REVIEW: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      label: 'Needs Review',
    },
    FAIL: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      dot: 'bg-red-500',
      label: 'Fail',
    },
  }

  const c = config[verdict] || config.REVIEW
  const sizeClass = size === 'lg' ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs'

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClass} font-semibold rounded-full border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}
