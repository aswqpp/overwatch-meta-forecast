import { Link, useLocation } from 'react-router-dom'
import { useUIStore } from '../store/uiStore'
import type { Strings } from '../i18n'
import type { Locale } from '../types'

interface NavbarProps {
  t: Strings
}

const LOCALES: Locale[] = ['ko', 'en', 'ja']

export function Navbar({ t }: NavbarProps) {
  const { locale, setLocale } = useUIStore()
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/forecast', label: t.nav.forecast },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-orange-400 to-blue-500" />
            <span className="hidden font-bold text-zinc-100 sm:block">OW Meta</span>
          </Link>
          <div className="flex items-center gap-0.5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-0.5 rounded-lg bg-zinc-800/60 p-1">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => setLocale(loc)}
              className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
                locale === loc
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
