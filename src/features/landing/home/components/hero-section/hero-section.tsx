import { GithubIcon, LinkedinIcon } from "@/components/common"
import { CvDownloadButton } from "@/components/content"
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
    { label: "GitHub", href: profile.githubUrls?.[0], icon: GithubIcon }
  ].filter((link): link is typeof link & { href: string } => !!link.href)

  return (
    <section aria-labelledby="hero-title" className="pt-14 sm:pt-20">
      <Image
        src={profile.avatar.url}
        alt={profile.avatar.description ?? profile.name}
        width={72}
        height={72}
        loading="eager"
        className="size-18 rounded-full bg-muted object-cover"
      />

      <h1 id="hero-title" className="mt-6 text-display font-semibold">
        {profile.name}
      </h1>
      <p className="mt-2.5 text-muted-foreground">{profile.headline}</p>
      <p className="mt-5 max-w-[56ch] leading-relaxed">{profile.shortBio}</p>

      <div className="mt-7 flex flex-wrap gap-2">
        <CvDownloadButton label={t("cv")} />
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
