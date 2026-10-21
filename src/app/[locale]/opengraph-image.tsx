import { SiteOgCard } from "@/components/og"
import { routing } from "@/i18n/routing"
import { getAssetBytes, getProfile } from "@/lib/contentful"
import { SITE_URL } from "@/lib/helpers"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { notFound } from "next/navigation"
import { ImageResponse } from "next/og"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"

// One alt for both locales, so it names him both ways
export const alt =
  "George Jimenez (Jorge Jimenez), Senior Full-Stack Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Geist as TTF (the renderer can't read WOFF2), read once per server start
const FONTS_DIR = join(process.cwd(), "src/assets/fonts")
const [geistRegular, geistSemiBold] = await Promise.all([
  readFile(join(FONTS_DIR, "Geist-Regular.ttf")),
  readFile(join(FONTS_DIR, "Geist-SemiBold.ttf"))
])

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

// The social card for every page in a locale (see SiteOgCard)
export default async function OpenGraphImage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const [t, tHeader, profile] = await Promise.all([
    getTranslations({ locale, namespace: "og" }),
    getTranslations({ locale, namespace: "header" }),
    getProfile(locale)
  ])
  // PNG at 2x the drawn size, cropped to the face: the renderer can't read WebP
  const avatar = await getAssetBytes(
    `${profile.avatar.url}?fm=png&w=472&h=472&fit=thumb&f=face`
  )

  return new ImageResponse(
    <SiteOgCard
      name={profile.name}
      headline={profile.headline}
      initials={tHeader("initials")}
      domain={new URL(SITE_URL).host}
      location={profile.location}
      highlights={[t("highlight-1"), t("highlight-2"), t("highlight-3")]}
      cta={t("cta")}
      avatarSrc={`data:image/png;base64,${Buffer.from(avatar).toString("base64")}`}
    />,
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, style: "normal", weight: 400 },
        { name: "Geist", data: geistSemiBold, style: "normal", weight: 600 }
      ]
    }
  )
}
