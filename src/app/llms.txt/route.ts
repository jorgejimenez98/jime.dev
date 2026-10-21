import { routing } from "@/i18n/routing"
import {
  getExperiences,
  getPosts,
  getProfile,
  getWebsites
} from "@/lib/contentful"
import { renderLlmsTxt } from "@/lib/helpers"

// llmstxt.org: the site summarized for language models, in English. It's
// prerendered from Contentful, so every deploy refreshes it.
export async function GET() {
  const locale = routing.defaultLocale
  const [profile, experiences, websites, posts] = await Promise.all([
    getProfile(locale),
    getExperiences(locale),
    getWebsites(locale),
    getPosts(locale)
  ])

  return new Response(
    renderLlmsTxt({ profile, experiences, websites, posts }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  )
}
