# jime.dev

The portfolio of George (Jorge) Jimenez, senior full-stack software engineer and founder of [Crealix AI](https://www.crealix.ai). It's minimal on purpose: recruiters find the experience, projects, skills and CV in seconds, and AI agents get the same in [`/llms.txt`](https://jime.dev/llms.txt).

**Live:** [jime.dev](https://jime.dev) (English) · [jime.dev/es](https://jime.dev/es) (Spanish)

## Stack

- **[Next.js 16](https://nextjs.org)** with Cache Components: every page is prerendered at build time
- **React 19**, TypeScript and **Tailwind CSS 4**
- **[next-intl](https://next-intl.dev)**: English at `/`, Spanish at `/es`
- **[Contentful](https://www.contentful.com)** for all content, read over GraphQL with `graphql-request`
- **Base UI** primitives, Lucide icons and the Geist typeface
- **Biome** for linting and formatting, **Vercel** for hosting and analytics

## Pages and routes

| Route | What it is |
| --- | --- |
| `/` | Hero, experience, selected projects, skills and contact |
| `/about` | Bio and every role on a timeline, with durations, details and stack |
| `/projects` | Apps and marketing websites, with screenshots |
| `/blog`, `/blog/[slug]` | Writing (hidden from the nav until a post exists) |
| `/cv` | The CV as a web page; `/cv.pdf` downloads it (both `noindex`) |
| `/llms.txt` | The site summarized for language models |
| `/feed.xml`, `/sitemap.xml`, `/robots.txt` | RSS, sitemap with hreflang, crawler rules |

Each page sets canonical and hreflang links, Open Graph data and JSON-LD (Person, WebSite, ProfilePage, BreadcrumbList). The social card is generated per locale in `src/app/[locale]/opengraph-image.tsx`.

## Content model

Content lives in Contentful with `en` and `es` locales:

- **profile**: name, headline, bio, avatar, CV PDF, links and skills
- **experience**: role, company, dates, summary, details, highlights and stack. A highlight that starts with a figure ("1,800+ users") is shown as a stat
- **website**: a project, marked `app` or `marketing`. "Show on home" picks the ones on the home page
- **blogPost**: localized title, excerpt and rich-text body, with one shared slug

Pages are built from Contentful at deploy time, so **redeploy after editing content**. A current role's duration counts up to the current month and refreshes daily.

## Getting started

```bash
pnpm install
cp .env.example .env   # then fill in the Contentful keys
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_FRONTEND_URL` | The site URL (`https://jime.dev`) |
| `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` | The Contentful space |
| `CONTENTFUL_ACCESS_TOKEN` | Delivery API (published content) |
| `CONTENTFUL_PREVIEW_API_TOKEN` | Preview API (draft content) |
| `CONTENTFUL_ENVIRONMENT` | Contentful environment, `master` by default |
| `CONTENTFUL_CMA_TOKEN` | Management API, for local content scripts only. Never deploy it |

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build (needs the Contentful keys) |
| `pnpm start` | Serves the production build |
| `pnpm lint` | Biome check |
| `pnpm format` | Biome format |

## Project structure

```
src/
├── app/            Routes, metadata, OG image, sitemap, robots, llms.txt
├── features/       One folder per page: home, about, projects, blog
├── components/     Shared UI: layouts, content blocks, common widgets
├── lib/            Contentful client and queries, helpers, constants
├── i18n/           next-intl routing and request config
└── assets/         The CV source (cv.html) and fonts for the OG image
messages/           en.json and es.json
```

## License

The code is open to read and learn from. The content (text, photos, CV and project screenshots) belongs to George Jimenez and isn't licensed for reuse.
