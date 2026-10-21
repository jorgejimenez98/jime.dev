import { routing } from "@/i18n/routing"
import { getAssetBytes, getProfile } from "@/lib/contentful"
import { SITE_URL } from "@/lib/helpers"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { notFound } from "next/navigation"
import { ImageResponse } from "next/og"
import { hasLocale } from "next-intl"

export const alt = "George Jimenez, Senior Frontend Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// The site tokens (--background, --foreground, --muted-foreground, --border
// and the light --primary) in hex, since the renderer doesn't read oklch
const COLORS = {
  background: "#f4f7f9",
  foreground: "#121922",
  muted: "#565d64",
  border: "#e1e4e5",
  primary: "#007aa1"
}

// Geist as TTF (the renderer can't read WOFF2), read once per server start
const FONTS_DIR = join(process.cwd(), "src/assets/fonts")
const [geistRegular, geistSemiBold] = await Promise.all([
  readFile(join(FONTS_DIR, "Geist-Regular.ttf")),
  readFile(join(FONTS_DIR, "Geist-SemiBold.ttf"))
])

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

// The default social card for every page in a locale: avatar, name, headline
export default async function OpenGraphImage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const profile = await getProfile(locale)
  // PNG at 2x the drawn size, cropped to the face: the renderer can't read WebP
  const avatar = await getAssetBytes(
    `${profile.avatar.url}?fm=png&w=264&h=264&fit=thumb&f=face`
  )
  const avatarSrc = `data:image/png;base64,${Buffer.from(avatar).toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 80,
        background: COLORS.background,
        fontFamily: "Geist"
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: the OG renderer only draws <img> */}
      <img
        src={avatarSrc}
        alt=""
        width={132}
        height={132}
        style={{ borderRadius: 9999, border: `2px solid ${COLORS.border}` }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: COLORS.foreground
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            lineHeight: 1.35,
            // A long headline wraps into even lines, never one orphaned word
            textWrap: "balance",
            color: COLORS.muted
          }}
        >
          {profile.headline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.primary
          }}
        >
          {new URL(SITE_URL).host}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, style: "normal", weight: 400 },
        { name: "Geist", data: geistSemiBold, style: "normal", weight: 600 }
      ]
    }
  )
}
