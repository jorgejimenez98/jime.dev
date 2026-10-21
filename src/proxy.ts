import { routing } from "@/i18n/routing"
import createMiddleware from "next-intl/middleware"

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Skip api, trpc, Next.js internals, OG image routes (already locale-
    // prefixed, so a rewrite would only add a redirect for crawlers) and any
    // path with a dot (static files, sitemap.xml, robots.txt, cv.pdf).
    "/((?!api|trpc|_next|_vercel|.*opengraph-image|.*\\..*).*)",
    // …except the default-locale feed, which must be rewritten to /en/feed.xml
    "/feed.xml"
  ]
}
