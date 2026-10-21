import { CvDownloadButton, RichText } from "@/components/content"
import type { AppLocale } from "@/i18n"
import type { Profile } from "@/lib/contentful"
import { getTranslations } from "next-intl/server"

interface AboutIntroProps {
  locale: AppLocale
  profile: Profile
}

export async function AboutIntro({ locale, profile }: AboutIntroProps) {
  const t = await getTranslations({ locale, namespace: "about" })

  return (
    <section aria-labelledby="about-title">
      <h1 id="about-title" className="text-title font-semibold">
        {t("title")}
      </h1>

      {/* The legal name is said once in plain text: people search for both */}
      {profile.alternateName && (
        <p className="mt-4 text-lg leading-relaxed">
          {t("lead", { alternateName: profile.alternateName })}
        </p>
      )}

      {profile.bio && (
        <div className="mt-4 max-w-[60ch]">
          <RichText document={profile.bio.json} />
        </div>
      )}
      <div className="mt-7">
        <CvDownloadButton label={t("cv")} />
      </div>
    </section>
  )
}
