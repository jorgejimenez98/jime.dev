import "server-only"
import type { AppLocale } from "@/i18n/routing"
import { cacheLife } from "next/cache"

// Contentful dates are calendar dates; format them in UTC so a day never shifts
const MONTH_YEAR = { month: "short", year: "numeric", timeZone: "UTC" } as const
const LONG_DATE = {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
} as const

/**
 * `new Date()` can't run in a prerendered shell under Cache Components, so the
 * current year is cached and refreshed daily instead of read on every render.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache"
  cacheLife("days")
  return new Date().getFullYear()
}

export function getYear(isoDate: string) {
  return new Date(isoDate).getUTCFullYear()
}

// "Oct 2026" / "oct 2026"
export function formatMonthYear(isoDate: string, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale, MONTH_YEAR).format(new Date(isoDate))
}

// "October 21, 2026" / "21 de octubre de 2026"
export function formatLongDate(isoDate: string, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale, LONG_DATE).format(new Date(isoDate))
}
