import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // /websites became /projects once apps joined the marketing sites
  async redirects() {
    return [
      { source: "/websites", destination: "/projects", permanent: true },
      { source: "/en/websites", destination: "/projects", permanent: true },
      { source: "/es/websites", destination: "/es/projects", permanent: true }
    ]
  },
  partialPrefetching: true,
  images: {
    // Contentful's Images API resizes at its CDN; non-Contentful images
    // must be rendered with `unoptimized` (see the loader)
    loader: "custom",
    loaderFile: "./src/lib/contentful/image-loader.ts"
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css"
      }
    }
  }
}

// Generates `messages/en.d.json.ts` so message keys and ICU arguments are typed
const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json"
  }
})

export default withNextIntl(nextConfig)
