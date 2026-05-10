import { en } from './en'
import { ko } from './ko'
import { ja } from './ja'
import type { Strings } from './en'
import type { Locale } from '../types'

export type { Strings }
export { heroNames } from './heroes'
export { en, ko, ja }

const translations: Record<Locale, Strings> = { en, ko, ja }

export function useTranslation(locale: Locale): Strings {
  return translations[locale]
}
