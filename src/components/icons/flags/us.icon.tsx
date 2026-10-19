interface IconProps {
  className?: string
}

export function UsFlagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 15" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-us">
          <rect width="20" height="15" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-us)">
        <rect width="20" height="15" fill="#FFF" />
        <rect y="0.0" width="20" height="1.154" fill="#B22234" />
        <rect y="2.308" width="20" height="1.154" fill="#B22234" />
        <rect y="4.615" width="20" height="1.154" fill="#B22234" />
        <rect y="6.923" width="20" height="1.154" fill="#B22234" />
        <rect y="9.231" width="20" height="1.154" fill="#B22234" />
        <rect y="11.538" width="20" height="1.154" fill="#B22234" />
        <rect y="13.846" width="20" height="1.154" fill="#B22234" />
        <rect width="8" height="8.077" fill="#3C3B6E" />
        <circle cx="0.667" cy="0.808" r="0.3" fill="#FFF" />
        <circle cx="2.0" cy="0.808" r="0.3" fill="#FFF" />
        <circle cx="3.333" cy="0.808" r="0.3" fill="#FFF" />
        <circle cx="4.667" cy="0.808" r="0.3" fill="#FFF" />
        <circle cx="6.0" cy="0.808" r="0.3" fill="#FFF" />
        <circle cx="7.333" cy="0.808" r="0.3" fill="#FFF" />
        <circle cx="1.333" cy="2.423" r="0.3" fill="#FFF" />
        <circle cx="2.667" cy="2.423" r="0.3" fill="#FFF" />
        <circle cx="4.0" cy="2.423" r="0.3" fill="#FFF" />
        <circle cx="5.333" cy="2.423" r="0.3" fill="#FFF" />
        <circle cx="6.667" cy="2.423" r="0.3" fill="#FFF" />
        <circle cx="0.667" cy="4.038" r="0.3" fill="#FFF" />
        <circle cx="2.0" cy="4.038" r="0.3" fill="#FFF" />
        <circle cx="3.333" cy="4.038" r="0.3" fill="#FFF" />
        <circle cx="4.667" cy="4.038" r="0.3" fill="#FFF" />
        <circle cx="6.0" cy="4.038" r="0.3" fill="#FFF" />
        <circle cx="7.333" cy="4.038" r="0.3" fill="#FFF" />
        <circle cx="1.333" cy="5.654" r="0.3" fill="#FFF" />
        <circle cx="2.667" cy="5.654" r="0.3" fill="#FFF" />
        <circle cx="4.0" cy="5.654" r="0.3" fill="#FFF" />
        <circle cx="5.333" cy="5.654" r="0.3" fill="#FFF" />
        <circle cx="6.667" cy="5.654" r="0.3" fill="#FFF" />
        <circle cx="0.667" cy="7.269" r="0.3" fill="#FFF" />
        <circle cx="2.0" cy="7.269" r="0.3" fill="#FFF" />
        <circle cx="3.333" cy="7.269" r="0.3" fill="#FFF" />
        <circle cx="4.667" cy="7.269" r="0.3" fill="#FFF" />
        <circle cx="6.0" cy="7.269" r="0.3" fill="#FFF" />
        <circle cx="7.333" cy="7.269" r="0.3" fill="#FFF" />
      </g>
    </svg>
  )
}
