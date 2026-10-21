interface SkillsListProps {
  id: string
  title: string
  // One group per item: "Group: skill, skill (detail, detail), skill"
  skills: string[]
  // A closing aside under the groups
  note?: string
  className?: string
}

// Splits on commas that aren't inside parentheses, so "AWS (Lambda, S3)" stays one skill
function splitSkills(list: string) {
  const skills: string[] = []
  let depth = 0
  let current = ""

  for (const char of list) {
    if (char === "(") depth++
    if (char === ")") depth--
    if (char === "," && depth === 0) {
      skills.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  skills.push(current.trim())

  return skills.filter(Boolean)
}

function toGroup(item: string) {
  const separator = item.indexOf(":")
  if (separator === -1) return { label: null, skills: splitSkills(item) }

  return {
    label: item.slice(0, separator).trim(),
    skills: splitSkills(item.slice(separator + 1))
  }
}

// Skills as the CV groups them, each name its own tag so the eye can scan
export function SkillsList({
  id,
  title,
  skills,
  note,
  className
}: SkillsListProps) {
  const groups = skills.map(toGroup)

  return (
    <section aria-labelledby={id} className={className}>
      <h2 id={id} className="font-medium">
        {title}
      </h2>
      <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {groups.map(group => (
          <div key={group.label ?? group.skills.join()}>
            {group.label && (
              <dt className="text-meta text-muted-foreground">{group.label}</dt>
            )}
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map(skill => {
                  // "AWS (Lambda, S3)": the name leads, the detail is quieter
                  const [, name, detail] = skill.match(
                    /^(.+?)\s*\((.+)\)$/
                  ) ?? [null, skill, null]

                  return (
                    <li
                      key={skill}
                      className="bg-secondary px-2 py-0.5 text-sm text-secondary-foreground"
                    >
                      {name}
                      {detail && (
                        <span className="text-muted-foreground"> {detail}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-5 text-sm text-muted-foreground">{note}</p>}
    </section>
  )
}
