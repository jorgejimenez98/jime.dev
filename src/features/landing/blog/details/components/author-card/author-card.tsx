import type { Profile } from "@/lib/contentful"
import Image from "next/image"

interface AuthorCardProps {
  profile: Profile
  label: string
}

// Who wrote it, closing the article
export function AuthorCard({ profile, label }: AuthorCardProps) {
  return (
    <footer className="mt-12 flex items-center gap-3 border-t border-border/40 pt-6">
      <Image
        src={profile.avatar.url}
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-full bg-muted object-cover"
      />
      <p className="text-sm">
        <span className="sr-only">{label} </span>
        <span className="block font-medium">{profile.name}</span>
        <span className="block text-muted-foreground">{profile.headline}</span>
      </p>
    </footer>
  )
}
