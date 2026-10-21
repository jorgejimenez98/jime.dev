import { ContactSection, JsonLd, SkillsList } from "@/components/content"
import { LandingContainer } from "@/components/layouts"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { getExperiences, getProfile } from "@/lib/contentful"
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  localizedUrl,
  personJsonLd,
  profilePageJsonLd,
  SITE_NAMES
} from "@/lib/helpers"
import { AboutIntro, BackgroundSection, ExperienceList } from "./components"
import { getTranslations } from "next-intl/server"

interface AboutPageContentProps {
  locale: AppLocale
}

export async function AboutPageContent({ locale }: AboutPageContentProps) {
  const [t, profile, experiences] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getProfile(locale),
    getExperiences(locale)
  ])
  const breadcrumb = breadcrumbJsonLd([
    { name: SITE_NAMES[locale], url: localizedUrl(UI.ROUTES.HOME, locale) },
    { name: t("title"), url: localizedUrl(UI.ROUTES.ABOUT, locale) }
  ])

  return (
    <LandingContainer className="pt-14 sm:pt-20">
      <JsonLd
        data={jsonLdGraph(
          profilePageJsonLd(profile, locale),
          personJsonLd(profile, experiences),
          breadcrumb
        )}
      />
      <AboutIntro locale={locale} profile={profile} />
      {experiences.length > 0 && (
        <ExperienceList locale={locale} experiences={experiences} />
      )}
      {profile.skills && profile.skills.length > 0 && (
        <SkillsList
          id="skills-title"
          title={t("skills-title")}
          skills={profile.skills}
          className="mt-12"
        />
      )}
      {(profile.education || profile.languages) && (
        <BackgroundSection
          locale={locale}
          education={profile.education}
          languages={profile.languages}
        />
      )}
      <ContactSection locale={locale} profile={profile} className="mt-12" />
    </LandingContainer>
  )
}
