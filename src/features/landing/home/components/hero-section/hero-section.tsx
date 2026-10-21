import { GithubIcon, LinkedinIcon, XIcon } from "@/components/common"
import { CvButton } from "@/components/content"
import { Button } from "@/components/ui"
import type { AppLocale } from "@/i18n"
import type { Profile } from "@/lib/contentful"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

interface HeroSectionProps {
  locale: AppLocale
  profile: Profile
}

// Who George is and what he does, with the CV one click away
export async function HeroSection({ locale, profile }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "home" })
  // The personal GitHub account leads; the work ones are in the contact section
  const links = [
    { label: "LinkedIn", href: profile.linkedinUrl, icon: LinkedinIcon },
    { label: "GitHub", href: profile.githubUrls?.[0], icon: GithubIcon },
    { label: "X", href: profile.xUrl, icon: XIcon }
  ].filter((link): link is typeof link & { href: string } => !!link.href)

  return (
    <section aria-labelledby="hero-title" className="pt-10 sm:pt-14">
      {/* Name and role share a row with the portrait, on phones too */}
      <div className="flex items-center justify-between gap-5 sm:gap-8">
        <div className="min-w-0">
          <h1 id="hero-title" className="text-display font-semibold">
            {profile.name}
          </h1>
          <p className="mt-2 text-muted-foreground">{profile.headline}</p>
        </div>
        <Image
          src={profile.avatar.url}
          alt={profile.avatar.description ?? profile.name}
          width={112}
          height={112}
          sizes="(min-width: 640px) 112px, 64px"
          loading="eager"
          className="size-16 shrink-0 rounded-full bg-muted object-cover sm:size-28"
        />
      </div>
      <p className="mt-6 max-w-[60ch] leading-relaxed">{profile.shortBio}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <CvButton label={t("cv")} />
        {links.map(({ label, href, icon: Icon }) => (
          <Button
            key={label}
            variant="outline"
            size="icon"
            aria-label={label}
            render={<a href={href} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
          >
            <Icon />
          </Button>
        ))}
      </div>
    </section>
  )
}
