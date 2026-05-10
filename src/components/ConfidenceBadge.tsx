import type { Strings } from '../i18n'

interface ConfidenceBadgeProps {
  value: number
  t: Strings
}

export function ConfidenceBadge({ value, t }: ConfidenceBadgeProps) {
  const level = value >= 0.8 ? 'high' : value >= 0.6 ? 'medium' : 'low'
  const cls = {
    high:   'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    medium: 'bg-amber-500/20   text-amber-300   border-amber-500/40',
    low:    'bg-red-500/20     text-red-300     border-red-500/40',
  }[level]
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {t.badge.confidence[level]} {Math.round(value * 100)}%
    </span>
  )
}
