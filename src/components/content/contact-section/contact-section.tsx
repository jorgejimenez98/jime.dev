import type { AppLocale } from "@/i18n"
import type { Profile } from "@/lib/contentful"
import { getTranslations } from "next-intl/server"

interface ContactSectionProps {
  locale: AppLocale
  profile: Profile
  className?: string
}

const LINK_CLASS_NAME =
  "underline decoration-border underline-offset-4 transition-colors duration-(--t-hover) hover:decoration-foreground"

// "https://github.com/jorgejimenez98-crealix" → "jorgejimenez98-crealix"
function handleOf(url: string) {
  return new URL(url).pathname.split("/").filter(Boolean).at(-1) ?? url
}

// Every way to reach George, as one label/value list like the skills
export async function ContactSection({
  locale,
  profile,
  className
}: ContactSectionProps) {
  const t = await getTranslations({ locale, namespace: "contact" })
  const githubUrls = profile.githubUrls ?? []
  const external = { target: "_blank", rel: "noopener noreferrer" }

  return (
    <section id="contact" aria-labelledby="contact-title" className={className}>
      <h2 id="contact-title" className="font-medium">
        {t("title")}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("text")}</p>

      <dl className="mt-4 grid grid-cols-1 gap-y-3 text-sm leading-relaxed sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-4 sm:gap-y-2">
        {profile.email && (
          <div className="contents">
            <dt className="text-muted-foreground">{t("email")}</dt>
            <dd className="-mt-2.5 sm:mt-0">
              <a href={`mailto:${profile.email}`} className={LINK_CLASS_NAME}>
                {profile.email}
              </a>
            </dd>
          </div>
        )}
        {profile.linkedinUrl && (
          <div className="contents">
            <dt className="text-muted-foreground">LinkedIn</dt>
            <dd className="-mt-2.5 sm:mt-0">
              <a
                href={profile.linkedinUrl}
                {...external}
                className={LINK_CLASS_NAME}
              >
                {handleOf(profile.linkedinUrl)}
              </a>
            </dd>
          </div>
        )}
        {githubUrls.length > 0 && (
          <div className="contents">
            <dt className="text-muted-foreground">GitHub</dt>
            <dd className="-mt-2.5 flex flex-wrap gap-x-4 gap-y-1 sm:mt-0">
              {githubUrls.map(url => (
                <a
                  key={url}
                  href={url}
                  {...external}
                  className={LINK_CLASS_NAME}
                >
                  {handleOf(url)}
                </a>
              ))}
            </dd>
          </div>
        )}
        {profile.location && (
          <div className="contents">
            <dt className="text-muted-foreground">{t("location")}</dt>
            <dd className="-mt-2.5 sm:mt-0">{profile.location}</dd>
          </div>
        )}
      </dl>
    </section>
  )
}
