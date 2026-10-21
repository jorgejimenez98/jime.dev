import { gql } from "graphql-request"
import type { Profile } from "../contentful.types"

export const PROFILE_QUERY = gql`
  query Profile($locale: String!, $preview: Boolean!) {
    profileCollection(limit: 1, locale: $locale, preview: $preview) {
      items {
        sys {
          publishedAt
        }
        name
        alternateName
        headline
        shortBio
        bio {
          json
        }
        avatar {
          url
          width
          height
          title
          description
        }
        resume {
          url
          fileName
          contentType
        }
        location
        email
        githubUrl
        linkedinUrl
        xUrl
        skills
        education
        languages
      }
    }
  }
`

export interface ProfileQueryResult {
  profileCollection: { items: (Profile | null)[] } | null
}
