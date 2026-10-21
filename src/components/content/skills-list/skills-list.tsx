interface SkillsListProps {
  id: string
  title: string
  // One group per item: "Group: skill, skill, skill"
  skills: string[]
  className?: string
}

function toGroup(item: string) {
  const separator = item.indexOf(":")
  if (separator === -1) return { label: null, skills: item.trim() }

  return {
    label: item.slice(0, separator).trim(),
    skills: item.slice(separator + 1).trim()
  }
}

// Skills grouped as the CV groups them: the label above on phones, beside from sm
export function SkillsList({ id, title, skills, className }: SkillsListProps) {
  const groups = skills.map(toGroup)

  return (
    <section aria-labelledby={id} className={className}>
      <h2 id={id} className="font-medium">
        {title}
      </h2>
      <dl className="mt-3 grid grid-cols-1 gap-y-3 text-sm leading-relaxed sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-4 sm:gap-y-2">
        {groups.map(group =>
          group.label ? (
            <div key={group.label} className="contents">
              <dt className="text-muted-foreground">{group.label}</dt>
              <dd className="-mt-2.5 sm:mt-0">{group.skills}</dd>
            </div>
          ) : (
            <dd key={group.skills} className="sm:col-span-2">
              {group.skills}
            </dd>
          )
        )}
      </dl>
    </section>
  )
}
