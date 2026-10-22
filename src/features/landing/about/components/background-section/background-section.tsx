import type { AppLocale } from "@/i18n"
import { getTranslations } from "next-intl/server"

interface BackgroundSectionProps {
  locale: AppLocale
  education: string | null
  languages: string | null
  className?: string
}

// Education and languages, one line each
export async function BackgroundSection({
  locale,
  education,
  languages,
  className
}: BackgroundSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" })

  return (
    <section aria-labelledby="background-title" className={className}>
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
