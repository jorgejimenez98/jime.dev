// The OG renderer (Satori) reads inline styles only, so the site's dark tokens
// are spelled out here in hex: --background, --foreground, --muted-foreground,
// the dark --primary and two neutral steps for the tags
const COLORS = {
  background: "#0e1115",
  foreground: "#f4f7f9",
  muted: "#9aa4ae",
  tag: "#151a20",
  tagBorder: "#262d35",
  primary: "#00c7e5",
  onPrimary: "#0e1115"
}

interface SiteOgCardProps {
  name: string
  headline: string
  initials: string
  domain: string
  location: string | null
  highlights: string[]
  cta: string
  // A data: URL: the renderer can't fetch or read WebP
  avatarSrc: string
}

/**
 * The social card shared by every page: who George is, three facts a recruiter
 * scans for, and a call to action. Square corners like the site, the portrait
 * the only round shape.
 */
export function SiteOgCard({
  name,
  headline,
  initials,
  domain,
  location,
  highlights,
  cta,
  avatarSrc
}: SiteOgCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        background: COLORS.background,
        color: COLORS.foreground,
        fontFamily: "Geist"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              background: COLORS.foreground,
              color: COLORS.background,
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: "0.06em"
            }}
          >
            {initials}
          </div>
          <div style={{ fontSize: 26, fontWeight: 600 }}>{domain}</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 56
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 32,
              lineHeight: 1.3,
              color: COLORS.muted,
              textWrap: "balance"
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 34
            }}
          >
            {highlights.map(highlight => (
              <div
                key={highlight}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  background: COLORS.tag,
                  border: `2px solid ${COLORS.tagBorder}`,
                  fontSize: 23
                }}
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>

        {/* biome-ignore lint/performance/noImgElement: the OG renderer only draws <img> */}
        <img
          src={avatarSrc}
          alt=""
          width={236}
          height={236}
          style={{ borderRadius: 9999, border: `5px solid ${COLORS.primary}` }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 28px",
            background: COLORS.primary,
            color: COLORS.onPrimary,
            fontSize: 26,
            fontWeight: 600
          }}
        >
          {cta}
          <span style={{ fontSize: 28 }}>→</span>
        </div>
        {location && (
          <div style={{ fontSize: 24, color: COLORS.muted }}>{location}</div>
        )}
      </div>
    </div>
  )
}
