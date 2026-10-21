import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// The one reading column every landing surface aligns to
export function LandingContainer({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-2xl px-5 sm:px-6", className)}
      {...props}
    />
  )
}
