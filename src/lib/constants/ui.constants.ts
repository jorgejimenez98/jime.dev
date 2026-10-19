export const UI = {
  LOCALES: {
    DEFAULT: "en",
    ALL: ["en", "es"],

    SELECTOR: [
      { code: "en", name: "English" },
      { code: "es", name: "Español" }
    ]
  },

  PROFILE: {
    // Temporary: points at the Crealix CDN until the CMS serves the photo
    PHOTO: "https://static.crealix.ai/static/landing/founder.webp"
  },

  LINKS: {
    CREALIX: "https://www.crealix.ai",
    GITHUB: "https://github.com/jorgejimenez98",
    LINKEDIN: "https://www.linkedin.com/in/jorge-jimenez-diaz-6590b8206"
  }
} as const
