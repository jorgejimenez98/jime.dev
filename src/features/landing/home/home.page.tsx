import { JsonLd } from "@/components/content"
import { LandingContainer } from "@/components/layouts"
import type { AppLocale } from "@/i18n"
import {
  getExperiences,
  getPosts,
  getProfile,
  getWebsites
} from "@/lib/contentful"
import { jsonLdGraph, personJsonLd, websiteJsonLd } from "@/lib/helpers"
import {
  ExperiencePreview,
  HeroSection,
  WebsitesPreview,
  WritingPreview
} from "./components"

interface HomePageContentProps {
  locale: AppLocale
}

export async function HomePageContent({ locale }: HomePageContentProps) {
  // Featured websites come first, so the four newest featured ones lead
  const [profile, experiences, websites, posts] = await Promise.all([
    getProfile(locale),
    getExperiences(locale),
    getWebsites(locale, { limit: 4 }),
    getPosts(locale, { limit: 3 })
  ])

  return (
    <LandingContainer>
      <JsonLd
        data={jsonLdGraph(websiteJsonLd(), personJsonLd(profile, experiences))}
      />
      <HeroSection locale={locale} profile={profile} />
      {experiences.length > 0 && (
        <ExperiencePreview locale={locale} experiences={experiences} />
      )}
      {websites.length > 0 && (
        <WebsitesPreview locale={locale} websites={websites} />
      )}
      {posts.length > 0 && <WritingPreview locale={locale} posts={posts} />}
    </LandingContainer>
  )
}
