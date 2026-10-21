import { routing } from "@/i18n/routing"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

// The CV as a web page. It's the same document /cv.pdf is printed from, so the
// two never drift; its @media screen layer adds the toolbar and the sheet.
const html = await readFile(
  join(process.cwd(), "src/assets/cv/cv.html"),
  "utf8"
)

// The CV is in English, so /es/cv serves the same page
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export function GET() {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Like the PDF: it carries a phone number and an email
      "X-Robots-Tag": "noindex, nofollow"
    }
  })
}
