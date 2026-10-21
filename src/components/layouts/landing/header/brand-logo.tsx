/**
 * The site's logo: a terminal prompt (›_) in a square frame, then the domain.
 * On hover or keyboard focus of the home link (the `group`) the frame turns
 * cyan, the chevron steps forward and the caret blinks. Transforms and opacity
 * only; reduced motion keeps it still. The wordmark joins the glyph from sm.
 */
export function BrandLogo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 28 28"
        aria-hidden="true"
        className="size-7 shrink-0 overflow-visible"
      >
        <rect
          x="0.75"
          y="0.75"
          width="26.5"
          height="26.5"
          fill="none"
          strokeWidth="1.5"
          className="stroke-foreground transition-colors duration-300 group-hover:stroke-primary group-focus-visible:stroke-primary motion-reduce:transition-none"
        />
        <path
          d="M8.5 9.5 13 14l-4.5 4.5"
          fill="none"
          strokeWidth="2"
          strokeLinecap="square"
          className="stroke-primary transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none"
        />
        <rect
          x="14.5"
          y="17.25"
          width="5.5"
          height="2"
          className="fill-primary group-hover:animate-caret-blink group-focus-visible:animate-caret-blink motion-reduce:animate-none"
        />
      </svg>
      <span className="hidden text-[0.9375rem] tracking-tight sm:inline">
        <span className="font-semibold">jime</span>
        <span className="text-muted-foreground transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary">
          .dev
        </span>
      </span>
    </span>
  )
}
