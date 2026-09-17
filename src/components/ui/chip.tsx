import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ChipProps {
  active?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
  /** Announced to screen readers, e.g. "全部" for an emoji-only chip. */
  "aria-label"?: string
}

/**
 * The single filter-chip look used by 汉字库 and 学习游戏.
 * Previously each page had its own drifting copy of this markup.
 */
export function Chip({ active = false, onClick, children, className, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        // h-11 keeps every chip at the 44px minimum touch target on phones.
        "press inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium",
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border-strong bg-card text-muted-foreground hover:border-primary/45 hover:bg-primary-soft hover:text-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/**
 * Horizontally scrollable on small screens, wrapping on larger ones.
 * `-mx`/`px` padding lets the first chip align with the page gutter while the
 * scroll container still bleeds to the edges.
 */
export function ChipRow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0",
        className,
      )}
    >
      {children}
    </div>
  )
}
