import { WebsiteListItem } from "@/components/content"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import type { Website } from "@/lib/contentful"
import { getTranslations } from "next-intl/server"
import { SectionHeader } from "../section-header/section-header"

interface WebsitesPreviewProps {
  locale: AppLocale
  websites: Website[]
}

export async function WebsitesPreview({
  locale,
  websites
}: WebsitesPreviewProps) {
  const [t, tWebsites] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "websites" })
  ])

  return (
    <section aria-labelledby="websites-title" className="mt-14">
      <SectionHeader
        id="websites-title"
        title={t("websites-title")}
        locale={locale}
        link={{ href: UI.ROUTES.WEBSITES, label: t("websites-link") }}
      />
      <ul className="mt-2">
        {websites.map(website => (
          <WebsiteListItem
            key={website.sys.id}
            website={website}
            size="compact"
            newTabLabel={tWebsites("new-tab")}
          />
        ))}
      </ul>
    </section>
  )
}
