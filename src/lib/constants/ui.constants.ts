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
    WEBSITES: "/websites",
    ABOUT: "/about",
    CV: "/cv.pdf",
    FEED: "/feed.xml"
  },

  NAV: [
    { key: "blog", href: "/blog" },
    { key: "websites", href: "/websites" },
    { key: "about", href: "/about" }
  ],

  LINKS: {
    GITHUB: "https://github.com/jorgejimenez98",
    LINKEDIN: "https://www.linkedin.com/in/jorge-jimenez-diaz-6590b8206"
  }
} as const
