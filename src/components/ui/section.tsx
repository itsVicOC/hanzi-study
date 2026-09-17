import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: ReactNode
  /** Right-aligned controls, e.g. a result count or a filter toggle. */
  actions?: ReactNode
  className?: string
}

/**
 * Shared page masthead. Using one component keeps the title/description rhythm
 * identical across 汉字库 / 学习游戏 / 学习进度 / 家长指南.
 */
export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
          {title}
        </h1>
        {actions}
      </div>
      {description ? (
        <p className="text-muted-foreground measure-wide text-sm md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}

interface SectionTitleProps {
  children: ReactNode
  /** Rendered on the right, typically a count or a small action. */
  aside?: ReactNode
  /** Small leading emoji or icon. */
  icon?: ReactNode
  level?: 2 | 3
  className?: string
}

/** Section heading with a warm accent rule, so sections read as deliberate. */
export function SectionTitle({
  children,
  aside,
  icon,
  level = 2,
  className,
}: SectionTitleProps) {
  const Heading = level === 2 ? "h2" : "h3"
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <Heading
        className={cn(
          "font-display flex items-center gap-2 leading-snug tracking-tight",
          level === 2 ? "text-2xl" : "text-xl",
        )}
      >
        <span
          aria-hidden
          className="bg-primary-vivid h-5 w-1.5 shrink-0 rounded-full md:h-6"
        />
        {icon ? <span aria-hidden className="text-xl">{icon}</span> : null}
        {children}
      </Heading>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  )
}
