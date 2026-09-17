import { cn } from "@/lib/utils"

/**
 * The app's seal mark. Kept as one component so the header and footer cannot
 * drift apart. No overlays are stacked on top of the glyph — a translucent
 * white sheen under white text would drop its contrast below AA.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "from-primary-vivid to-primary ring-primary/20 relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-serif-cn text-xl font-black text-primary-foreground shadow-sm ring-2",
        className,
      )}
    >
      字
    </span>
  )
}
