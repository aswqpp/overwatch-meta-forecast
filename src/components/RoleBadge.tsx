import type { Role } from '../types'
import type { Strings } from '../i18n'

interface RoleBadgeProps {
  role: Role
  t: Strings
}

const cls: Record<Role, string> = {
  tank:    'bg-blue-500/20  text-blue-300  border-blue-500/40',
  damage:  'bg-red-500/20   text-red-300   border-red-500/40',
  support: 'bg-green-500/20 text-green-300 border-green-500/40',
}

export function RoleBadge({ role, t }: RoleBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-medium ${cls[role]}`}>
      {t.role[role]}
    </span>
  )
}
