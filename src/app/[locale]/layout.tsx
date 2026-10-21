import type { Metadata, Viewport } from "next"
import { LandingFooter, LandingHeader } from "@/components/layouts"
import { ThemeProvider } from "@/components/providers"
import { pickClientMessages, routing } from "@/i18n"
import { getPostSlugs } from "@/lib/contentful"
import { baseOpenGraph, SITE_NAMES, SITE_URL } from "@/lib/helpers"
import { Analytics } from "@vercel/analytics/next"
import { Geist } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import "../globals.css"

// The page's one typeface, self-hosted by next/font at build time
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"]
})

// The light and dark page backgrounds (--background), so the browser UI matches
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1115" }
  ]
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

/*
 * Site-wide defaults. Pages set only title, description and alternates, and
 * Next fills og:title/og:description from them; the social card comes from
 * [locale]/opengraph-image.tsx. A page that sets `openGraph` replaces this one.
 */
export async function generateMetadata({
  params
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const t = await getTranslations({ locale, namespace: "metadata" })
  const siteName = SITE_NAMES[locale]

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s · ${siteName}` },
    description: t("description"),
    applicationName: siteName,
    authors: [{ name: siteName, url: SITE_URL }],
    creator: siteName,
    openGraph: { ...baseOpenGraph(locale), type: "website" },
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    formatDetection: { email: false, address: false, telephone: false }
  }
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<"/[locale]">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const [messages, postSlugs] = await Promise.all([
    getMessages({ locale }),
    getPostSlugs()
  ])

  return (
    // next-themes sets the theme class on <html> before hydration
    <html
      lang={locale}
      className={`${geist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col">
        <NextIntlClientProvider messages={pickClientMessages(messages)}>
          <ThemeProvider>
            <LandingHeader showBlog={postSlugs.length > 0} />
            <main className="flex flex-1 flex-col">{children}</main>
            <LandingFooter locale={locale} />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
