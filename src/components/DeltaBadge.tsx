interface DeltaBadgeProps {
  value: number
}

export function DeltaBadge({ value }: DeltaBadgeProps) {
  const abs = Math.abs(value * 100).toFixed(1)
  if (value > 0)
    return <span className="text-sm font-semibold tabular-nums text-emerald-400">+{abs}%</span>
  if (value < 0)
    return <span className="text-sm font-semibold tabular-nums text-red-400">−{abs}%</span>
  return <span className="text-sm font-semibold tabular-nums text-zinc-500">0.0%</span>
}
