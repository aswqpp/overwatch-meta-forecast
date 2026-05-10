import { useT } from '../hooks/useT'
import type { Role } from '../types'

const STYLES: Record<Role, string> = {
  tank:    'bg-blue-500/20  text-blue-300  border-blue-500/40',
  damage:  'bg-red-500/20   text-red-300   border-red-500/40',
  support: 'bg-green-500/20 text-green-300 border-green-500/40',
}

export function RoleBadge({ role }: { role: Role }) {
  const { t } = useT()
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-medium ${STYLES[role]}`}>
      {t.role[role]}
    </span>
  )
}
