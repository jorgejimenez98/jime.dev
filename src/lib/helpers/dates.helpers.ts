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

// The first of this month ("2026-10-01"), cached like the year: a current
// role counts up to it
export async function getCurrentMonth(): Promise<string> {
  "use cache"
  cacheLife("days")
  return `${new Date().toISOString().slice(0, 7)}-01`
}

// Months a role spans with both ends included, as LinkedIn counts them:
// Aug 2023 – Nov 2024 is 16
export function countMonths(startIsoDate: string, endIsoDate: string) {
  const start = new Date(startIsoDate)
  const end = new Date(endIsoDate)
  return (
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth() +
    1
  )
}

// 34 → "2 years 10 months" / "2 años 10 meses", worded by Intl for the locale
export function formatDuration(months: number, locale: AppLocale) {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = [
    years > 0 && formatUnit(years, "year", locale),
    rest > 0 && formatUnit(rest, "month", locale)
  ].filter(part => part !== false)
  return new Intl.ListFormat(locale, { style: "narrow", type: "unit" }).format(
    parts
  )
}

function formatUnit(value: number, unit: "year" | "month", locale: AppLocale) {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: "long"
  }).format(value)
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
