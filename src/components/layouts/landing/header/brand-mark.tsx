interface BrandMarkProps {
  initials: string
}

/**
 * The header's square monogram. On hover or keyboard focus of the home link
 * (the `group`), a cyan fill rises and each initial rolls up into its contrast
 * color, one after the other. Transforms only; reduced motion keeps it still.
 */
export function BrandMark({ initials }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-7 items-center justify-center overflow-hidden bg-foreground text-[0.6875rem] font-bold tracking-wider text-background"
    >
      <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none" />
      <span className="relative flex">
        {[...initials].map((letter, index) => (
          <span
            // Initials never repeat a position, so the index is a stable key
            key={index}
            className="block h-[1em] overflow-hidden leading-none"
          >
            <span
              className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2 motion-reduce:transition-none"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <span>{letter}</span>
              <span className="text-primary-foreground">{letter}</span>
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}
