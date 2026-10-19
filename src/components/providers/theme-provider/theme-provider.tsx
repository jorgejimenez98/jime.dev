"use client"

import type { ComponentProps } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Light and dark follow the OS by default; the choice is stored per browser
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
