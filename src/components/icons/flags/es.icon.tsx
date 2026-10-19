interface IconProps {
  className?: string
}

export function EsFlagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 15" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-es">
          <rect width="20" height="15" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-es)">
        <rect width="20" height="15" fill="#AA151B" />
        <rect y="3.75" width="20" height="7.5" fill="#F1BF00" />
      </g>
    </svg>
  )
}
