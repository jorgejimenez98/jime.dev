import { routing } from "@/i18n/routing"
import createMiddleware from "next-intl/middleware"

export default createMiddleware(routing)

export const config = {
  // Skip api, trpc, Next.js internals and any path with a dot (static files)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
}
