import { useUIStore } from '../store/uiStore'
import { TRANSLATIONS } from '../i18n'

export function useT() {
  const locale = useUIStore((s) => s.locale)
  return { t: TRANSLATIONS[locale], locale }
}
