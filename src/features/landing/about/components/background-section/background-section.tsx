import type { AppLocale } from "@/i18n"
import { getTranslations } from "next-intl/server"

interface BackgroundSectionProps {
  locale: AppLocale
  education: string | null
  languages: string | null
}

// Education and languages, one line each
export async function BackgroundSection({
  locale,
  education,
  languages
}: BackgroundSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" })

  return (
    <section aria-labelledby="background-title" className="mt-12">
      <h2 id="background-title" className="font-medium">
        {t("background-title")}
      </h2>
      <div className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed">
        {education && <p>{education}</p>}
        {languages && <p className="text-muted-foreground">{languages}</p>}
      </div>
    </section>
  )
}
