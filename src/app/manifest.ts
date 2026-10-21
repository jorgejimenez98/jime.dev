import type { MetadataRoute } from "next"
import { SITE_NAMES } from "@/lib/helpers"

// Lets browsers and search engines name and badge the site consistently
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAMES.en} · Senior Full-Stack Software Engineer`,
    short_name: SITE_NAMES.en,
    description:
      "Portfolio, projects and CV of George (Jorge) Jimenez, senior full-stack software engineer in Miami.",
    start_url: "/",
    display: "browser",
    background_color: "#f4f7f9",
    theme_color: "#f4f7f9",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" }
    ]
  }
}
