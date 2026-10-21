export const UI = {
  LOCALES: {
    DEFAULT: "en",
    ALL: ["en", "es"],

    SELECTOR: [
      { code: "en", name: "English" },
      { code: "es", name: "Español" }
    ]
  },

  // Single source for internal paths (header, footer, sitemap, SEO helpers)
  ROUTES: {
    HOME: "/",
    BLOG: "/blog",
    PROJECTS: "/projects",
    ABOUT: "/about",
    CV: "/cv.pdf",
    FEED: "/feed.xml"
  },

  NAV: [
    { key: "blog", href: "/blog" },
    { key: "projects", href: "/projects" },
    { key: "about", href: "/about" }
  ]
} as const
