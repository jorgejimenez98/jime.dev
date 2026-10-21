import type { Metadata } from "next"
import { HomePageContent } from "@/features/landing/home/home.page"
import type { AppLocale } from "@/i18n"
import { UI } from "@/lib/constants/ui.constants"
import { alternatesFor } from "@/lib/helpers"

// The layout's default title and description are the home page's own
// (a title template never applies to a page in the layout's segment)
export async function generateMetadata({
  params
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params

  return { alternates: alternatesFor(UI.ROUTES.HOME, locale as AppLocale) }
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  // The [locale] layout already rejected unknown locales with notFound()
  const { locale } = await params

  return <HomePageContent locale={locale as AppLocale} />
}
