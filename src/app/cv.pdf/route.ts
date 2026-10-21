import { routing } from "@/i18n/routing"
import { getAssetBytes, getProfile } from "@/lib/contentful"
import { notFound } from "next/navigation"

// The CV lives in Contentful; this serves it from jime.dev under a readable
// filename. It's prerendered and refreshed by the same webhook as the pages.
export async function GET() {
  // One CV for both languages, so the default locale's entry is enough
  const { resume } = await getProfile(routing.defaultLocale)
  if (!resume) notFound()

  const pdf = await getAssetBytes(resume.url)

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="George-Jimenez-CV.pdf"',
      // The PDF carries a phone number and an email: keep it out of search
      "X-Robots-Tag": "noindex, nofollow"
    }
  })
}
