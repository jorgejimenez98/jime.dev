import { ContactSection, JsonLd, SkillsList } from "@/components/content"
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
  ProjectsPreview,
  WritingPreview
} from "./components"
import { getTranslations } from "next-intl/server"

interface HomePageContentProps {
  locale: AppLocale
}

export async function HomePageContent({ locale }: HomePageContentProps) {
  // Every site: the preview shows the home picks and counts the rest
  const [t, profile, experiences, websites, posts] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getProfile(locale),
    getExperiences(locale),
    getWebsites(locale),
    getPosts(locale, { limit: 3 })
  ])

  return (
    <LandingContainer>
      <JsonLd
        data={jsonLdGraph(
          websiteJsonLd(locale),
          personJsonLd(profile, experiences)
        )}
      />
      <HeroSection locale={locale} profile={profile} />
      {experiences.length > 0 && (
        <ExperiencePreview locale={locale} experiences={experiences} />
      )}
      {websites.length > 0 && (
        <ProjectsPreview locale={locale} websites={websites} />
      )}
      {profile.skills && profile.skills.length > 0 && (
        <SkillsList
          id="skills-title"
          title={t("skills-title")}
          skills={profile.skills}
          note={t("skills-note")}
          className="mt-14"
        />
      )}
      {posts.length > 0 && <WritingPreview locale={locale} posts={posts} />}
      <ContactSection locale={locale} profile={profile} className="mt-14" />
    </LandingContainer>
  )
}
