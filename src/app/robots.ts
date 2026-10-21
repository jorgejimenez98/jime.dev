import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/helpers"

// Everything is crawlable, /cv.pdf included: its noindex header only works if it's read
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`
  }
}
