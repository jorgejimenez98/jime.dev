interface PageHeaderProps {
  id: string
  title: string
  description: string
}

// The h1 and one sentence that open an inner page (websites, blog)
export function PageHeader({ id, title, description }: PageHeaderProps) {
  return (
    <header>
      <h1 id={id} className="text-title font-semibold">
        {title}
      </h1>
      <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  )
}
