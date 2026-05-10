import type { ReactNode } from 'react'

export interface SegmentedOption<T extends string> {
  value: T
  label: ReactNode
}

interface SegmentedProps<T extends string> {
  options: readonly SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  size?: 'sm' | 'md'
  fullWidth?: boolean
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = 'sm',
  fullWidth = false,
}: SegmentedProps<T>) {
  const wrap = size === 'md' ? 'rounded-xl p-1' : 'rounded-lg p-0.5'
  const item =
    size === 'md'
      ? 'rounded-lg px-4 py-2 text-sm font-semibold'
      : 'rounded px-2.5 py-1 text-xs font-medium'

  return (
    <div className={`flex bg-zinc-800/60 ${wrap}`}>
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`transition-colors ${item} ${fullWidth ? 'flex-1' : ''} ${
              active
                ? 'bg-zinc-700 text-zinc-100 shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
