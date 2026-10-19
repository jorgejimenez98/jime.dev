import type { AppLocale } from "@/i18n/routing"
import { EsFlagIcon } from "./es.icon"
import { UsFlagIcon } from "./us.icon"

export { EsFlagIcon, UsFlagIcon }

/**
 * Flag per app locale. The country is the region we ship for that locale
 * (en-US, es-ES), so English shows the US flag rather than the UK.
 */
export const LOCALE_FLAGS = {
  en: UsFlagIcon,
  es: EsFlagIcon
} satisfies Record<
  AppLocale,
  (props: { className?: string }) => React.ReactElement
>
