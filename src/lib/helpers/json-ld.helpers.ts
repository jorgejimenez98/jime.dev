import type { AppLocale } from "@/i18n/routing"
import { UI } from "@/lib/constants/ui.constants"
import type { BlogPost, Experience, Profile, Website } from "@/lib/contentful"
import {
  localizedUrl,
  SITE_NAMES,
  SITE_URL,
  siteOpenGraphImageUrl
} from "./seo.helpers"

// schema.org entities for George's pages. Every page points at one Person
// through a stable @id, so search engines merge them into one entity.

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

type JsonLdNode = Record<string, unknown>

export function jsonLdGraph(...nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes }
}

function toAddress(location: string | null) {
  if (!location) return undefined
  const [locality, region] = location.split(",").map(part => part.trim())
  return {
    "@type": "PostalAddress",
    addressLocality: locality,
    addressRegion: region,
    addressCountry: "US"
  }
}

// "Frontend: React, Next.js" → ["React", "Next.js"]
function toKnowsAbout(skills: string[] | null) {
  return (skills ?? []).flatMap(item =>
    item
      .slice(item.indexOf(":") + 1)
      .split(",")
      .map(skill => skill.trim())
      .filter(Boolean)
  )
}

// "Software Engineering · University of Camagüey · 2017 — 2021" → the school
function toAlumniOf(education: string | null) {
  const school = education?.split("·")[1]?.trim()
  return school ? { "@type": "CollegeOrUniversity", name: school } : undefined
}

export function personJsonLd(
  profile: Profile,
  experiences: Experience[]
): JsonLdNode {
  const current = experiences.filter(experience => !experience.endDate)
  // Every other name he goes by: the legal one and the other locale's
  const alternateNames = [
    ...new Set([profile.alternateName, ...Object.values(SITE_NAMES)])
  ].filter(name => name && name !== profile.name)

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    givenName: profile.name.split(" ")[0],
    familyName: profile.name.split(" ").slice(1).join(" "),
    alternateName: alternateNames,
    url: SITE_URL,
    image: profile.avatar.url,
    description: profile.shortBio,
    jobTitle: profile.headline.split("·")[0].trim(),
    worksFor: current.map(experience => ({
      "@type": "Organization",
      name: experience.company,
      url: experience.companyUrl ?? undefined
    })),
    alumniOf: toAlumniOf(profile.education),
    address: toAddress(profile.location),
    knowsAbout: toKnowsAbout(profile.skills),
    knowsLanguage: ["es", "en"],
    sameAs: [
      profile.linkedinUrl,
      ...(profile.githubUrls ?? []),
      profile.xUrl
    ].filter(Boolean)
  }
}

export function websiteJsonLd(locale: AppLocale): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAMES[locale],
    alternateName: Object.values(SITE_NAMES).filter(
      name => name !== SITE_NAMES[locale]
    ),
    inLanguage: ["en", "es"],
    publisher: { "@id": PERSON_ID }
  }
}

export function profilePageJsonLd(
  profile: Profile,
  locale: AppLocale
): JsonLdNode {
  return {
    "@type": "ProfilePage",
    url: localizedUrl(UI.ROUTES.ABOUT, locale),
    inLanguage: locale,
    dateModified: profile.sys.publishedAt,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID }
  }
}

// The projects page as a list of works George made, apps first like the page
export function projectsPageJsonLd(
  websites: Website[],
  locale: AppLocale
): JsonLdNode {
  return {
    "@type": "CollectionPage",
    url: localizedUrl(UI.ROUTES.PROJECTS, locale),
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: websites.map((website, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: website.name,
          url: website.url,
          description: website.description,
          dateCreated: String(website.year),
          image: website.screenshot?.url,
          creator: { "@id": PERSON_ID }
        }
      }))
    }
  }
}

export function blogPostingJsonLd(
  post: BlogPost,
  locale: AppLocale
): JsonLdNode {
  const url = localizedUrl(`${UI.ROUTES.BLOG}/${post.slug}`, locale)

  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    inLanguage: locale,
    datePublished: post.publishDate,
    dateModified: post.sys.publishedAt,
    image: post.coverImage?.url ?? siteOpenGraphImageUrl(locale),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID }
  }
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}
