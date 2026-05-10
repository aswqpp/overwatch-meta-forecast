import { en } from './en'
import { ko } from './ko'
import { ja } from './ja'
import type { Strings } from './en'
import type { Locale } from '../types'

export type { Strings }
export { heroNames } from './heroes'

export const TRANSLATIONS: Record<Locale, Strings> = { en, ko, ja }
