import type { Metadata } from "next"
import { LandingFooter, LandingHeader } from "@/components/layouts"
import { ThemeProvider } from "@/components/providers"
import { routing } from "@/i18n"
import { Analytics } from "@vercel/analytics/next"
import { Geist } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import "../globals.css"

// The page's one typeface, self-hosted by next/font at build time
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"]
})

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("title"),
    description: t("description")
  }
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<"/[locale]">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    // next-themes sets the theme class on <html> before hydration
    <html
      lang={locale}
      className={`${geist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col text-body">
        <NextIntlClientProvider>
          <ThemeProvider>
            <LandingHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <LandingFooter locale={locale} />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
