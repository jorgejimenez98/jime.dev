import "server-only"
import { routing } from "@/i18n/routing"
import { UI } from "@/lib/constants/ui.constants"
import type {
  BlogPostSummary,
  Experience,
  Profile,
  Website
} from "@/lib/contentful/contentful.types"
import { countMonths, formatDuration, formatMonthYear } from "./dates.helpers"
import { localizedUrl, SITE_NAMES, SITE_URL } from "./seo.helpers"

interface LlmsTxtOptions {
  profile: Profile
  experiences: Experience[]
  websites: Website[]
  posts: BlogPostSummary[]
  // The first of this month, which a current role counts up to
  currentMonth: string
}

const LOCALE = routing.defaultLocale

function link(name: string, url: string, note?: string | null) {
  return `- [${name}](${url})${note ? `: ${note}` : ""}`
}

// "Nov 2024 – present (2 years)"
function dateRange(experience: Experience, currentMonth: string) {
  const start = formatMonthYear(experience.startDate, LOCALE)
  const end = experience.endDate
    ? formatMonthYear(experience.endDate, LOCALE)
    : "present"
  const months = countMonths(
    experience.startDate,
    experience.endDate ?? currentMonth
  )
  return `${start} – ${end} (${formatDuration(Math.max(1, months), LOCALE)})`
}

/**
 * /llms.txt (llmstxt.org): who George is and where everything lives, as
 * Markdown for language models. Built from the same Contentful data as the site.
 */
export function renderLlmsTxt({
  profile,
  experiences,
  websites,
  posts,
  currentMonth
}: LlmsTxtOptions) {
  const otherNames = [SITE_NAMES.es, profile.alternateName].filter(
    (name): name is string => !!name && name !== profile.name
  )
  const apps = websites.filter(website => website.kind === "app")
  const marketing = websites.filter(website => website.kind !== "app")

  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.headline}. Based in ${profile.location ?? "Miami, FL"}. Also known as ${otherNames.join(" and ")}.`,
    "",
    profile.shortBio,
    "",
    `Every page is available in English at ${SITE_URL} and in Spanish under ${localizedUrl(UI.ROUTES.HOME, "es")}. Many more client apps I built are under NDA and not listed here.`,
    ""
  ]

  if (profile.skills?.length) {
    lines.push(
      "**Skills**",
      "",
      ...profile.skills.map(group => `- ${group}`),
      ""
    )
  }

  lines.push(
    "## Pages",
    "",
    link(
      "Home",
      localizedUrl(UI.ROUTES.HOME, LOCALE),
      "Headline, experience, selected projects, skills and contact"
    ),
    link(
      "About",
      localizedUrl(UI.ROUTES.ABOUT, LOCALE),
      "Full experience, skills, education and languages"
    ),
    link(
      "Projects",
      localizedUrl(UI.ROUTES.PROJECTS, LOCALE),
      "Apps and marketing websites I built"
    ),
    link("CV", `${SITE_URL}${UI.ROUTES.CV}`, "Résumé, readable in the browser"),
    link(
      "CV (PDF)",
      `${SITE_URL}${UI.ROUTES.CV_PDF}`,
      "The same résumé as a PDF"
    ),
    "",
    "## Experience",
    "",
    // Each role, then what it involved as nested points
    ...experiences.flatMap(experience => [
      link(
        experience.company,
        experience.companyUrl ?? localizedUrl(UI.ROUTES.ABOUT, LOCALE),
        [
          `${experience.role}, ${dateRange(experience, currentMonth)}`,
          experience.summary
        ]
          .filter(Boolean)
          .join(". ")
      ),
      ...(experience.details ?? []).map(detail => `  - ${detail}`)
    ]),
    ""
  )

  if (apps.length > 0) {
    lines.push(
      "## Apps",
      "",
      ...apps.map(app =>
        link(app.name, app.url, `${app.description} (${app.year})`)
      ),
      ""
    )
  }
  if (marketing.length > 0) {
    lines.push(
      "## Marketing websites",
      "",
      ...marketing.map(site =>
        link(
          site.name,
          site.url,
          `${site.description} (${site.year}${site.client ? `, for ${site.client}` : ""})`
        )
      ),
      ""
    )
  }
  if (posts.length > 0) {
    lines.push(
      "## Writing",
      "",
      ...posts.map(post =>
        link(
          post.title,
          localizedUrl(`${UI.ROUTES.BLOG}/${post.slug}`, LOCALE),
          post.excerpt
        )
      ),
      ""
    )
  }

  const contact = [
    profile.email && link("Email", `mailto:${profile.email}`, profile.email),
    profile.linkedinUrl && link("LinkedIn", profile.linkedinUrl),
    ...(profile.githubUrls ?? []).map(url =>
      link(`GitHub (${new URL(url).pathname.slice(1)})`, url)
    ),
    profile.xUrl && link("X", profile.xUrl)
  ].filter((line): line is string => !!line)
  lines.push("## Contact", "", ...contact, "")

  lines.push(
    "## Optional",
    "",
    link(
      "Español",
      localizedUrl(UI.ROUTES.HOME, "es"),
      "The whole site in Spanish"
    ),
    link("RSS feed", localizedUrl(UI.ROUTES.FEED, LOCALE)),
    link("Sitemap", `${SITE_URL}/sitemap.xml`),
    ""
  )

  return lines.join("\n")
}
